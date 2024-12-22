import cosUtil from "../lib/cos.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import sharp from 'sharp';
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (e) {
        console.log("Error in getUserForSidebar controller:" + e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages)
    } catch (e) {
        console.log("Error in getMessages controller:" + e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;

        if (image) {
            // 提取图片格式并去掉 Base64 前缀
            const matches = image.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,/);
            if (!matches) return res.status(400).json({ message: "Invalid image format" });

            const imageFormat = matches[1]; // 提取图片格式
            const base64Data = image.replace(matches[0], ''); // 去掉 Base64 前缀

            // 将 Base64 转换为 Buffer
            const buffer = Buffer.from(base64Data, 'base64');

            // 检查图片完整性
            const metadata = await sharp(buffer).metadata();
            if (!metadata.format || !metadata.width || !metadata.height) {
                return res.status(400).json({ message: "Invalid or corrupted image" });
            }
            const fileName = `${senderId}_${Date.now()}.${imageFormat}`;
            const uploadParam = {
                key: "/message/" + fileName, // 文件名
                buffer: buffer, // 文件内容
            };
            const uploadResponse = await cosUtil.putObject(uploadParam)
            const protocol = process.env.COS_PROTOCOL || 'https';
            imageUrl = uploadResponse.Location.startsWith('http')
                ? uploadResponse.Location
                : `${protocol}://${uploadResponse.Location}`;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (e) {
        console.log("Error in sendMessage controller:" + e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}
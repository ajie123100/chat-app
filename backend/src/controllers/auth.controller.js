import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import cosUtil from "../lib/cos.js";
import sharp from 'sharp';



export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })
        if (newUser) {
            const token = generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (e) {
        console.log("Error in signup controller", e.message)
        res.status(500).json({ message: "Internal Server Errors" })
    }
}

export const login = async (req, res) => {
    const { password, email } = req.body
    if (!password || !email) {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (e) {
        console.log("Error in login controller", e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (e) {
        console.log("Error in logout controller", e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        // 检查是否提供了 profilePic
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

        // 提取图片格式并去掉 Base64 前缀
        const matches = profilePic.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,/);
        if (!matches) return res.status(400).json({ message: "Invalid image format" });

        const imageFormat = matches[1]; // 提取图片格式
        const base64Data = profilePic.replace(matches[0], ''); // 去掉 Base64 前缀

        // 将 Base64 转换为 Buffer
        const buffer = Buffer.from(base64Data, 'base64');

        // 检查图片完整性
        const metadata = await sharp(buffer).metadata();
        if (!metadata.format || !metadata.width || !metadata.height) {
            return res.status(400).json({ message: "Invalid or corrupted image" });
        }

        // 生成文件名并上传到 COS
        const fileName = `${userId}_${Date.now()}.${imageFormat}`;
        const uploadResult = await cosUtil.putObject({
            key: `avatar/${fileName}`,
            buffer,
        });

        // 更新用户资料
        const protocol = process.env.COS_PROTOCOL || 'https';
        const profilePicUrl = uploadResult.Location.startsWith('http')
            ? uploadResult.Location
            : `${protocol}://${uploadResult.Location}`;

        const updateUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: profilePicUrl },
            { new: true }
        );

        // 返回更新后的用户信息
        res.status(200).json(updateUser);
    } catch (e) {
        console.error("Error in update profile:", e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        console.log("checkAuth called, user:", req.user); // 添加日志
        res.status(200).json(req.user)
    } catch (e) {
        console.error("Error in checkAuth container:", e.message);
        res.status(500).json({ message: "Internal Server Errors" })
    }
}
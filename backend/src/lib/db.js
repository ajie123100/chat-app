import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB coonected: ${conn.connection.host}`);
    } catch (e) {
        console.log("MongoDB connection error:" + e);
    }
}
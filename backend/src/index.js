import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from './lib/db.js'

import authRoutes from "./routes/auth.router.js"
import messageRoutes from "./routes/message.router.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

// 增加请求体大小限制为 50MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(cors(
    { origin: "http://localhost:5173", credentials: true }
))



app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log('server is running on PROT:' + PORT);
    connectDB()
})
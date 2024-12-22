// import { config } from 'dotenv';

// config();

// const seedUsers = [
//     {
//         email: "emma.thompson@example.com",
//         fullName: "Emma Thompson",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
//     },
//     {
//         email: "sophia.davis@example.com",
//         fullName: "Sophia Davis",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
//     },
//     {
//         email: "olivia.miller@example.com",
//         fullName: "olivia Miller",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
//     },
//     {
//         email: "mia.johnson@example.com",
//         fullName: "Mia Johnson",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
//     },
//     {
//         email: "charlotte.williams@example.com",
//         fullName: "Charlotte Williams",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
//     },
//     {
//         email: "amelia.garcia@example.com",
//         fullName: "Amelia Garcia",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
//     },
//     {
//         email: "henry- jackson@example.com",
//         fullName: "Henry Jackson",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
//     },
//     {
//         email: "alexander.martin@example.com",
//         fullName: "Alexander Martin",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
//     },
//     {
//         email: "daniel.rodriguez@example.com",
//         fullName: "Daniel Rodriguez",
//         password: "123456",
//         profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
//     }
// ]

// import { connectDB } from '../lib/db.js';
// import User from '../models/user.model.js';
// const seedDatabase = async () => {
// try {
//         await connectDB();

//         await User.insertMany(seedUsers);
//         console.log("Data Seeded Successfully");
//     } catch (e) {
//         console.log("Error in seeding data: " + e.message);
//     }
// }

// seedDatabase();
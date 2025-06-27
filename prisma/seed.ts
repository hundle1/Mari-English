// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function main() {
//     const existingAdmin = await prisma.user.findUnique({
//         where: { email: "admin@example.com" },
//     });

//     if (!existingAdmin) {
//         const hashedPassword = await bcrypt.hash("123", 10);

//         await prisma.user.create({
//             data: {
//                 id: "admin-id01", // hoặc để mặc định
//                 name: "Admin",
//                 email: "admin@example.com",
//                 role: "admin",
//                 englishName: "Admin",
//             },
//         });

//         console.log("Admin user created.");
//     } else {
//         console.log("Admin already exists.");
//     }
// }

// main()
//     .catch((e) => console.error(e))
//     .finally(() => prisma.$disconnect());

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const userId = (await auth()).userId;

    if (!userId) {
        return NextResponse.json([], { status: 200 }); // Không có user vẫn trả rỗng
    }

    try {
        const folders = await prisma.folderWord.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(folders);
    } catch (error) {
        console.error("Lỗi lấy thư mục:", error);
        return NextResponse.json([], { status: 200 }); // Có lỗi vẫn trả rỗng
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth(); // ✅ Lấy userId từ auth()
        const body = await req.json();
        const { name, isPublic } = body;

        console.log("🟡 Nhận POST tạo folder với:", { userId, name, isPublic });

        if (!userId || !name) {
            console.error("❌ Thiếu userId hoặc name");
            return NextResponse.json({ error: "Thiếu thông tin cần thiết" }, { status: 400 });
        }

        // Kiểm tra user tồn tại trong hệ thống
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            console.error("❌ Không tìm thấy user:", userId);
            return NextResponse.json({ error: "User không tồn tại trong hệ thống" }, { status: 404 });
        }

        const folder = await prisma.folderWord.create({
            data: {
                name,
                isPublic,
                userId,
            },
        });

        console.log("✅ Tạo folder thành công:", folder);
        return NextResponse.json(folder, { status: 201 });
    } catch (error) {
        console.error("🔥 Lỗi server khi tạo folder:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: "Lỗi server", details: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

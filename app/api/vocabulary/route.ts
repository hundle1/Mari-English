import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const words = await prisma.vocabularyWord.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(words); // Trả mảng rỗng nếu không có dữ liệu
    } catch (error) {
        console.error("Lỗi lấy từ vựng:", error);
        return NextResponse.json([], { status: 200 }); // Trả rỗng nhưng không báo lỗi
    }
}

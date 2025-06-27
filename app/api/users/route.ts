import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Khởi tạo Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, name, email, englishName } = body;

        // Kiểm tra dữ liệu đầu vào
        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        // Kiểm tra xem userId đã tồn tại chưa
        const { data: existingUser, error: fetchError } = await supabase
            .from('User')
            .select('id')
            .eq('userId', userId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // Lỗi không phải do không tìm thấy user
            throw fetchError;
        }

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 200 });
        }

        // Thêm user mới nếu chưa tồn tại
        const { data, error } = await supabase
            .from('User')
            .insert({
                userId,
                name,
                email,
                role: 'user', // Giá trị mặc định
                englishName: englishName || null,
            });

        if (error) {
            throw error;
        }

        return NextResponse.json({ message: 'User created successfully', data }, { status: 201 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
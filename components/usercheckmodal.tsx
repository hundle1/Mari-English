"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { Modal } from "@/components/ui/modal";

// Khởi tạo Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const UserCheckModal = () => {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    englishName: "",
  });
  const email = user?.emailAddresses?.[0]?.emailAddress || null;

  // Kiểm tra người dùng trong Supabase khi đăng nhập
  useEffect(() => {
    const checkUserInSupabase = async () => {
      if (!isLoaded || !user) return;

      const { data, error } = await supabase
        .from("User")
        .select("id")
        .eq("id", user.id) // 👉 Sử dụng Clerk ID làm khóa chính
        .single();

      if (error || !data) {
        setIsOpen(true); // Hiển thị modal nếu chưa có trong DB
      } else {
        setIsOpen(false);
      }
    };

    checkUserInSupabase();
  }, [isLoaded, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!user) return;

      const now = new Date().toISOString();

      const { error } = await supabase.from("User").insert({
        id: user.id,
        name: formData.name,
        email: email, // 👈 Lấy từ Clerk
        role: "user",
        englishName: formData.englishName || null,
        createdAt: now,
        updatedAt: now,
      });

      if (error) throw error;
      setIsOpen(false);
    } catch (err: any) {
      console.error(
        "Unexpected Error in handleSubmit:",
        err.message,
        err.details || err
      );
    }
  };

  if (!isLoaded) return null;

  return (
    <Modal
      title="Hoàn Thiện Hồ Sơ Của Bạn"
      description="Vui lòng cung cấp thông tin để tiếp tục."
      isOpen={isOpen}
      onClose={() => {}}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Tên Tiếng Anh (tùy chọn)
          </label>
          <input
            type="text"
            name="englishName"
            value={formData.englishName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </Modal>
  );
};

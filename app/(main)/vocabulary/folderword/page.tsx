"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderPlus, FolderOpen } from "lucide-react";
import { folderword } from "@/lib/folderword";
import { useUser } from "@clerk/nextjs";

type FolderWord = {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
};

export default function FolderWordPage() {
  const [folders, setFolders] = useState<FolderWord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const fetchFolders = async () => {
      if (!isLoaded) return;

      // Nếu chưa đăng nhập → không fetch gì cả, dừng lại và tắt loading
      if (!user) {
        setFolders([]);
        setLoading(false);
        return;
      }

      try {
        const result = await folderword.getUserFolders(user.id);
        setFolders(result as FolderWord[]);
      } catch (error) {
        console.error("Lỗi khi fetch folder:", error);
        setFolders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [user, isLoaded]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thư mục từ vựng của bạn</h1>
        <Link href="/vocabulary/folderword/addnew">
          <Button className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            Tạo thư mục mới
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : !user ? (
        <div className="text-center text-gray-500 italic">
          Bạn cần{" "}
          <Link href="/sign-in" className="text-blue-600 underline">
            đăng nhập
          </Link>{" "}
          để xem thư mục của bạn.
        </div>
      ) : folders.length === 0 ? (
        <div className="text-center text-gray-500 italic">
          Không có thư mục nào.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {folders.map((folder) => (
            <Link href={`/vocabulary/folderword/${folder.id}`} key={folder.id}>
              <Card className="hover:shadow-md cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <FolderOpen className="w-5 h-5" />
                    {folder.name || "Untitled"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-500">
                  {folder.isPublic ? "Công khai" : "Riêng tư"} •{" "}
                  {new Date(folder.createdAt).toLocaleDateString("vi-VN")}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

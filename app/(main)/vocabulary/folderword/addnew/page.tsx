"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AddNewFolderPage() {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folderId, setFolderId] = useState<string | null>(null);

  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!user || !isLoaded || !name.trim()) {
      console.log("Validation failed:", { user, isLoaded, name });
      alert("Vui lòng nhập tên thư mục và đảm bảo đã đăng nhập.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request with:", {
        name,
        isPublic,
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        userName: user.fullName,
      });
      const res = await fetch("/api/folderword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          isPublic,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi tạo thư mục");
      }

      const data = await res.json();
      setFolderId(data.id);
      alert("Tạo thư mục thành công!");
    } catch (err) {
      console.error("Tạo folder thất bại", err);
      let message = "Đã xảy ra lỗi không xác định";
      if (err instanceof Error) {
        message = err.message;
      }
      alert(`Lỗi: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Tạo thư mục từ vựng mới</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tên thư mục</Label>
            <Input
              placeholder="Nhập tên thư mục..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="isPublic"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              disabled={loading}
            />
            <Label htmlFor="isPublic">Công khai thư mục</Label>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Tạo thư mục"
            )}
          </Button>

          {folderId && (
            <div className="mt-4 text-center">
              <p className="text-green-600 mb-2">✅ Tạo thành công!</p>
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(`/vocabulary/folderword/${folderId}`)
                }
              >
                Thêm từ vào thư mục
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

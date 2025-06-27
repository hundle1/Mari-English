// app/(main)/profile/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const [englishName, setEnglishName] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (isLoaded && user) {
            setEnglishName((user.publicMetadata?.englishName as string) || '');
            setTitle((user.publicMetadata?.title as string) || '');
        }
    }, [user, isLoaded]);

    const handleUpdateProfile = async () => {
        await user?.update({
            unsafeMetadata: {
                englishName,
                title
            }
        });
        alert('Đã lưu!');
    };

    const handleChangePassword = () => {
        window.location.href = '/user/security'; // Clerk mặc định trang này
    };

    if (!isLoaded) return (
        <div className="space-y-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Image
                    src={user?.imageUrl || ''}
                    width={80}
                    height={80}
                    className="rounded-full"
                    alt="avatar"
                />
                <Button
                    onClick={() => {
                        const url = prompt('Nhập URL ảnh đại diện mới:');
                        if (url) {
                            user?.setProfileImage({ file: url });
                        }
                    }}
                    variant="outline"
                >
                    Thay ảnh đại diện
                </Button>
            </div>

            <div>
                <h2 className="font-semibold text-lg">Thông tin cá nhân</h2>
                <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
                <p>Tên: {user?.fullName}</p>
            </div>

            <div>
                <Input
                    placeholder="Tên tiếng Anh"
                    value={englishName}
                    onChange={(e) => setEnglishName(e.target.value)}
                />
                <Input
                    placeholder="Danh hiệu (ví dụ: Master, Beginner)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button onClick={handleUpdateProfile}>Lưu thông tin</Button>
            </div>

            <div>
                <h3 className="font-semibold text-md">Mật khẩu</h3>
                <Button onClick={handleChangePassword} variant="secondary">Thay đổi mật khẩu</Button>
            </div>

            <div>
                <h3 className="font-semibold text-md">Xin cấp quyền (admin, mod, teacher)</h3>
                <div className="p-4 bg-muted rounded-md">
                    <p>(Chức năng đang được phát triển)</p>
                </div>
            </div>

            {user?.publicMetadata?.role === 'admin' && (
                <div>
                    <h3 className="font-semibold text-md">Quản trị viên</h3>
                    <div className="p-4 bg-muted rounded-md">
                        <p>(Sub-nav cấp quyền đang được phát triển)</p>
                    </div>
                </div>
            )}

            <div>
                <h3 className="font-semibold text-md">Thành tựu đã đạt</h3>
                <div className="p-4 bg-muted rounded-md">
                    <p>(Đang phát triển)</p>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-md">Lịch sử học tập</h3>
                <div className="p-4 bg-muted rounded-md">
                    <p>(Đang phát triển)</p>
                </div>
            </div>
        </div>
    );
}

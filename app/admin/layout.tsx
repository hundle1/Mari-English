'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('User')
        .select('role')
        .eq('userId', user.id)
        .single();

      if (error || !data) {
        console.error('Lỗi khi lấy role từ Supabase:', error);
        setLoading(false);
        return;
      }

      if (data.role === 'admin') {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    fetchRole();
  }, [user]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!isAdmin) {
    redirect('/'); // hoặc hiển thị 403
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">MARI Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="block hover:bg-gray-100 p-2 rounded">Dashboard</Link>
          <Link href="/admin/vocabulary" className="block hover:bg-gray-100 p-2 rounded">Vocabulary</Link>
          <Link href="/admin/tests" className="block hover:bg-gray-100 p-2 rounded">Tests</Link>
          <Link href="/admin/users" className="block hover:bg-gray-100 p-2 rounded">Users</Link>
          <Link href="/admin/settings" className="block hover:bg-gray-100 p-2 rounded">Settings</Link>
        </nav>
        <div className="p-4 border-t">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}

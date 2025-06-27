"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  FileText,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// Supabase client (tách riêng)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Navigation config
const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Vocabulary", href: "/vocabulary", icon: BookOpen },
  {
    name: "Main Skills",
    href: "/main-skill",
    icon: Users,
    submenu: [
      { name: "Speaking", href: "/main-skill/speaking" },
      { name: "Reading", href: "/main-skill/reading" },
      { name: "Writing", href: "/main-skill/writing" },
      { name: "Listening", href: "/main-skill/listening" },
    ],
  },
  {
    name: "Making Test",
    href: "/making-test",
    icon: FileText,
    submenu: [
      { name: "TOEIC Test", href: "/making-test/toeic" },
      { name: "IELTS Test", href: "/making-test/ielts" },
    ],
  },
  { name: "Profile", href: "/profile", icon: BookOpen },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchRole = async () => {
      const { data } = await supabase
        .from("User")
        .select("role")
        .eq("id", userId) // ✅ đã sửa
        .single();

      setIsAdmin(data?.role === "admin");
    };

    fetchRole();
  }, [userId]);

  const renderMenuItem = (item: any) => {
    if (item.submenu) {
      return (
        <div key={item.name} className="relative group">
          <div className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer">
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="absolute left-0 top-full w-48 bg-white border rounded-md shadow-lg hidden group-hover:block z-50">
            {item.submenu.map((sub: any) => (
              <Link
                key={sub.name}
                href={sub.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                prefetch
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
        prefetch
      >
        <item.icon className="w-4 h-4" />
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group" prefetch>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition">
              MARI English
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(renderMenuItem)}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-in" prefetch>
                <Button variant="outline" className="text-sm">
                  Đăng nhập / Đăng ký
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="hover:bg-blue-50 transition"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200 bg-gray-50 rounded-lg mt-2 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
                {item.submenu && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((sub: any) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <div className="mt-4 border-t pt-3">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Đăng nhập / Đăng ký
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

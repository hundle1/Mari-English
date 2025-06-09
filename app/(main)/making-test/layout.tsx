'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MakingTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tests = [
    { name: 'TOEIC Test', href: '/making-test/toeic', icon: FileText },
    { name: 'IELTS Test', href: '/making-test/ielts', icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          English Test Preparation
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Prepare for major English proficiency tests with our comprehensive practice materials and mock exams.
        </p>

        {/* Test Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tests.map((test) => {
            const isActive = pathname === test.href;
            return (
              <Link key={test.name} href={test.href}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${
                    isActive ? 'bg-purple-600 hover:bg-purple-700' : ''
                  }`}
                >
                  <test.icon className="w-4 h-4" />
                  <span>{test.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mic, BookOpen, PenTool, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MainSkillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const skills = [
    { name: 'Speaking', href: '/main-skill/speaking', icon: Mic },
    { name: 'Reading', href: '/main-skill/reading', icon: BookOpen },
    { name: 'Writing', href: '/main-skill/writing', icon: PenTool },
    { name: 'Listening', href: '/main-skill/listening', icon: Headphones },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          English Skills Development
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Master all four essential English language skills with our comprehensive training modules.
        </p>

        {/* Skills Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {skills.map((skill) => {
            const isActive = pathname === skill.href;
            return (
              <Link key={skill.name} href={skill.href}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${
                    isActive ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  <skill.icon className="w-4 h-4" />
                  <span>{skill.name}</span>
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
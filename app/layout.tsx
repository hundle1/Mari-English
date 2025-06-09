import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LoadingBar } from '@/components/loading-bar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MARI English - Master English with Confidence',
  description: 'Transform your English skills with our comprehensive learning platform. From vocabulary building to test preparation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingBar />
        {children}
      </body>
    </html>
  );
}
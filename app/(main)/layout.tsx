import { Navbar } from '@/components/navbar';
import { NavigationLoader } from '@/components/navigation-loader';
import { PageLoader } from '@/components/page-loader';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLoader>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <NavigationLoader />
        <main className="transition-opacity duration-300">{children}</main>
      </div>
    </PageLoader>
  );
}
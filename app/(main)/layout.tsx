import { Navbar } from "@/components/navbar";
import { NavigationLoader } from "@/components/navigation-loader";
import { PageLoader } from "@/components/page-loader";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
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

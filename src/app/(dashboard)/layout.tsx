import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

/**
 * Layout component for dashboard pages
 * Includes sidebar, navbar and other dashboard-specific components
 */
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full">
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="px-4 py-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
} 
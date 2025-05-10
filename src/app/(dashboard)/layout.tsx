import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Dashboard layout component
 * Provides common layout for dashboard pages and handles authentication
 * @param {DashboardLayoutProps} props - Component props
 * @returns {JSX.Element} Dashboard layout component
 */
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Redirect to login if no token is present
  if (!token) {
    redirect("/login");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full h-full bg-background">
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 w-full">
            <Navbar />
            <div className="w-full px-4 py-4">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 
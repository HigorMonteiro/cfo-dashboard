'use client';

import {
  Home,
  Settings,
  BarChart3,
  Calendar,
  Receipt,
  LogOut,
  LucideIcon,
  UserCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserDTO } from "@/types/auth";

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const items: SidebarGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/finance",
        icon: Home,
      },
      {
        title: "Calendar",
        href: "/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Expenses",
        href: "/expenses",
        icon: Receipt,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: UserCircle,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

/**
 * AppSidebar component for navigation
 */
const AppSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
    toast.success('Logged out successfully');
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        {/* User info at the top */}
        {user && (
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <UserCircle className="h-8 w-8 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.username}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          </div>
        )}
        <SidebarMenu>
          {items.map((group, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                {group.title}
              </div>
              {group.items.map((item, itemIndex) => (
                <SidebarMenuItem key={itemIndex}>
                  <SidebarMenuButton
                    asChild={!item.onClick}
                    isActive={pathname === item.href}
                    onClick={item.onClick}
                  >
                    {item.onClick ? (
                      <button>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarHeader>

      {/* Logout button at the bottom */}
      <div className="mt-auto border-t">
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-100/50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;

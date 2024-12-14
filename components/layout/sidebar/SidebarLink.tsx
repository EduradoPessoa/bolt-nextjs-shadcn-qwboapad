import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  title: string;
  isActive: boolean;
  collapsed: boolean;
}

export function SidebarLink({ href, icon: Icon, title, isActive, collapsed }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700",
        collapsed && "justify-center"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{title}</span>}
    </Link>
  );
}
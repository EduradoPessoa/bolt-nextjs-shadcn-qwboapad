import { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

export interface SidebarProps {
  children?: React.ReactNode;
}
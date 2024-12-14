"use client";

import { usePathname } from "next/navigation";
import { MenuItem } from "./types";
import { SidebarLink } from "./SidebarLink";

interface SidebarNavProps {
  items: MenuItem[];
  collapsed: boolean;
}

export function SidebarNav({ items, collapsed }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-2 space-y-1">
      {items.map((item) => (
        <SidebarLink
          key={item.href}
          href={item.href}
          icon={item.icon}
          title={item.title}
          isActive={pathname === item.href}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
}
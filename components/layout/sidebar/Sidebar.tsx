"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { menuItems } from "./menu-items";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import type { SidebarProps } from "./types";

export function Sidebar({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-white dark:bg-gray-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)} 
      />
      <SidebarNav items={menuItems} collapsed={collapsed} />
      {children}
    </div>
  );
}
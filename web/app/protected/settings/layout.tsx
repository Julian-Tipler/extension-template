"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define our navigation items
const navItems = [
  { name: "Account", href: "/protected/settings/account" },
  { name: "Bad Websites", href: "/protected/settings/bad-websites" },
  { name: "Good Websites", href: "/protected/settings/good-websites" },
  //   { name: "Security", href: "/protected/settings/security" },
  { name: "Purchases", href: "/protected/settings/purchases" },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="space-y-1 sticky top-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 min-w-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

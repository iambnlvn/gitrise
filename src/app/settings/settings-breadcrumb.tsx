"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsPageTitles: Record<string, string> = {
  "/settings": "General",
  "/settings/profile": "Profile",
  "/settings/security": "Security & Access",
  "/settings/privacy": "Privacy & Data",
  "/settings/notifications": "Notifications",
  "/settings/appearance": "Appearance & Preferences",
  // "/settings/organizations": "Organizations",// Not implemented yet
  "/settings/billing": "Billing & Plan",
  "/settings/developer": "Developer Settings",
};

export function SettingsBreadcrumb() {
  const pathname = usePathname();
  const currentPageTitle = settingsPageTitles[pathname] || "Settings";
  if (pathname === "/settings") {
    return null;
  }
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-10 border-b backdrop-blur">
      <div className="flex h-12 items-center gap-2 px-6 text-sm">
        <Link
          href="/settings"
          className={cn(
            "text-muted-foreground hover:text-foreground group flex items-center gap-1 transition-colors",
            pathname === "/settings" && "text-foreground font-medium",
          )}
        >
          <Settings className="text-muted-foreground size-4 group-hover:animate-spin" />
          Settings
        </Link>

        {pathname !== "/settings" && (
          <>
            <ChevronRight className="text-muted-foreground size-4" />
            <span className="text-foreground font-medium">
              {currentPageTitle}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

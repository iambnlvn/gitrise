"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { useState } from "react";

import { SETTINGS_SECTIONS } from "./constants";
import { SettingsSection } from "./components/shared/types";

/**
 * Navigation link component for settings.
 *
 * Renders a single navigation item with active state styling
 * and optional description text.
 */
function NavigationLink({
  section,
  isActive,
}: {
  section: SettingsSection;
  isActive: boolean;
}) {
  const Icon = section.icon;

  return (
    <Link
      prefetch
      href={section.path}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
        isActive
          ? "bg-gradient-to-r from-[#947bd3] to-[#7c3aed] text-white shadow-lg ring-1 shadow-[#947bd3]/25 ring-white/20"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:shadow-sm",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
          isActive ? "bg-white/20" : "bg-muted/50 group-hover:bg-muted",
        )}
      >
        <Icon className="size-4 flex-shrink-0" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{section.label}</div>
        <div
          className={cn(
            "truncate text-xs transition-colors",
            isActive
              ? "text-white/80"
              : "text-muted-foreground/80 group-hover:text-muted-foreground",
          )}
        >
          {section.description}
        </div>
      </div>
      {!isActive && (
        <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-50" />
      )}
    </Link>
  );
}

/**
 * Full navigation links component.
 * Displays all settings sections as a list of navigation items.
 */
function NavigationLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {SETTINGS_SECTIONS.map((section) => {
        const isActive = pathname === section.path;
        return (
          <NavigationLink
            key={section.path}
            section={section}
            isActive={isActive}
          />
        );
      })}
    </nav>
  );
}

/**
 * Settings navigation component.
 *
 * Provides responsive navigation for settings pages with:
 * - Desktop sidebar (always visible)
 * - Mobile sheet menu (hamburger icon)
 * - Active section highlighting
 * - Smooth transitions and violet bloom styling
 *
 * @component
 */
export function SettingsNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentSection =
    SETTINGS_SECTIONS.find((s) => s.path === pathname)?.label || "Settings";

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-card border-border sticky top-0 z-40 border-b lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex-1">
            <h1 className="text-foreground text-sm font-semibold">Settings</h1>
            <p className="text-muted-foreground text-xs">{currentSection}</p>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary size-9"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-border bg-card w-72 p-0"
            >
              <div className="flex h-full flex-col">
                <div className="border-border border-b p-4">
                  <h2 className="text-lg font-semibold">Settings</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <NavigationLinks />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="border-border bg-card sticky top-0 hidden h-screen w-64 flex-col overflow-hidden border-r lg:flex">
        <div className="border-border border-b p-4">
          <h2 className="text-xl font-semibold">Settings</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavigationLinks />
        </div>
      </aside>
    </>
  );
}

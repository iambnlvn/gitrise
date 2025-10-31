"use client";

import {
  Menu,
  Book,
  GitPullRequest,
  CircleDot,
  ChevronLeft,
  ChevronRight,
  LogOut,
  TerminalSquare,
  Home,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const NAV_ITEMS = [
  { label: "Overview", icon: Home, href: "/dashboard" },
  { label: "Teams", icon: Users, href: "/teams" },
  { label: "Projects", icon: Book, href: "/projects" },
  { label: "Issues", icon: CircleDot, href: "/issues" },
  { label: "Merge Requests", icon: GitPullRequest, href: "/merge-requests" },
  { label: "CI/CD", icon: TerminalSquare, href: "/pipelines" },
];

export function RepositorySidebar({ expanded, setExpanded }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <aside
        className={cn(
          "bg-card fixed top-0 left-0 z-40 hidden h-screen flex-col border-r shadow-sm transition-all duration-300 ease-in-out md:flex",
          expanded ? "w-64" : "w-16",
        )}
      >
        <div
          className={cn(
            "mt-20 flex h-16 items-center border-b px-4",
            expanded ? "justify-between" : "justify-center",
          )}
        >
          <div
            className={cn(
              "text-primary text-xl font-bold tracking-tight",
              !expanded && "hidden",
            )}
          >
            Gitrise
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="hover:bg-accent text-muted-foreground rounded-md p-1 transition-colors"
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-2 py-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "group hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  expanded ? "justify-start gap-3" : "justify-center",
                )}
              >
                <item.icon className="text-muted-foreground group-hover:text-primary size-5" />
                {expanded && <span>{item.label}</span>}
              </Link>
              {!expanded && (
                <div className="bg-secondary pointer-events-none absolute top-1/2 left-14 z-50 -translate-y-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t p-2">
          <div className="group relative">
            <button
              className={cn(
                "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50",
                expanded ? "justify-start gap-3" : "justify-center",
              )}
            >
              <LogOut className="size-5" />
              {expanded && <span>Sign Out</span>}
            </button>
            {!expanded && (
              <div className="pointer-events-none absolute top-1/2 left-14 z-50 -translate-y-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Sign Out
                <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <nav className="bg-background fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t p-2 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-muted-foreground flex flex-col items-center gap-1 p-2"
        >
          <Menu className="size-5" />
          <span className="text-[10px]">Menu</span>
        </button>
        {NAV_ITEMS.slice(0, 4).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-muted-foreground active:text-primary flex flex-col items-center gap-1 p-2"
          >
            <item.icon className="size-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-transparent backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="bg-background animate-in slide-in-from-left relative flex h-full w-64 flex-col p-4 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <ChevronLeft className="size-5" />
                ) : (
                  <ChevronRight className="size-5" />
                )}
              </button>
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="text-muted-foreground size-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

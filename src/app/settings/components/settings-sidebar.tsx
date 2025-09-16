"use client";

import { cn } from "@/lib/utils";
import {
  User,
  Palette,
  Bell,
  Shield,
  CreditCard,
  Code,
  Lock,
} from "lucide-react";
import type { SettingsSection } from "../types";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

const sections = [
  { id: "profile" as const, label: "Profile", icon: User },
  {
    id: "appearance" as const,
    label: "Appearance & Preferences",
    icon: Palette,
  },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "security" as const, label: "Security & Access", icon: Shield },
  { id: "billing" as const, label: "Billing & Plan", icon: CreditCard },
  { id: "developer" as const, label: "Developer Settings", icon: Code },
  { id: "privacy" as const, label: "Privacy & Data", icon: Lock },
];

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="border-border bg-card fixed z-20 hidden h-screen border-r md:block md:w-64">
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <li key={section.id}>
                  <button
                    onClick={() => onSectionChange(section.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#947bd3] text-white shadow-lg shadow-[#947bd3]/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="size-4 flex-shrink-0" />
                    <span className="truncate">{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

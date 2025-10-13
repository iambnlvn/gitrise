"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { SettingsSidebar } from "./settings-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SettingsSection } from "../types";
import { User } from "@supabase/supabase-js";
import { ProfileSection } from "./profile/profile-section";
import { AppearanceSettings } from "./appearance/appearance-settings";
import { NotificationsSettings } from "./notifications/notification-settings";
import { SecuritySettings } from "./security/security-settings";
import { BillingSettings } from "./billing/billing-settings";
import { DeveloperSettings } from "./developer/developer-settings";

export function SettingsPage({ user }: { user: User }) {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionTitles: Record<SettingsSection, string> = {
    profile: "Profile",
    appearance: "Appearance & Preferences",
    notifications: "Notifications",
    security: "Security & Access",
    billing: "Billing & Plan",
    developer: "Developer Settings",
    privacy: "Privacy & Data",
  };

  const handleSectionChange = (section: SettingsSection) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection user={user} />;
      case "appearance":
        return <AppearanceSettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "security":
        return <SecuritySettings />;
      case "billing":
        return <BillingSettings />;
      case "developer":
        return <DeveloperSettings />;
    }
  };

  return (
    <div className="bg-background flex min-h-screen">
      <div>
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1 lg:ml-64">
        <div className="text-muted-foreground border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex h-10 items-center gap-2 border-b text-sm backdrop-blur transition-all duration-200 lg:px-6">
          <span>Settings</span>
          <ChevronRight className="size-4" />
          <span className="text-foreground font-medium">
            {sectionTitles[activeSection]}
          </span>
        </div>

        <main className="p-4 lg:p-6">
          <div className="animate-in fade-in mx-auto max-w-4xl duration-300">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}

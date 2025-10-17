import { ProtectedRoute } from "@/components/layout/protected-route";
import { SettingsNavigation } from "./settings-navigation";
import { SettingsBreadcrumb } from "./settings-breadcrumb";

export const metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="bg-background flex min-h-screen flex-col lg:flex-row">
        <SettingsNavigation />
        <main className="w-full flex-1 overflow-auto">
          <SettingsBreadcrumb />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

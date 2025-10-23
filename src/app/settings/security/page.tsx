import { SecuritySettings } from "./_components/security-settings";

export const metadata = {
  title: "Security Settings",
  description: "Manage your security preferences and settings",
};

export default function SecuritySettingsPage() {
  return (
    <div className="p-6">
      <SecuritySettings />
    </div>
  );
}

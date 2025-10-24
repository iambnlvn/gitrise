import { PrivacySettings } from "./_components/privacy-settings";

export const metadata = {
  title: "Privacy Settings",
  description: "Manage your privacy preferences and data controls.",
};

export default function PrivacySettingsPage() {
  return (
    <div className="p-6">
      <PrivacySettings />
    </div>
  );
}

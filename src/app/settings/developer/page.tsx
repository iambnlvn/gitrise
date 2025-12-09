import { DeveloperSettings } from "./_components/developer-settings";

export const metadata = {
  title: "Developer Settings",
  description: "Manage your integrations, API access, and developer tools",
};

export default function DeveloperSettingsPage() {
  return (
    <div className="p-6">
      <DeveloperSettings />
    </div>
  );
}

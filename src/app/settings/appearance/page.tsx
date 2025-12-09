import { AppearanceSettings } from "./_components/appearance-settings";

export const metadata = {
  title: "Appearance Settings",
  description: "Customize your appearance preferences",
};

export default function AppearanceSettingsPage() {
  return (
    <div className="p-6">
      <AppearanceSettings />
    </div>
  );
}

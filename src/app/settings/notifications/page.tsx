import { NotificationsSettings } from "./_components/notification-settings";

export const metadata = {
  title: "Notification Settings",
  description: "Manage your notification preferences across all channels",
};

export default function NotificationSettingsPage() {
  return (
    <div className="p-6">
      <NotificationsSettings />
    </div>
  );
}

import { BillingSettings } from "./_components/billing-settings";

export const metadata = {
  title: "Billing Settings",
  description: "Manage your billing and subscription preferences",
};

export default function BillingSettingsPage() {
  return (
    <div className="p-6">
      <BillingSettings />
    </div>
  );
}

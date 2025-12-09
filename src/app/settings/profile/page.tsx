import { createClient } from "@/utils/supabase/server";
import { ProfileSettings } from "./_components/profile-settings";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile Settings",
  description: "Manage your profile information and preferences",
};

export default async function ProfileSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }
  return (
    <div className="p-6">
      <ProfileSettings user={user} />
    </div>
  );
}

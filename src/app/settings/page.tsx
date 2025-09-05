import { createClient } from "@/utils/supabase/server";
import { SettingsPage } from "./components/settings-page";
import { ProtectedRoute } from "@/components/layout/protected-route";

export default async function SettingsPageRoute() {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  return (
    <ProtectedRoute>
      <SettingsPage user={user!} />
    </ProtectedRoute>
  );
}

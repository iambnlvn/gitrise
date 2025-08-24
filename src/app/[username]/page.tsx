import { Header } from "@/components/layout/header";
import { ProtectedRoute } from "@/components/layout/proteced-route";
import { UserProfile } from "./components/user-profile";
import { createClient } from "@/utils/supabase/server";

// Mock user data
const mockUser = {
  avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
  bio: "Full-stack developer and open-source enthusiast.",
  company: "Evil Corp",
  email: "iambnlvn@gmail.com",
  followers: 150,
  following: 11,
  id: "123456",
  joinDate: "2020-01-15",
  languages: [
    { name: "JavaScript", percentage: 50, color: "#f1e05a" },
    { name: "TypeScript", percentage: 30, color: "#2b7489" },
    { name: "Python", percentage: 20, color: "#3572A5" },
  ],
  location: "San Francisco, CA",
  name: "John Doe",
  publicRepos: 42,
  rank: "Pro",
  starredRepos: 10,
  streak: 15,
  totalCommits: 5000,
  totalForks: 120,
  totalStars: 300,
  username: "iambnlvn",
  website: "https://iambnlvn.dev",
};

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const isOwnProfile =
    (await params).username === user.data.user?.user_metadata.user_name;

  return (
    <ProtectedRoute>
      <div className="bg-background min-h-screen">
        <Header />
        <UserProfile user={mockUser} isOwnProfile={isOwnProfile} />
      </div>
    </ProtectedRoute>
  );
}

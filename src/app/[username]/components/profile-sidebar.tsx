import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "./profile-header";
import { DisplayConfig, Profile } from "@/types/profile";
import { LanguagesCard } from "./languages-card";
import { ProfileActions } from "./profile-actions";
import { ProfileDetails } from "./profile-details";
import { StatsCard } from "./stat-card";

interface ProfileSidebarProps {
  user: Profile;
  isOwnProfile: boolean;
  displayConfig: DisplayConfig;
}

export function ProfileSidebar({
  user,
  isOwnProfile,
  displayConfig,
}: ProfileSidebarProps) {
  return (
    <div className="space-y-6 lg:col-span-1">
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <ProfileHeader user={user} />
          <ProfileActions user={user} isOwnProfile={isOwnProfile} />
          <ProfileDetails user={user} />
        </CardContent>
      </Card>

      {displayConfig.showStats && (
        <StatsCard
          stats={[
            {
              label: "Total Stars",
              value: user.totalStars,
              color: "text-primary",
            },
            {
              label: "Total Forks",
              value: user.totalForks,
              color: "text-green-500",
            },
            {
              label: "Total Commits",
              value: user.totalCommits,
              color: "text-blue-500",
            },
            {
              label: "Day Streak",
              value: user.streak,
              color: "text-orange-500",
            },
          ]}
        />
      )}

      {displayConfig.showLanguages && (
        <LanguagesCard languages={user.languages} />
      )}
    </div>
  );
}

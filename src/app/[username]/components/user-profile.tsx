"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Book, Star } from "lucide-react";
import { UserProfileProps } from "@/types/profile";
import { useActivityData } from "@/app/hooks/use-activity-data";
import { ProfileSidebar } from "./profile-sidebar";
import { RepositoriesTab } from "./repositories-tab";
import { StarredTab } from "./starred-tab";
import { OverviewTab } from "./overview-tab";

export function UserProfile({
  user,
  isOwnProfile = false,
  config = {},
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { commitData, totalContributions } = useActivityData(user.id);

  const displayConfig = {
    showContributions: true,
    showLanguages: true,
    showStats: true,
    showActivity: true,
    ...config,
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left sidebar */}
        <ProfileSidebar
          user={user}
          isOwnProfile={isOwnProfile}
          displayConfig={displayConfig}
        />

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-card/50 mb-6 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2"
              >
                <Activity className="size-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="repositories"
                className="flex items-center space-x-2"
              >
                <Book className="size-4" />
                <span>Repositories</span>
                <Badge variant="secondary">{user.publicRepos}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="flex items-center space-x-2"
              >
                <Star className="size-4" />
                <span>Starred</span>
                <Badge variant="secondary">{user.starredRepos}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab
                user={user}
                commitData={commitData}
                totalContributions={totalContributions}
                displayConfig={displayConfig}
              />
            </TabsContent>

            <TabsContent value="repositories">
              <RepositoriesTab user={user} isOwnProfile={isOwnProfile} />
            </TabsContent>

            <TabsContent value="starred">
              <StarredTab userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

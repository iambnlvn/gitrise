"use client";

import { RepositorySidebar } from "../../components/layout/repository-sidebar";
import { mockActivity } from "./constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import HighlightNote from "./_components/highlight-note";
import ActivityFeed from "./_components/activity-feed";
import Tasks from "./_components/tasks";
import DashboardHeader from "./_components/dashboard-header";

export default function DashboardPage() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bg-background text-foreground min-h-screen">
      <RepositorySidebar expanded={expanded} setExpanded={setExpanded} />
      <main
        className={cn(
          "flex-1 p-6 pb-20 transition-all duration-300 ease-in-out md:pb-6",
          expanded ? "md:ml-64" : "md:ml-16",
        )}
      >
        <DashboardHeader />

        <HighlightNote />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Tasks />
          </div>

          <div className="space-y-6">
            <ActivityFeed activities={mockActivity} />
          </div>
        </div>
      </main>
    </div>
  );
}

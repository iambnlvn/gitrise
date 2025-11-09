"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search, Bell } from "lucide-react";
import { RepositorySidebar } from "../../components/layout/repository-sidebar";
import { mockActivity } from "./constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import HighlightNote from "./_components/highlight-note";
import ActivityFeed from "./_components/activity-feed";

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
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, here&apos;s what&apos;s happening.
            </p>
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            {/* I dont think a searchbar is necessary as the tasks would be the main thing in this page
            If we want to keep it, we could make it a dropdown to filter tasks by name 
            or status to avoid another searchbar
            this searchbar might become useless if we implement filtering in the tasks component
            */}
            <div className="relative flex-1 md:w-64">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input placeholder="Search..." className="bg-background pl-9" />
            </div>
            <Button size="icon" variant="outline" className="shrink-0">
              <Bell className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="shrink-0">
              <Plus className="size-4" />
            </Button>
          </div>
        </div>

        <HighlightNote />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-[90vh]">TASKS(WIP)</div>
          </div>

          <div className="space-y-6">
            <ActivityFeed activities={mockActivity} />
          </div>
        </div>
      </main>
    </div>
  );
}

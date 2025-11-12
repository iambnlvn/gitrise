"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
function DashboardHeader() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  return (
    <Card className="mb-4 border-none bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 text-white md:col-span-3">
      <div className="flex h-full items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold">
            Good Morning, {user?.user_metadata.full_name || "Operator"}!
          </h1>
          <p className="text-sm text-zinc-400">
            You have <span className="font-medium text-white">4 PRs</span>{" "}
            waiting for review and{" "}
            <span className="font-medium text-white">12 issues</span> assigned
            to you.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="border-none bg-white text-zinc-900 hover:bg-zinc-200">
              View My Tasks
            </Button>
            <Button className="border-zinc-600 bg-zinc-700 text-white hover:bg-zinc-600">
              Review PRs
            </Button>
          </div>
        </div>
        <div className="hidden pr-8 md:block">
          <div className="relative size-24">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-700 opacity-25"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold">
              87%
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-zinc-400">Sprint Goal</p>
        </div>
      </div>
    </Card>
  );
}

export default DashboardHeader;

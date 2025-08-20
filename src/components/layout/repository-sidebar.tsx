"use client";

import {
  Book,
  Star,
  Users,
  Settings,
  Plus,
  GitBranch,
  Clock,
  Activity,
  GitPullRequest,
  Code,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export function RepositorySidebar() {
  const [recentExpanded, setRecentExpanded] = useState(true);
  const [orgsExpanded, setOrgsExpanded] = useState(true);

  return (
    <aside className="from-card/50 to-card/80 flex h-screen w-64 flex-col border-r bg-gradient-to-b p-4">
      <ScrollArea className="mt-4 flex-grow">
        <div className="space-y-3">
          <div>
            <Link href="/new">
              <Button
                className="bg-primary/10 hover:bg-primary/20 text-primary w-full justify-start"
                size="sm"
              >
                <Plus className="mr-2 size-4" />
                New repository
              </Button>
            </Link>
          </div>

          <div className="space-y-1">
            <div
              className="flex cursor-pointer items-center justify-between px-2"
              onClick={() => setRecentExpanded(!recentExpanded)}
            >
              <h3 className="text-muted-foreground flex items-center text-sm font-medium">
                <Clock className="mr-1 size-3" />
                Recent
              </h3>
              <ChevronDown
                className={`size-3 transition-transform ${recentExpanded ? "rotate-180 transform" : ""}`}
              />
            </div>

            {recentExpanded && (
              <nav className="space-y-1 pl-2">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-xs"
                  size="sm"
                >
                  <div className="flex items-center">
                    <GitBranch className="mr-2 size-3.5 text-emerald-500" />
                    user/project-one
                  </div>
                  <Badge variant="outline" className="h-5 text-xs">
                    3
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-xs"
                  size="sm"
                >
                  <div className="flex items-center">
                    <GitBranch className="mr-2 size-3.5 text-blue-500" />
                    user/project-two
                  </div>
                  <Badge variant="outline" className="h-5 text-xs">
                    1
                  </Badge>
                </Button>
              </nav>
            )}
          </div>

          <Separator className="my-1" />

          <div className="space-y-2">
            <h3 className="text-muted-foreground flex items-center px-2 text-sm font-medium">
              <Code className="mr-1 size-3" />
              Repositories
            </h3>
            <nav className="space-y-1 pl-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Book className="mr-2 size-4" />
                My repositories
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Star className="mr-2 size-4 text-amber-400" />
                Starred
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Activity className="mr-2 size-4 text-rose-500" />
                Activity
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <GitPullRequest className="mr-2 size-4 text-purple-500" />
                Pull requests
              </Button>
            </nav>
          </div>

          <Separator className="my-1" />

          <div className="space-y-2">
            <div
              className="flex cursor-pointer items-center justify-between px-2"
              onClick={() => setOrgsExpanded(!orgsExpanded)}
            >
              <h3 className="text-muted-foreground flex items-center text-sm font-medium">
                <Users className="mr-1 size-3" />
                Teams
              </h3>
              <ChevronDown
                className={`size-3 transition-transform ${orgsExpanded ? "rotate-180 transform" : ""}`}
              />
            </div>

            {orgsExpanded && (
              <nav className="space-y-1 pl-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  size="sm"
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-emerald-500 font-bold text-white">
                    G
                  </div>
                  Gitrise Team
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  size="sm"
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center rounded bg-blue-500 font-bold text-white">
                    D
                  </div>
                  Design Team
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  size="sm"
                >
                  <Plus className="text-muted-foreground mr-2 size-3" />
                  Join team
                </Button>
              </nav>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t pt-4">
        <div className="mb-2 flex items-center justify-between px-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Moon className="size-4" />
          </Button>
          <Button variant="ghost" className="h-8 p-1" size="sm">
            <Settings className="mr-1 size-4" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>

        <Button variant="ghost" className="w-full justify-start" size="sm">
          <div className="flex items-center">
            <Avatar className="mr-2 h-5 w-5">
              <Image src="/logo.png" alt="@user" width={20} height={20} />
            </Avatar>
            <span className="text-sm">username</span>
          </div>
        </Button>
      </div>
    </aside>
  );
}

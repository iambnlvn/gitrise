"use client";

import { Book, Star, Users, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function RepositorySidebar() {
  return (
    <aside className="bg-card/50 w-64 border-r p-4">
      <div className="space-y-4">
        <div>
          <Link href="/new">
            <Button className="w-full justify-start" size="sm">
              <Plus className="mr-2 size-4" />
              New repository
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-muted-foreground px-2 text-sm font-medium">
            Repositories
          </h3>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Book className="mr-2 size-4" />
              All repositories
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Star className="mr-2 size-4" />
              Starred
            </Button>
          </nav>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-muted-foreground px-2 text-sm font-medium">
            Organizations
          </h3>
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Users className="mr-2 size-4" />
              My Organization
            </Button>
          </nav>
        </div>

        <Separator />

        <div className="space-y-2">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 size-4" />
              Settings
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
}

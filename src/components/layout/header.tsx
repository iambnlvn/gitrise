"use client";

import { Search, Plus, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };
  const handleSignOut = () => {
    logout();
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="GitRise"
            width={32}
            height={32}
            className="size-8"
          />
          <span className="text-lg font-semibold">GitRise</span>
        </Link>

        {/* Search - only show when authenticated */}
        {user && (
          <div className="max-w-lg flex-1">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search or jump to..."
                className="bg-muted/50 border-border focus:bg-background pl-10"
              />
            </div>
          </div>
        )}

        {/* Navigation - only show when authenticated */}
        {user && (
          <nav className="ml-6 hidden items-center space-x-6 md:flex">
            <Button variant="ghost" size="sm">
              Pull requests
            </Button>
            <Button variant="ghost" size="sm">
              Issues
            </Button>
            <Button variant="ghost" size="sm">
              Marketplace
            </Button>
            <Button variant="ghost" size="sm">
              Explore
            </Button>
          </nav>
        )}

        {/* Right side */}
        <div className="ml-6 flex items-center space-x-4">
          {user ? (
            <>
              <Button size="sm" className="hidden md:flex">
                <Plus className="mr-1 size-4" />
                New
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="size-4" />
                <span className="bg-accent absolute -top-1 -right-1 size-2 rounded-full"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative size-8 rounded-full"
                  >
                    <Avatar className="size-8">
                      <AvatarImage
                        src={
                          user.user_metadata.avatar_url || "/placeholder.svg"
                        }
                        alt={user.user_metadata.full_name || "User Avatar"}
                      />
                      <AvatarFallback>
                        {user.user_metadata.full_name
                          .split(" ")
                          .map((n: string[]) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">
                        {user.user_metadata.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href={`/user/${user.user_metadata.username}`}>
                    <DropdownMenuItem>Your profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Your repositories</DropdownMenuItem>
                  <DropdownMenuItem>Your organizations</DropdownMenuItem>
                  <DropdownMenuItem>Your projects</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href="/settings/profile">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

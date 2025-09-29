"use client";

import {
  Search,
  Plus,
  Bell,
  Menu,
  X,
  Home,
  GitPullRequest,
  BookOpen,
  Zap,
} from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(11);

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
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="GitRise"
              width={32}
              height={32}
              className="size-8"
            />
            <span className="hidden font-semibold sm:inline">GitRise</span>
          </Link>

          {/* Search - Desktop only */}
          {user && (
            <div className="hidden flex-1 px-6 md:block">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  placeholder="Search repositories..."
                  className="bg-muted/50 border-border/50 focus:bg-background pl-10"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <nav className="hidden items-center space-x-1 lg:flex">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Pull requests
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Issues
                  </Button>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Explore
                  </Button>
                </nav>

                <Button size="sm" className="hidden sm:flex">
                  <Plus className="mr-1 size-4" />
                  New
                </Button>

                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="size-4" />
                  {notificationCount > 0 && (
                    <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-semibold">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative size-8 rounded-full p-0"
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
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex flex-col space-y-1">
                      <span className="font-medium">
                        {user.user_metadata.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {user.email}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href={`/user/${user.user_metadata.username}`}>
                      <DropdownMenuItem>Your profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Your repositories</DropdownMenuItem>
                    <DropdownMenuItem>Your organizations</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href="/settings/profile">
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="size-4" />
                  ) : (
                    <Menu className="size-4" />
                  )}
                </Button>
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
          </div>
        </div>

        {user && mobileMenuOpen && (
          <div className="border-border/40 from-background to-muted/20 border-t bg-gradient-to-b px-0 py-4 md:hidden">
            <div className="mb-4 px-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  placeholder="Search repositories..."
                  className="bg-muted/50 border-border/50 focus:bg-background pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 px-4">
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center justify-center gap-2 bg-transparent py-3"
              >
                <Home className="size-5" />
                <span className="text-xs">Dashboard</span>
              </Button>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center justify-center gap-2 bg-transparent py-3"
              >
                <GitPullRequest className="size-5" />
                <span className="text-xs">Pull Requests</span>
              </Button>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center justify-center gap-2 bg-transparent py-3"
              >
                <BookOpen className="size-5" />
                <span className="text-xs">Issues</span>
              </Button>
              <Button
                variant="outline"
                className="flex h-auto flex-col items-center justify-center gap-2 bg-transparent py-3"
              >
                <Zap className="size-5" />
                <span className="text-xs">Explore</span>
              </Button>
            </div>

            <div className="mt-4 space-y-2 px-4">
              <Button className="w-full" size="sm">
                <Plus className="mr-2 size-4" />
                New Repository
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
              >
                <Bell className="mr-2 size-4" />
                Notifications ({notificationCount})
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

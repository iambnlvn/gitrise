"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileStore } from "@/store/profile-store";
import { Upload, Trash2, Loader2, GitBranch } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { SettingCard } from "../shared";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ProfileOverviewProps {
  user: User;
}

export function ProfileOverview({ user }: ProfileOverviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const isDrawerOpen = useProfileStore((state) => state.isDrawerOpen);
  const setIsDrawerOpen = useProfileStore((state) => state.setIsDrawerOpen);
  const {
    formData,
    profileImage,
    isUploading,
    setProfileImage,
    setIsUploading,
    setShowRemoveDialog,
  } = useProfileStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file (JPG, PNG, or GIF).",
      });
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit", {
        description: "Please choose a smaller file.",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
        toast.success("Profile picture updated!", {
          description: "Your new avatar has been uploaded.",
        });
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to upload image", {
          description: "Please try again.",
        });
      };
      reader.readAsDataURL(file);
    }, 1000);
  };
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };
  const handleRemoveImageClick = () => {
    setShowRemoveDialog(true);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const devStats = [
    { label: "Repositories", value: 34 },
    { label: "Followers", value: 128 },
    { label: "Following", value: 76 },
  ];
  return (
    <SettingCard
      title="Profile Overview"
      description="View and update your profile information"
      tooltip="This section provides a summary of your profile details."
      icon={<GitBranch className="text-primary size-5" />}
    >
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar Section */}
        <div className="flex flex-col gap-4">
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group relative cursor-pointer">
                  <Avatar className="border-border/50 hover:border-primary/50 size-32 border-2 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <AvatarImage
                      src={profileImage || "/placeholder.svg"}
                      alt={user.user_metadata?.full_name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-primary text-xl font-bold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isUploading && (
                    <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-full backdrop-blur-sm">
                      <Loader2 className="text-primary size-6 animate-spin" />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="cursor-pointer gap-2"
                >
                  <Upload className="size-4" />
                  Upload New Picture
                </DropdownMenuItem>
                {profileImage &&
                  profileImage !== user.email?.charAt(0).toUpperCase() && (
                    <DropdownMenuItem
                      onClick={() => setShowRemoveDialog(true)}
                      disabled={isUploading}
                      className="text-destructive focus:text-destructive cursor-pointer gap-2"
                    >
                      <Trash2 className="size-4" />
                      Remove Picture
                    </DropdownMenuItem>
                  )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile - Drawer */}
          {isMobile && (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <div className="group relative cursor-pointer">
                  <Avatar className="border-border/50 active:border-primary/50 size-32 border-2 shadow-lg transition-all duration-300">
                    <AvatarImage
                      src={profileImage || "/placeholder.svg"}
                      alt={user.user_metadata?.full_name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-primary text-xl font-bold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isUploading && (
                    <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-full backdrop-blur-sm">
                      <Loader2 className="text-primary size-6 animate-spin" />
                    </div>
                  )}
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Update Profile Picture</DrawerTitle>
                  <DrawerDescription>
                    Choose an option to update your profile picture
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col items-center space-y-2 p-4">
                  <Avatar className="border-border/50 active:border-primary/50 size-32 border-2 shadow-lg transition-all duration-300">
                    <AvatarImage
                      src={profileImage || "/placeholder.svg"}
                      alt={user.user_metadata?.full_name || "User Avatar"}
                    />
                    <AvatarFallback className="bg-primary text-xl font-bold text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={handleImageUploadClick}
                    disabled={isUploading}
                    className="w-full justify-start gap-2"
                    variant="outline"
                  >
                    <Upload className="size-4" />
                    Upload New Picture
                  </Button>
                  {profileImage &&
                    profileImage !== user.email?.charAt(0).toUpperCase() && (
                      <Button
                        onClick={handleRemoveImageClick}
                        disabled={isUploading}
                        className="w-full justify-start gap-2"
                        variant="outline"
                      >
                        <Trash2 className="size-4" />
                        Remove Picture
                      </Button>
                    )}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-muted-foreground text-xs">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>

        {/* User Info and Stats */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              {user.user_metadata?.full_name || "Developer"}
            </h2>
            <p className="text-muted-foreground">
              @{formData.username || "username"}
            </p>
          </div>

          {/* Developer Stats */}
          <div className="grid grid-cols-3 gap-4">
            {devStats.map((stat) => (
              <div key={stat.label} className="rounded-lg p-3 backdrop-blur">
                <p className="text-primary text-sm font-semibold">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SettingCard>
  );
}

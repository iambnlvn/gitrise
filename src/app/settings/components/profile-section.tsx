"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Upload,
  Github,
  Twitter,
  Linkedin,
  Globe,
  HelpCircle,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { UsernameStatus } from "../types";
export function ProfileSection({ user }: { user: User }) {
  const [hasChanges, setHasChanges] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    user.app_metadata?.avatar_url || user.email?.charAt(0).toUpperCase() || "",
  );
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [username, setUsername] = useState<string>(
    "user.username" in user ? user.app_metadata?.username || "" : "",
  );
  const [usernameStatus] = useState<UsernameStatus>("idle");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast("File size exceeds 2MB limit.", {
          description: "Please choose a smaller file.",
        });
        return;
      }

      setIsUploading(true);
      // Simulate upload for testing ui purposes
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setHasChanges(true);
          setIsUploading(false);
          toast("Profile picture updated successfully!", {
            description: "Your new profile picture has been uploaded.",
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("/placeholder.svg?height=96&width=96");
    setShowRemoveDialog(false);
    setHasChanges(true);
    toast("Profile picture removed.", {
      description: "You can upload a new picture at any time.",
    });
  };

  const handleSave = () => {
    toast("Changes saved successfully!", {
      description: "Your profile has been updated.",
    });
    setHasChanges(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <div>
        <h2 className="text-foreground text-2xl font-bold">Profile</h2>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and public profile
        </p>
      </div>

      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Profile Picture</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <HelpCircle className="text-muted-foreground size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Upload a profile picture to personalize your account.
                  Supported formats: JPG, PNG, GIF. Maximum size: 2MB.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="size-24 transition-all duration-200 hover:ring-4 hover:ring-[#947bd3]/20">
              <AvatarImage
                src={profileImage || "/placeholder.svg"}
                alt={user.user_metadata.full_name || "User Avatar"}
              />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isUploading && (
              <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-full">
                <h3>Uploading...</h3>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 bg-transparent transition-all duration-200 hover:bg-[#947bd3] hover:text-white"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Upload className="size-4" />
                Upload new picture
              </Button>
              {user.user_metadata?.avatar_url && (
                <Button
                  variant="outline"
                  className="hover:bg-destructive hover:text-destructive-foreground gap-2 bg-transparent transition-all duration-200"
                  onClick={() => setShowRemoveDialog(true)}
                  disabled={isUploading}
                >
                  <X className="size-4" />
                  Remove
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              JPG, PNG or GIF. Max size 2MB.
            </p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <HelpCircle className="text-muted-foreground size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Your personal information is visible on your public profile.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                onChange={() => setHasChanges(true)}
                className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                onChange={() => setHasChanges(true)}
                className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setHasChanges(true);
                }}
                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2">
                {usernameStatus === "checking" && (
                  <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                )}
                {usernameStatus === "available" && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
                {usernameStatus === "taken" && (
                  <X className="text-destructive h-4 w-4" />
                )}
              </div>
            </div>
            {usernameStatus === "available" && (
              <p className="animate-in fade-in text-xs text-green-500 duration-200">
                Username is available
              </p>
            )}
            {usernameStatus === "taken" && (
              <p className="text-destructive animate-in fade-in text-xs duration-200">
                Username is already taken
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              rows={4}
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>
        </div>
      </Card>

      {/* Professional Data */}
      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <h3 className="text-lg font-semibold">Professional Data</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Acme Inc."
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Software Engineer"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>
        </div>
      </Card>

      {/* Social Links */}
      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <h3 className="text-lg font-semibold">Social Links</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="size-4" />
              GitHub
            </Label>
            <Input
              id="github"
              placeholder="https://github.com/username"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="size-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="size-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="size-4" />
              Website
            </Label>
            <Input
              id="website"
              placeholder="https://yourwebsite.com"
              onChange={() => setHasChanges(true)}
              className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb] hover:shadow-lg hover:shadow-[#947bd3]/30"
          disabled={!hasChanges || usernameStatus === "taken"}
          onClick={handleSave}
        >
          Save changes
        </Button>
        <Button
          variant="outline"
          disabled={!hasChanges}
          onClick={() => setHasChanges(false)}
          className="transition-all duration-200"
        >
          Reset to default
        </Button>
      </div>

      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove profile picture?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your profile picture to the default avatar. You
              can upload a new picture at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveImage}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

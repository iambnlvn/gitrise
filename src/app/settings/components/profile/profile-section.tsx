"use client";
//TODO!: refactor this asap
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  GitBranch,
  Zap,
  Code2,
  Trash2,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { SettingActions, SettingCard, SettingHeader } from "../shared";
import { UsernameStatus } from "../../types";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, hyphens and underscores",
    ),
  email: z.email("Invalid email address").min(1, "Email is required"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  jobTitle: z
    .string()
    .max(100, "Job title must be less than 100 characters")
    .optional(),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
  github: z
    .url("Invalid GitHub URL")
    .refine(
      (url) => !url || url.includes("github.com"),
      "Must be a valid GitHub URL",
    )
    .optional()
    .or(z.literal("")),
  twitter: z
    .url("Invalid Twitter URL")
    .refine(
      (url) => !url || url.includes("twitter.com") || url.includes("x.com"),
      "Must be a valid Twitter/X URL",
    )
    .optional()
    .or(z.literal("")),
  linkedin: z
    .url("Invalid LinkedIn URL")
    .refine(
      (url) => !url || url.includes("linkedin.com"),
      "Must be a valid LinkedIn URL",
    )
    .optional()
    .or(z.literal("")),
  website: z.url("Invalid website URL").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSection({ user }: { user: User }) {
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    user.app_metadata?.avatar_url || user.email?.charAt(0).toUpperCase() || "",
  );
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [username, setUsername] = useState<string>(
    user.app_metadata?.username || "",
  );
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle");
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});

  const [formData, setFormData] = useState<Partial<ProfileFormData>>({
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    username: user.app_metadata?.username || "",
    email: user.email || "",
    bio: user.user_metadata?.bio || "",
    company: "",
    jobTitle: "",
    location: "",
    github: "",
    twitter: "",
    linkedin: "",
    website: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const usernameCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Validate single field
  const validateField = (fieldName: keyof ProfileFormData, value: string) => {
    try {
      const fieldSchema = profileSchema.shape[fieldName];
      fieldSchema.parse(value);
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [fieldName]: error.issues[0]?.message || "Invalid value",
        }));
      }
      return false;
    }
  };

  const validateForm = (): boolean => {
    try {
      profileSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as keyof ProfileFormData;
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const resetForm = () => {
    setHasChanges(false);
    setUsername(user.app_metadata?.username || "");
    setFormData({
      firstName: user.user_metadata?.first_name || "",
      lastName: user.user_metadata?.last_name || "",
      username: user.app_metadata?.username || "",
      email: user.email || "",
      bio: user.user_metadata?.bio || "",
      company: "",
      jobTitle: "",
      location: "",
      github: "",
      twitter: "",
      linkedin: "",
      website: "",
    });
    setValidationErrors({});
  };

  // Handle input change with validation
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    validateField(field, value);
  };

  // Check username availability with debouncing
  useEffect(() => {
    // Clear prev timeout
    if (usernameCheckTimeoutRef.current) {
      clearTimeout(usernameCheckTimeoutRef.current);
    }

    if (!username || username === user.app_metadata?.username) {
      setUsernameStatus("idle");
      return;
    }

    // Set checking status
    setUsernameStatus("checking");

    usernameCheckTimeoutRef.current = setTimeout(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockTakenUsernames = ["admin", "test", "user", "demo"];
        const isAvailable = !mockTakenUsernames.includes(
          username.toLowerCase(),
        );

        setUsernameStatus(isAvailable ? "available" : "taken");
      } catch {
        setUsernameStatus("idle");
        toast.error("Failed to check username availability", {
          description: "Please try again later.",
        });
      }
    }, 500);

    return () => {
      if (usernameCheckTimeoutRef.current) {
        clearTimeout(usernameCheckTimeoutRef.current);
      }
    };
  }, [username, user.app_metadata?.username]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB limit.", {
          description: "Please choose a smaller file.",
        });
        return;
      }

      setIsUploading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setHasChanges(true);
          setIsUploading(false);
          toast.success("Profile picture updated!", {
            description: "Your new avatar has been uploaded.",
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(user.email?.charAt(0).toUpperCase() || "");
    setShowRemoveDialog(false);
    setHasChanges(true);
    toast.success("Profile picture removed", {
      description: "You can upload a new picture anytime.",
    });
  };
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  const handleRemoveImageClick = () => {
    if (isMobile) {
      setIsDrawerOpen(false);
    }
    setShowRemoveDialog(true);
  };

  const handleSave = () => {
    if (usernameStatus === "taken") {
      toast.error("Cannot save changes", {
        description: "Please choose an available username.",
      });
      return;
    }

    if (!validateForm()) {
      toast.error("Validation failed", {
        description: "Please fix the errors before saving.",
      });
      return;
    }

    toast.success("Changes saved successfully!", {
      description: "Your profile has been updated.",
    });
    setHasChanges(false);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    handleInputChange("username", newUsername);
  };

  const devStats = [
    { label: "Repositories", value: "42" },
    { label: "Contributions", value: "1.2k" },
    { label: "Followers", value: "328" },
  ];

  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      {/* Header Section */}
      <SettingHeader
        title="Profile Settings"
        description="Manage your personal and professional information, profile picture, and social links."
      />

      {/* Profile Hero Card */}
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
              <p className="text-muted-foreground">@{username || "username"}</p>
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

      {/* Personal Information Card */}
      <SettingCard
        title="Personal Information"
        description="Update your personal details"
        tooltip="These details will be displayed on your public profile."
        icon={<HelpCircle className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                  validationErrors.firstName ? "border-red-500" : ""
                }`}
              />
              {validationErrors.firstName && (
                <p className="text-xs text-red-500">
                  {validationErrors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                  validationErrors.lastName ? "border-red-500" : ""
                }`}
              />
              {validationErrors.lastName && (
                <p className="text-xs text-red-500">
                  {validationErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                placeholder="johndoe"
                value={username}
                onChange={handleUsernameChange}
                className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border pr-10 transition-all duration-200 ${
                  validationErrors.username ? "border-red-500" : ""
                }`}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2">
                {usernameStatus === "checking" && (
                  <Loader2 className="text-primary size-4 animate-spin" />
                )}
                {usernameStatus === "available" && (
                  <Check className="size-4 text-emerald-500" />
                )}
                {usernameStatus === "taken" && (
                  <X className="size-4 text-red-500" />
                )}
              </div>
            </div>
            {validationErrors.username && (
              <p className="text-xs text-red-500">
                {validationErrors.username}
              </p>
            )}
            {usernameStatus === "available" && (
              <p className="animate-in fade-in text-xs text-emerald-500/80 duration-200">
                Username is available
              </p>
            )}
            {usernameStatus === "taken" && (
              <p className="animate-in fade-in text-xs text-red-500/80 duration-200">
                Username is already taken
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              3-20 characters, letters, numbers, hyphens and underscores only
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.email ? "border-red-500" : ""
              }`}
            />
            {validationErrors.email && (
              <p className="text-xs text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your passion for development..."
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.bio ? "border-red-500" : ""
              }`}
            />
            {validationErrors.bio && (
              <p className="text-xs text-red-500">{validationErrors.bio}</p>
            )}
          </div>
        </div>
      </SettingCard>

      {/* Professional Information Card */}
      <SettingCard
        title="Professional Information"
        description="Update your professional details"
        tooltip="These details will be displayed on your public profile."
        icon={<Briefcase className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                Company
              </Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                  validationErrors.company ? "border-red-500" : ""
                }`}
              />
              {validationErrors.company && (
                <p className="text-xs text-red-500">
                  {validationErrors.company}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                placeholder="Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                  validationErrors.jobTitle ? "border-red-500" : ""
                }`}
              />
              {validationErrors.jobTitle && (
                <p className="text-xs text-red-500">
                  {validationErrors.jobTitle}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.location ? "border-red-500" : ""
              }`}
            />
            {validationErrors.location && (
              <p className="text-xs text-red-500">
                {validationErrors.location}
              </p>
            )}
          </div>
        </div>
      </SettingCard>

      {/* Skills Section */}
      <SettingCard
        title="Skills & Technologies"
        description="Showcase your technical skills and proficiencies"
        tooltip="These skills will be displayed on your public profile."
        icon={<Code2 className="text-primary size-5" />}
      >
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="border-border/50 bg-primary/10 text-foreground hover:border-primary/50 hover:bg-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300"
            >
              {skill}
            </div>
          ))}
        </div>
      </SettingCard>

      {/* Social Links Card */}
      <SettingCard
        title="Social Links"
        description="Add links to your social media profiles"
        tooltip="These links will be displayed on your public profile."
        icon={<Zap className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="github"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Github className="size-4" />
              GitHub
            </Label>
            <Input
              id="github"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.github ? "border-red-500" : ""
              }`}
            />
            {validationErrors.github && (
              <p className="text-xs text-red-500">{validationErrors.github}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="twitter"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Twitter className="size-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              placeholder="https://twitter.com/username"
              value={formData.twitter}
              onChange={(e) => handleInputChange("twitter", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.twitter ? "border-red-500" : ""
              }`}
            />
            {validationErrors.twitter && (
              <p className="text-xs text-red-500">{validationErrors.twitter}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="linkedin"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.linkedin ? "border-red-500" : ""
              }`}
            />
            {validationErrors.linkedin && (
              <p className="text-xs text-red-500">
                {validationErrors.linkedin}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="website"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Globe className="size-4" />
              Personal Website
            </Label>
            <Input
              id="website"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
                validationErrors.website ? "border-red-500" : ""
              }`}
            />
            {validationErrors.website && (
              <p className="text-xs text-red-500">{validationErrors.website}</p>
            )}
          </div>
        </div>
      </SettingCard>

      {/* Action Buttons */}
      <SettingActions
        hasChanges={hasChanges}
        onReset={resetForm}
        onSave={handleSave}
      />

      {!isMobile && (
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
                Remove Picture
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Remove Image Drawer - Mobile */}
      {isMobile && (
        <Drawer open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Remove profile picture?</DrawerTitle>
              <DrawerDescription>
                This will reset your profile picture to the default avatar. You
                can upload a new picture at any time.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <Button
                onClick={handleRemoveImage}
                variant="destructive"
                className="w-full"
              >
                Remove Picture
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

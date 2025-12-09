"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/store/profile-store";

import { UsernameInput } from "./username-input";
import { FormInput } from "./form-input";

import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Briefcase,
  Zap,
  HelpCircle,
} from "lucide-react";
import { SkillsSection } from "./skills-section";
import { RemoveImageDialog } from "./remove-image-dialog";
import { ProfileOverview } from "./profile-overview";
import {
  SettingActions,
  SettingCard,
  SettingHeader,
} from "../../components/shared";

export function ProfileSettings({ user }: { user: User }) {
  const { formData, hasChanges, saveProfile, initializeProfile } =
    useProfileStore();

  useEffect(() => {
    initializeProfile(user);
  }, [user, initializeProfile]);

  const handleSave = async () => {
    try {
      await saveProfile();
      toast.success("Changes saved successfully!", {
        description: "Your profile has been updated.",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save changes",
        {
          description: "Please fix the errors before saving.",
        },
      );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Profile Settings"
        description="Manage your personal and professional information, profile picture, and social links."
      />
      <ProfileOverview user={user} />

      {/* Personal Information */}
      <SettingCard
        title="Personal Information"
        description="Update your personal details"
        tooltip="These details will be displayed on your public profile."
        icon={<HelpCircle className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              id="firstName"
              label="First Name"
              placeholder={formData.firstName || "David"}
            />
            <FormInput
              id="lastName"
              label="Last Name"
              placeholder={formData.lastName || "Martinez"}
            />
          </div>

          <UsernameInput
            originalUsername={user.user_metadata.username as string}
          />
          <FormInput
            id="email"
            label="Email Address"
            placeholder={formData.email as string}
            type="email"
          />
          <FormInput
            id="bio"
            label="Bio"
            placeholder="Tell us about yourself and your passion for development..."
            type="textarea"
            rows={4}
          />
        </div>
      </SettingCard>

      <SettingCard
        title="Professional Information"
        description="Update your professional details"
        tooltip="These details will be displayed on your public profile."
        icon={<Briefcase className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput id="company" label="Company" placeholder="Evil Corp" />
            <FormInput
              id="jobTitle"
              label="Job Title"
              placeholder="Senior Software Engineer"
            />
          </div>
          <FormInput
            id="location"
            label="Location"
            placeholder="San Francisco, CA"
          />
        </div>
      </SettingCard>

      <SkillsSection />

      <SettingCard
        title="Social Links"
        description="Add links to your social media profiles"
        tooltip="These links will be displayed on your public profile."
        icon={<Zap className="text-primary size-5" />}
      >
        <div className="space-y-5">
          <FormInput
            id="github"
            label="GitHub"
            placeholder="https://github.com/username"
            type="url"
            icon={Github}
          />
          <FormInput
            id="twitter"
            label="Twitter"
            placeholder="https://twitter.com/username"
            type="url"
            icon={Twitter}
          />
          <FormInput
            id="linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            type="url"
            icon={Linkedin}
          />
          <FormInput
            id="website"
            label="Personal Website"
            placeholder="https://yourwebsite.com"
            type="url"
            icon={Globe}
          />
        </div>
      </SettingCard>

      <SettingActions hasChanges={hasChanges} onSave={handleSave} />

      <RemoveImageDialog userEmail={user.email || ""} />
    </div>
  );
}

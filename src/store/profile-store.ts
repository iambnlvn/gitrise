import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";
import { z } from "zod";
import { UsernameStatus } from "@/app/settings/profile/profile-types";

export const profileSchema = z.object({
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

export type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileState {
  // Form data
  formData: Partial<ProfileFormData>;
  originalData: Partial<ProfileFormData>;

  // Skills
  skills: string[];
  originalSkills: string[];

  // UI state
  profileImage: string;
  hasChanges: boolean;
  isUploading: boolean;
  usernameStatus: UsernameStatus;
  isDrawerOpen: boolean;
  showRemoveDialog: boolean;

  // Validation
  validationErrors: Partial<Record<keyof ProfileFormData, string>>;

  // Actions
  initializeProfile: (user: User) => void;
  updateField: (field: keyof ProfileFormData, value: string) => void;
  validateField: (field: keyof ProfileFormData, value: string) => boolean;
  validateForm: () => boolean;
  setProfileImage: (image: string) => void;
  setIsUploading: (isUploading: boolean) => void;
  setUsernameStatus: (status: UsernameStatus) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  setShowRemoveDialog: (show: boolean) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  resetForm: () => void;
  saveProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set, get) => ({
      // Initial state
      formData: {},
      originalData: {},
      skills: [],
      originalSkills: [],
      profileImage: "",
      hasChanges: false,
      isUploading: false,
      usernameStatus: "idle",
      isDrawerOpen: false,
      showRemoveDialog: false,
      validationErrors: {},

      // Initialize profile with user data
      initializeProfile: (user: User) => {
        const initialData: Partial<ProfileFormData> = {
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          username: user.user_metadata?.username || "",
          email: user.email || "",
          bio: user.user_metadata?.bio || "",
          company: "",
          jobTitle: "",
          location: "",
          github: "",
          twitter: "",
          linkedin: "",
          website: "",
        };
        const initialSkills = user.user_metadata?.skills || [];

        set({
          formData: initialData,
          originalData: initialData,
          skills: initialSkills,
          originalSkills: initialSkills,
          profileImage:
            user.app_metadata?.avatar_url ||
            user.email?.charAt(0).toUpperCase() ||
            "",
        });
      },

      // Update form field
      updateField: (field, value) => {
        const { formData, validateField } = get();

        set({
          formData: { ...formData, [field]: value },
          hasChanges: true,
        });

        validateField(field, value);
      },

      // Validate single field
      validateField: (field, value) => {
        try {
          const fieldSchema = profileSchema.shape[field];
          fieldSchema.parse(value);

          set((state) => {
            const newErrors = { ...state.validationErrors };
            delete newErrors[field];
            return { validationErrors: newErrors };
          });

          return true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            set((state) => ({
              validationErrors: {
                ...state.validationErrors,
                [field]: error.issues[0]?.message || "Invalid value",
              },
            }));
          }
          return false;
        }
      },

      // Validate entire form
      validateForm: () => {
        const { formData } = get();

        try {
          profileSchema.parse(formData);
          set({ validationErrors: {} });
          return true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors: Partial<Record<keyof ProfileFormData, string>> = {};
            error.issues.forEach((err) => {
              const path = err.path[0] as keyof ProfileFormData;
              errors[path] = err.message;
            });
            set({ validationErrors: errors });
          }
          return false;
        }
      },

      setProfileImage: (image) =>
        set({ profileImage: image, hasChanges: true }),
      setIsUploading: (isUploading) => set({ isUploading }),
      setUsernameStatus: (status) => set({ usernameStatus: status }),
      setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
      setShowRemoveDialog: (show) => set({ showRemoveDialog: show }),
      addSkill: (skill) => {
        set((state) => ({
          skills: [...state.skills, skill],
          hasChanges: true,
        }));
      },
      removeSkill: (skill) => {
        set((state) => ({
          skills: state.skills.filter((s) => s !== skill),
          hasChanges: true,
        }));
      },
      // Reset form to original state
      resetForm: () => {
        const { originalData, originalSkills } = get();
        set({
          formData: originalData,
          skills: originalSkills,
          hasChanges: false,
          validationErrors: {},
          usernameStatus: "idle",
        });
      },

      // Save profile
      saveProfile: async () => {
        const { validateForm, usernameStatus } = get();

        if (usernameStatus === "taken") {
          throw new Error("Username is already taken");
        }

        if (!validateForm()) {
          throw new Error("Validation failed");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        set((state) => ({
          originalData: state.formData,
          originalSkills: state.skills,
          hasChanges: false,
        }));
      },
    }),
    { name: "ProfileStore" },
  ),
);

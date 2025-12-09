import { Mail, MessageSquare, Smartphone, Bell, Filter } from "lucide-react";
import type { NotificationState, DigestFrequency } from "./notification-types";
import type {
  SettingGroupConfig,
  OptionConfig,
} from "../components/shared/types";

/**
 * Default notification settings state.
 */
export const DEFAULT_STATE: NotificationState = {
  emailEnabled: true,
  inAppEnabled: true,
  pushEnabled: false,
  pullRequestsEnabled: true,
  issuesEnabled: true,
  commentsEnabled: true,
  mentionsEnabled: true,
  repositoryUpdatesEnabled: false,
  emailDigestFrequency: "daily",
  doNotDisturb: false,
  onlyParticipating: false,
  ignoreBotActivity: true,
  groupSimilar: true,
};

/**
 * Email digest frequency options.
 */
export const DIGEST_FREQUENCY_OPTIONS: OptionConfig<DigestFrequency>[] = [
  {
    value: "realtime",
    label: "Real-time",
    description: "Receive notifications immediately",
  },
  {
    value: "hourly",
    label: "Hourly",
    description: "Receive a digest every hour",
  },
  {
    value: "daily",
    label: "Daily",
    description: "Receive a daily summary",
  },
  {
    value: "weekly",
    label: "Weekly",
    description: "Receive a weekly summary",
  },
  {
    value: "never",
    label: "Never",
    description: "Turn off email notifications",
  },
];

/**
 * Grouped notification settings configuration.
 */
export const SETTING_GROUPS: SettingGroupConfig<NotificationState>[] = [
  {
    id: "channels",
    title: "Notification Channels",
    description: "Choose how you receive notifications",
    tooltip:
      "Select which channels you want to receive notifications through. You can enable multiple channels.",
    icon: Bell,
    settings: [
      {
        type: "toggle",
        key: "emailEnabled",
        label: "Email Notifications",
        description: "Receive notifications via email",
        icon: Mail,
      },
      {
        type: "toggle",
        key: "inAppEnabled",
        label: "In-App Notifications",
        description: "Show notifications in GitRise",
        icon: MessageSquare,
      },
      {
        type: "toggle",
        key: "pushEnabled",
        label: "Push Notifications",
        description: "Receive push notifications on mobile devices",
        icon: Smartphone,
      },
    ],
  },
  {
    id: "activities",
    title: "Activity Notifications",
    description: "Control which activities trigger notifications",
    tooltip:
      "Choose which types of activities you want to be notified about. This helps reduce notification noise.",
    icon: Bell,
    settings: [
      {
        type: "toggle",
        key: "pullRequestsEnabled",
        label: "Pull Requests",
        description: "Updates on pull requests you're involved in",
      },
      {
        type: "toggle",
        key: "issuesEnabled",
        label: "Issues",
        description: "Updates on issues you're assigned to or watching",
      },
      {
        type: "toggle",
        key: "commentsEnabled",
        label: "Comments",
        description: "New comments on your pull requests and issues",
      },
      {
        type: "toggle",
        key: "mentionsEnabled",
        label: "Mentions",
        description: "When someone @mentions you in a comment",
      },
      {
        type: "toggle",
        key: "repositoryUpdatesEnabled",
        label: "Repository Updates",
        description: "Updates from repositories you're watching",
      },
    ],
  },
  {
    id: "frequency",
    title: "Notification Frequency",
    description: "Control how often you receive notifications",
    tooltip:
      "Manage the frequency of your notifications. Email digests combine multiple notifications into a single email.",
    icon: Bell,
    settings: [
      {
        type: "select",
        key: "emailDigestFrequency",
        label: "Email Digest",
        description: "How often to receive email summaries",
        options: DIGEST_FREQUENCY_OPTIONS,
      },
      {
        type: "toggle",
        key: "doNotDisturb",
        label: "Do Not Disturb",
        description: "Temporarily pause all notifications",
      },
    ],
  },
  {
    id: "filters",
    title: "Notification Filters",
    description: "Fine-tune which notifications you receive",
    tooltip:
      "Apply filters to reduce notification volume and focus on what matters most to you.",
    icon: Filter,
    settings: [
      {
        type: "toggle",
        key: "onlyParticipating",
        label: "Only participating threads",
        description:
          "Only notify for conversations you're directly involved in",
      },
      {
        type: "toggle",
        key: "ignoreBotActivity",
        label: "Ignore bot activity",
        description: "Don't notify for automated bot actions and updates",
      },
      {
        type: "toggle",
        key: "groupSimilar",
        label: "Group similar notifications",
        description: "Combine related notifications to reduce clutter",
      },
    ],
  },
];

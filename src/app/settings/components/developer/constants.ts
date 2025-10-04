/**
 * Constants and mock data for developer settings.
 *
 * This module provides:
 * - Mock data for testing and development
 * - Configuration options for UI components
 * - Default state and preferences
 * - Predefined integration templates
 *
 * @module DeveloperConstants
 */

import type {
  DeveloperState,
  PersonalAccessToken,
  SSHKey,
  GPGKey,
  OAuthApp,
  Webhook,
  Integration,
  APIUsage,
  ConnectedIntegration,
  APIVersion,
  JSONIndentation,
  DeveloperPreferences,
  PermissionPresetConfig,
  IntegrationPermissions,
} from "./developer-types";

/**
 * Sample personal access tokens for development and testing.
 * Includes tokens in various states (active, expired) with different scopes.
 */
export const INITIAL_TOKENS: PersonalAccessToken[] = [
  {
    id: "1",
    name: "GitHub Actions CI/CD",
    scopes: ["repo", "workflow", "write:packages"],
    lastUsed: "2 hours ago",
    created: "Jan 15, 2024",
    expires: "Jul 15, 2024",
    status: "active",
  },
  {
    id: "2",
    name: "Personal CLI Tool",
    scopes: ["read:user", "repo"],
    lastUsed: "5 days ago",
    created: "Dec 1, 2023",
    expires: "Never",
    status: "active",
  },
  {
    id: "3",
    name: "Old Integration",
    scopes: ["repo"],
    lastUsed: "Never",
    created: "Oct 10, 2023",
    expires: "Jan 10, 2024",
    status: "expired",
  },
] as const;

/**
 * Sample SSH keys for development and testing.
 * Represents keys from different devices with various usage patterns.
 */
export const INITIAL_SSH_KEYS: SSHKey[] = [
  {
    id: "1",
    name: "MacBook Pro",
    fingerprint: "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
    added: "Jan 15, 2024",
    created: "Jan 15, 2024",
    lastUsed: "2 hours ago from 192.168.1.1",
  },
  {
    id: "2",
    name: "Work Laptop",
    fingerprint: "SHA256:kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8nThbg6",
    added: "Oct 03, 2025",
    created: "Oct 03, 2025",
    lastUsed: "4 days ago from 10.0.0.5",
  },
  {
    id: "3",
    name: "Old Desktop",
    fingerprint: "SHA256:RomTxdCARLviKw6E5SY8nThbg6kXUpJWGl7E1IGOCsp",
    added: "Oct 10, 2023",
    created: "Oct 10, 2023",
    lastUsed: "Never",
  },
] as const;

/**
 * Sample GPG keys for development and testing.
 * Includes both primary and backup signing keys.
 */
export const INITIAL_GPG_KEYS: GPGKey[] = [
  {
    id: "1",
    name: "Primary Signing Key",
    keyId: "4096R/ABCD1234",
    email: "davidmartinez@gitrise.com",
    added: "Jan 15, 2024",
    created: "Jan 15, 2024",
    verified: true,
    primary: true,
  },
  {
    id: "2",
    name: "Backup Key",
    keyId: "4096R/EFGH5678",
    email: "bk.davidmartinez@gitrise.com",
    added: "Dec 1, 2023",
    created: "Dec 1, 2023",
    verified: true,
    primary: false,
  },
] as const;

/**
 * Sample OAuth applications for development and testing.
 * Represents registered OAuth apps with various permission scopes.
 */
export const INITIAL_OAUTH_APPS: OAuthApp[] = [
  {
    id: "1",
    name: "My CI/CD Platform",
    clientId: "Iv1.a629723000000000",
    clientSecret: "secret_a629723000000000",
    callback: "https://ci.gitrise.com/callback",
    created: "Jan 15, 2024",
    permissions: ["repo", "user", "workflow"],
  },
  {
    id: "2",
    name: "Analytics Dashboard",
    clientId: "Iv1.b739824111111111",
    clientSecret: "secret_b739824111111111",
    callback: "https://analytics.gitrise.com/auth",
    created: "Dec 1, 2023",
    permissions: ["read:user", "read:org"],
  },
] as const;

/**
 * Sample webhooks for development and testing.
 * Includes webhooks in both active and failed states.
 */
export const INITIAL_WEBHOOKS: Webhook[] = [
  {
    id: "1",
    url: "https://api.gitrise.com/webhooks/push",
    events: ["push", "pull_request", "release"],
    status: "active",
    lastDelivery: "2 hours ago",
    responseCode: 200,
    latency: "145ms",
  },
  {
    id: "2",
    url: "https://ci.gitrise.com/hooks/build",
    events: ["push", "tag"],
    status: "failed",
    lastDelivery: "1 day ago",
    responseCode: 500,
    latency: "2.3s",
  },
] as const;

/**
 * Sample API usage statistics for development and testing.
 * Shows current rate limit status and success metrics.
 */
export const INITIAL_API_USAGE: APIUsage = {
  requestsToday: 1247,
  dailyLimit: 5000,
  rateLimitRemaining: 3753,
  rateLimitReset: "47m",
  successRate: 98.7,
  failedRequests: 16,
} as const;

/**
 * Default integration permissions for read-only access.
 * Suitable for monitoring and analytics integrations.
 */
const READ_ONLY_PERMISSIONS: IntegrationPermissions = {
  repository: "read",
  webhook: "none",
  issues: "read",
  pullRequests: "read",
  deployments: "read",
  organization: "read",
  canCreateRepositories: false,
  canDeleteRepositories: false,
  canManageTeams: false,
  canManageMembers: false,
  canAccessAnalytics: true,
  canManageSecrets: false,
  canTriggerBuilds: false,
  grantedAt: new Date().toISOString(),
};

/**
 * Default integration permissions for standard access.
 * Balanced permissions for most integrations.
 */
const STANDARD_PERMISSIONS: IntegrationPermissions = {
  repository: "write",
  webhook: "read",
  issues: "write",
  pullRequests: "write",
  deployments: "read",
  organization: "read",
  canCreateRepositories: false,
  canDeleteRepositories: false,
  canManageTeams: false,
  canManageMembers: false,
  canAccessAnalytics: true,
  canManageSecrets: false,
  canTriggerBuilds: true,
  grantedAt: new Date().toISOString(),
};

/**
 * Predefined integration templates available for connection.
 * Each template defines the integration type, requirements, and documentation.
 */
export const PREDEFINED_INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    type: "webhook",
    description: "Send notifications to Slack channels",
    requiresApiKey: false,
    requiresWebhook: true,
    icon: "https://cdn.simpleicons.org/slack",
    category: "communication",
    documentationUrl: "https://docs.slack.dev/",
    requiredPermissions: ["webhook", "issues", "pullRequests"],
  },
  {
    id: "discord",
    name: "Discord",
    type: "webhook",
    description: "Send notifications to Discord channels",
    requiresApiKey: false,
    requiresWebhook: true,
    icon: "https://cdn.simpleicons.org/discord",
    category: "communication",
    documentationUrl: "https://discord.com/developers/docs/reference",
    requiredPermissions: ["webhook", "issues"],
  },
  {
    id: "github",
    name: "GitHub",
    type: "oauth",
    description: "Connect with GitHub repositories",
    requiresApiKey: true,
    requiresWebhook: false,
    icon: "https://cdn.simpleicons.org/github",
    category: "version-control",
    documentationUrl: "https://docs.github.com/en/rest",
    requiredPermissions: ["repository", "issues", "pullRequests"],
  },
  {
    id: "gitlab",
    name: "GitLab",
    type: "oauth",
    description: "Connect with GitLab repositories",
    requiresApiKey: true,
    requiresWebhook: false,
    icon: "https://cdn.simpleicons.org/gitlab",
    category: "version-control",
    documentationUrl: "https://docs.gitlab.com/api/",
    requiredPermissions: ["repository", "issues", "pullRequests"],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    type: "ci_cd",
    description: "Integrate with Jenkins CI/CD pipeline",
    requiresApiKey: true,
    requiresWebhook: true,
    icon: "https://cdn.simpleicons.org/jenkins",
    category: "ci-cd",
    documentationUrl: "https://www.jenkins.io/doc/",
    requiredPermissions: ["repository", "webhook", "deployments"],
  },
  {
    id: "jira",
    name: "Jira",
    type: "api",
    description: "Sync issues with Jira",
    requiresApiKey: true,
    requiresWebhook: false,
    icon: "https://cdn.simpleicons.org/jira",
    category: "project-management",
    documentationUrl:
      "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/",
    requiredPermissions: ["issues", "pullRequests"],
  },
] as const;

/**
 * Sample connected integrations for development and testing.
 * Shows integrations in various states with different permission levels.
 */
export const INITIAL_INTEGRATIONS: ConnectedIntegration[] = [
  {
    id: "slack",
    name: "Slack",
    type: "webhook",
    description: "Team communication",
    status: "active",
    connectedAt: "Nov 11, 2025",
    category: "communication",
    documentationUrl: "https://docs.slack.dev/",
    icon: "https://cdn.simpleicons.org/slack",
    requiresApiKey: false,
    requiresWebhook: true,
    permissions: READ_ONLY_PERMISSIONS,
    permissionPreset: "read-only",
    requiredPermissions: ["webhook", "issues", "pullRequests"],
    webhookUrl:
      "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX",
  },
  {
    id: "github",
    name: "GitHub",
    type: "oauth",
    description: "Code hosting platform",
    status: "active",
    connectedAt: "Feb 09, 2025",
    category: "version-control",
    documentationUrl: "https://docs.github.com/en/rest",
    icon: "https://cdn.simpleicons.org/github",
    requiresApiKey: true,
    requiresWebhook: false,
    permissions: STANDARD_PERMISSIONS,
    permissionPreset: "standard",
    requiredPermissions: ["repository", "issues", "pullRequests"],
    apiKey: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
] as const;

/**
 * Available token scopes with descriptions.
 * Used in token creation and management UI.
 */
export const TOKEN_SCOPES = [
  { id: "repo", label: "repo - Full control of repositories" },
  { id: "workflow", label: "workflow - Update GitHub Action workflows" },
  { id: "write:packages", label: "write:packages - Upload packages" },
  { id: "read:user", label: "read:user - Read user profile data" },
  { id: "admin:repo_hook", label: "admin:repo_hook - Full control of hooks" },
] as const;

/**
 * Available webhook events with descriptions.
 * Used in webhook configuration UI.
 */
export const WEBHOOK_EVENTS = [
  { id: "push", label: "Push - Code pushed to repository" },
  { id: "pull_request", label: "Pull Request - PR opened, closed, or merged" },
  { id: "release", label: "Release - New release published" },
  { id: "tag", label: "Tag - New tag created" },
  { id: "issues", label: "Issues - Issue opened, closed, or edited" },
] as const;

/**
 * API version options for preferences.
 * Currently only v1 is supported.
 */
export const API_VERSION_OPTIONS: ReadonlyArray<{
  value: APIVersion;
  label: string;
}> = [{ value: "v1", label: "v1" }] as const;

/**
 * JSON indentation formatting options.
 * Used in developer preferences for API response formatting.
 */
export const JSON_INDENTATION_OPTIONS: ReadonlyArray<{
  value: JSONIndentation;
  label: string;
}> = [
  { value: 2, label: "2 spaces" },
  { value: 4, label: "4 spaces" },
  { value: "minified", label: "Minified" },
] as const;

/**
 * Permission preset configurations with default values.
 * Provides quick permission templates for integrations.
 */
export const PERMISSION_PRESETS: PermissionPresetConfig[] = [
  {
    preset: "read-only",
    label: "Read Only",
    description: "View-only access to repositories and issues",
    permissions: READ_ONLY_PERMISSIONS,
  },
  {
    preset: "standard",
    label: "Standard",
    description: "Read and write access for common operations",
    permissions: STANDARD_PERMISSIONS,
  },
  {
    preset: "full-access",
    label: "Full Access",
    description: "Complete access to all features and settings",
    permissions: {
      repository: "admin",
      webhook: "write",
      issues: "write",
      pullRequests: "write",
      deployments: "write",
      organization: "admin",
      canCreateRepositories: true,
      canDeleteRepositories: true,
      canManageTeams: true,
      canManageMembers: true,
      canAccessAnalytics: true,
      canManageSecrets: true,
      canTriggerBuilds: true,
      grantedAt: new Date().toISOString(),
    },
  },
  {
    preset: "custom",
    label: "Custom",
    description: "Manually configure specific permissions",
    permissions: READ_ONLY_PERMISSIONS, // Default base for custom
  },
] as const;

/**
 * Default developer preferences configuration.
 * Applied when no user preferences are set.
 */
const DEFAULT_PREFERENCES: DeveloperPreferences = {
  defaultAPIVersion: "v1",
  webhookAutoRetry: true,
  jsonIndentation: 2,
  apiDocsDarkMode: true,
  defaultPermissionPreset: "standard",
} as const;

/**
 * Complete default developer state.
 * Used for initialization and testing.
 */
export const DEFAULT_DEVELOPER_STATE: DeveloperState = {
  tokens: INITIAL_TOKENS as unknown as PersonalAccessToken[],
  sshKeys: INITIAL_SSH_KEYS as unknown as SSHKey[],
  gpgKeys: INITIAL_GPG_KEYS as unknown as GPGKey[],
  oauthApps: INITIAL_OAUTH_APPS as unknown as OAuthApp[],
  webhooks: INITIAL_WEBHOOKS as unknown as Webhook[],
  connectedIntegrations:
    INITIAL_INTEGRATIONS as unknown as ConnectedIntegration[],
  availableIntegrations: PREDEFINED_INTEGRATIONS as unknown as Integration[],
  apiUsage: INITIAL_API_USAGE,
  preferences: DEFAULT_PREFERENCES,
  permissionPresets: PERMISSION_PRESETS as unknown as PermissionPresetConfig[],
} as const;

/**
 * Maximum number of API requests allowed per day.
 */
export const MAX_DAILY_REQUESTS = 5000 as const;

/**
 * Default token expiration duration in days.
 */
export const DEFAULT_TOKEN_EXPIRATION_DAYS = 90 as const;

/**
 * Maximum number of webhooks per repository.
 */
export const MAX_WEBHOOKS_PER_REPO = 20 as const;

/**
 * Webhook delivery timeout in milliseconds.
 */
export const WEBHOOK_TIMEOUT_MS = 30000 as const;

/**
 * Maximum number of retry attempts for failed webhooks.
 */
export const MAX_WEBHOOK_RETRIES = 3 as const;

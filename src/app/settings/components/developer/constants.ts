import type {
  DeveloperState,
  PersonalAccessToken,
  SSHKey,
  GPGKey,
  OAuthApp,
  Webhook,
  Integration,
  APIUsage,
} from "./developer-types";

/**
 * Sample personal access tokens.
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
];

/**
 * Sample SSH keys.
 */
export const INITIAL_SSH_KEYS: SSHKey[] = [
  {
    id: "1",
    name: "MacBook Pro",
    fingerprint: "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
    added: "Jan 15, 2024",
    lastUsed: "2 hours ago from 192.168.1.1",
  },
  {
    id: "2",
    name: "Work Laptop",
    fingerprint: "SHA256:kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8nThbg6",
    added: "Oct 03, 2025",
    lastUsed: "4 days ago from 10.0.0.5",
  },
  {
    id: "3",
    name: "Old Desktop",
    fingerprint: "SHA256:RomTxdCARLviKw6E5SY8nThbg6kXUpJWGl7E1IGOCsp",
    added: "Oct 10, 2023",
    lastUsed: "Never",
  },
];

/**
 * Sample GPG keys.
 */
export const INITIAL_GPG_KEYS: GPGKey[] = [
  {
    id: "1",
    name: "Primary Signing Key",
    keyId: "4096R/ABCD1234",
    email: "davidmartinez@gitrise.com",
    added: "Jan 15, 2024",
    verified: true,
    primary: true,
  },
  {
    id: "2",
    name: "Backup Key",
    keyId: "4096R/EFGH5678",
    email: "bk.davidmartinez@gitrise.com",
    added: "Dec 1, 2023",
    verified: true,
    primary: false,
  },
];

/**
 * Sample OAuth applications.
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
];

/**
 * Sample webhooks.
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
];

/**
 * Sample integrations.
 */
export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: "1",
    name: "Slack",
    type: "messaging",
    description: "Team communication",
    status: "active",
    lastSync: "2 hours ago",
    configuration: {
      apiKey: "xoxb-1234567890-abcdefghijklmnop",
      permissions: ["messages", "channels"],
    },
  },
  {
    id: "2",
    name: "Discord",
    type: "messaging",
    description: "Community chat",
    status: "active",
    lastSync: "1 day ago",
    configuration: {
      apiKey: "Bot abcdefghijklmnopqrstuvwxyz",
      webhookUrl:
        "https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwx",
      permissions: ["webhooks"],
    },
  },
];
export const INTEGRATION_TYPES = [
  { value: "ci-cd", label: "CI/CD" },
  { value: "monitoring", label: "Monitoring" },
  { value: "messaging", label: "Messaging" },
  { value: "project-management", label: "Project Management" },
  { value: "custom", label: "Custom" },
] as const;

/**
 * Sample API usage statistics.
 */
export const INITIAL_API_USAGE: APIUsage = {
  requestsToday: 1247,
  dailyLimit: 5000,
  rateLimitRemaining: 3753,
  rateLimitReset: "47m",
  successRate: 98.7,
  failedRequests: 16,
};

/**
 * Default developer state.
 */
export const DEFAULT_DEVELOPER_STATE: DeveloperState = {
  tokens: INITIAL_TOKENS,
  sshKeys: INITIAL_SSH_KEYS,
  gpgKeys: INITIAL_GPG_KEYS,
  oauthApps: INITIAL_OAUTH_APPS,
  webhooks: INITIAL_WEBHOOKS,
  integrations: INITIAL_INTEGRATIONS,
  apiUsage: INITIAL_API_USAGE,
  preferences: {
    defaultAPIVersion: "v1",
    webhookAutoRetry: true,
    jsonIndentation: "2",
    apiDocsDarkMode: true,
  },
};

/**
 * Available token scopes.
 */
export const TOKEN_SCOPES = [
  { id: "repo", label: "repo - Full control of repositories" },
  { id: "workflow", label: "workflow - Update GitHub Action workflows" },
  { id: "write:packages", label: "write:packages - Upload packages" },
  { id: "read:user", label: "read:user - Read user profile data" },
  { id: "admin:repo_hook", label: "admin:repo_hook - Full control of hooks" },
];

/**
 * Available webhook events.
 */
export const WEBHOOK_EVENTS = [
  { id: "push", label: "Push - Code pushed to repository" },
  { id: "pull_request", label: "Pull Request - PR opened, closed, or merged" },
  { id: "release", label: "Release - New release published" },
  { id: "tag", label: "Tag - New tag created" },
  { id: "issues", label: "Issues - Issue opened, closed, or edited" },
];

/**
 * API version options.
 */
export const API_VERSION_OPTIONS = [{ value: "v1", label: "v1" }];

/**
 * JSON indentation options.
 */
export const JSON_INDENTATION_OPTIONS = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "minified", label: "Minified" },
];

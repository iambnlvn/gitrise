/**
 * Developer settings types and interfaces for managing API access, integrations,
 * and developer tools within the GitRise platform.
 *
 * This module provides type definitions for:
 * - Personal Access Tokens (PAT)
 * - SSH and GPG Keys
 * - OAuth Applications
 * - Webhooks
 * - Third-party Integrations
 * - Permission Management
 * - API Usage Tracking
 *
 * @module DeveloperTypes
 */

/**
 * Status of a personal access token.
 * - `active`: Token is valid and can be used
 * - `expired`: Token has passed its expiration date
 */
export type TokenStatus = "active" | "expired";

/**
 * Status of a webhook delivery.
 * - `active`: Webhook is functioning normally
 * - `failed`: Webhook delivery has failed
 */
export type WebhookStatus = "active" | "failed";

/**
 * Status of a third-party integration.
 * - `active`: Integration is connected and working
 * - `inactive`: Integration is disconnected or disabled
 */
export type IntegrationStatus = "active" | "inactive";

/**
 * Supported API version for GitRise APIs.
 */
export type APIVersion = "v1";

/**
 * JSON formatting preferences for API responses.
 * - `2`: 2-space indentation
 * - `4`: 4-space indentation
 * - `minified`: No whitespace
 */
export type JSONIndentation = 2 | 4 | "minified";

/**
 * Reason for revoking a token.
 * - `compromised`: Token security has been breached
 * - `no_longer_needed`: Token is no longer required
 * - `other`: Other unspecified reason
 */
export type TokenRevocationReason =
  | "compromised"
  | "no_longer_needed"
  | "other";

/**
 * Base interface for entities with common identification properties.
 */
interface BaseEntity {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** ISO 8601 timestamp of creation */
  created: string;
}

/**
 * Base interface for key-based entities.
 * Extends BaseEntity with last usage tracking.
 */
interface BaseKey extends BaseEntity {
  /** ISO 8601 timestamp of last usage */
  lastUsed: string;
}

/**
 * Personal Access Token (PAT) for API authentication.
 * Tokens provide programmatic access to GitRise APIs with specific scopes.
 */
export interface PersonalAccessToken extends BaseEntity {
  /** Array of permission scopes granted to this token */
  scopes: string[];
  /** ISO 8601 timestamp of last usage */
  lastUsed: string;
  /** ISO 8601 timestamp when token expires */
  expires: string;
  /** Current status of the token */
  status: TokenStatus;
}

/**
 * SSH Key for secure Git operations.
 * Used for authenticating Git pushes and pulls via SSH protocol.
 */
export interface SSHKey extends BaseKey {
  /** SHA-256 fingerprint of the public key */
  fingerprint: string;
  /** ISO 8601 timestamp when key was added */
  added: string;
}

/**
 * GPG Key for commit signing.
 * Used to cryptographically sign Git commits and tags.
 */
export interface GPGKey extends BaseEntity {
  /** GPG key ID (short or long form) */
  keyId: string;
  /** Email address associated with the key */
  email: string;
  /** ISO 8601 timestamp when key was added */
  added: string;
  /** Whether the key has been verified */
  verified: boolean;
  /** Whether this is the primary signing key */
  primary: boolean;
}

/**
 * OAuth Application configuration.
 * Represents a registered OAuth app for third-party authentication.
 */
export interface OAuthApp extends BaseEntity {
  /** OAuth client identifier */
  clientId: string;
  /** OAuth client secret (sensitive) */
  clientSecret: string;
  /** OAuth callback/redirect URL */
  callback: string;
  /** Array of OAuth permission scopes */
  permissions: string[];
}

/**
 * Webhook configuration for event notifications.
 * Webhooks deliver real-time notifications about repository events.
 */
export interface Webhook {
  /** Unique identifier */
  id: string;
  /** Target URL for webhook deliveries */
  url: string;
  /** Array of event types to trigger webhook */
  events: string[];
  /** Current delivery status */
  status: WebhookStatus;
  /** ISO 8601 timestamp of last delivery attempt */
  lastDelivery: string;
  /** HTTP response code from last delivery */
  responseCode: number;
  /** Response latency in milliseconds */
  latency: string;
}

/**
 * Type of integration mechanism.
 * - `oauth`: OAuth-based authentication
 * - `api`: API key authentication
 * - `webhook`: Webhook-based integration
 * - `ci_cd`: Continuous integration/deployment
 */
export type IntegrationType = "oauth" | "api" | "webhook" | "ci_cd";

/**
 * Category classification for integrations.
 */
export type IntegrationCategory =
  | "communication"
  | "version-control"
  | "ci-cd"
  | "project-management"
  | "other";

/**
 * Supported third-party integration platforms.
 */
export type AvailableIntegrations =
  | "slack"
  | "jira"
  | "github"
  | "gitlab"
  | "discord"
  | "jenkins";

/**
 * Permission scope for repository access.
 * - `read`: View repository content
 * - `write`: Modify repository content
 * - `admin`: Full repository administration
 * - `none`: No access
 */
export type RepositoryPermission = "read" | "write" | "admin" | "none";

/**
 * Permission scope for webhook access.
 * - `read`: View webhook configurations
 * - `write`: Create and modify webhooks
 * - `none`: No webhook access
 */
export type WebhookPermission = "read" | "write" | "none";

/**
 * Permission scope for issue/ticket access.
 * - `read`: View issues
 * - `write`: Create and modify issues
 * - `none`: No issue access
 */
export type IssuePermission = "read" | "write" | "none";

/**
 * Permission scope for pull request access.
 * - `read`: View pull requests
 * - `write`: Create and modify pull requests
 * - `none`: No pull request access
 */
export type PullRequestPermission = "read" | "write" | "none";

/**
 * Permission scope for deployment access.
 * - `read`: View deployment status
 * - `write`: Trigger and manage deployments
 * - `none`: No deployment access
 */
export type DeploymentPermission = "read" | "write" | "none";

/**
 * Permission scope for organization/team access.
 * - `read`: View organization details
 * - `write`: Modify organization settings
 * - `admin`: Full organization administration
 * - `none`: No organization access
 */
export type OrganizationPermission = "read" | "write" | "admin" | "none";

/**
 * Comprehensive integration permissions model.
 * Defines granular access controls for third-party integrations.
 */
export interface IntegrationPermissions {
  /** Repository access level */
  repository: RepositoryPermission;

  /** Webhook management access level */
  webhook: WebhookPermission;

  /** Issue/ticket access level */
  issues: IssuePermission;

  /** Pull request access level */
  pullRequests: PullRequestPermission;

  /** Deployment access level */
  deployments: DeploymentPermission;

  /** Organization/team access level */
  organization: OrganizationPermission;

  /** Can create new repositories */
  canCreateRepositories: boolean;
  /** Can delete repositories */
  canDeleteRepositories: boolean;
  /** Can manage team memberships */
  canManageTeams: boolean;
  /** Can add/remove organization members */
  canManageMembers: boolean;
  /** Can access analytics and insights */
  canAccessAnalytics: boolean;
  /** Can manage secrets and credentials */
  canManageSecrets: boolean;
  /** Can trigger CI/CD builds */
  canTriggerBuilds: boolean;

  /** ISO 8601 timestamp when permissions were granted */
  grantedAt: string;
  /** User ID who granted the permissions */
  grantedBy?: string;
  /** ISO 8601 timestamp of last permission modification */
  lastModified?: string;
}

/**
 * Predefined permission presets for quick configuration.
 * - `read-only`: View-only access
 * - `standard`: Read and limited write access
 * - `full-access`: Complete access to all features
 * - `custom`: User-defined permission set
 */
export type PermissionPreset =
  | "read-only"
  | "standard"
  | "full-access"
  | "custom";

/**
 * Configuration for a permission preset.
 * Provides preset metadata and default permission values.
 */
export interface PermissionPresetConfig {
  /** Preset identifier */
  preset: PermissionPreset;
  /** Display label */
  label: string;
  /** Description of what the preset allows */
  description: string;
  /** Default permissions for this preset */
  permissions: IntegrationPermissions;
}

/**
 * Logical grouping of related permissions.
 * Simplifies permission management by grouping related scopes.
 */
export interface PermissionScope {
  /** Unique scope identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description of the scope's purpose */
  description: string;
  /** Array of permission keys included in this scope */
  permissions: (keyof IntegrationPermissions)[];
  /** Whether this scope is required for the integration */
  required: boolean;
}

/**
 * Available third-party integration definition.
 * Describes an integration that can be connected.
 */
export interface Integration {
  /** Unique integration identifier */
  id: AvailableIntegrations;
  /** Display name */
  name: string;
  /** Integration mechanism type */
  type: IntegrationType;
  /** Description of the integration's functionality */
  description: string;
  /** Whether an API key is required */
  requiresApiKey: boolean;
  /** Whether a webhook URL is required */
  requiresWebhook: boolean;
  /** Icon identifier or URL */
  icon: string;
  /** Integration category */
  category: IntegrationCategory;
  /** URL to integration documentation */
  documentationUrl: string;
  /** Minimum required permissions for the integration */
  requiredPermissions: (keyof IntegrationPermissions)[];
  /** Optional supported permission scopes */
  supportedScopes?: PermissionScope[];
}

/**
 * Active integration connection.
 * Extends Integration with connection status and credentials.
 */
export interface ConnectedIntegration extends Integration {
  /** ISO 8601 timestamp when integration was connected */
  connectedAt: string;
  /** Current connection status */
  status: IntegrationStatus;
  /** API key for authentication (if applicable) */
  apiKey?: string;
  /** Webhook URL for event delivery (if applicable) */
  webhookUrl?: string;
  /** Granted permissions for this integration */
  permissions: IntegrationPermissions;
  /** Applied permission preset */
  permissionPreset: PermissionPreset;
}

/**
 * API usage statistics and rate limiting information.
 * Tracks API consumption and enforces rate limits.
 */
export interface APIUsage {
  /** Number of requests made today */
  requestsToday: number;
  /** Maximum requests allowed per day */
  dailyLimit: number;
  /** Remaining requests before rate limit */
  rateLimitRemaining: number;
  /** ISO 8601 timestamp when rate limit resets */
  rateLimitReset: string;
  /** Percentage of successful requests */
  successRate: number;
  /** Count of failed requests */
  failedRequests: number;
}

/**
 * User preferences for developer tools.
 * Configures default behavior and UI preferences.
 */
export interface DeveloperPreferences {
  /** Default API version for new requests */
  defaultAPIVersion: APIVersion;
  /** Whether to automatically retry failed webhooks */
  webhookAutoRetry: boolean;
  /** Preferred JSON response formatting */
  jsonIndentation: JSONIndentation;
  /** Dark mode preference for API documentation */
  apiDocsDarkMode: boolean;
  /** Default permission preset for new integrations */
  defaultPermissionPreset?: PermissionPreset;
}

/**
 * Complete developer settings state.
 * Root state object for the developer settings module.
 */
export interface DeveloperState {
  /** List of personal access tokens */
  tokens: PersonalAccessToken[];
  /** List of SSH keys */
  sshKeys: SSHKey[];
  /** List of GPG keys */
  gpgKeys: GPGKey[];
  /** List of OAuth applications */
  oauthApps: OAuthApp[];
  /** List of configured webhooks */
  webhooks: Webhook[];
  /** Available integrations that can be connected */
  availableIntegrations: Integration[];
  /** Currently connected integrations */
  connectedIntegrations: ConnectedIntegration[];
  /** API usage statistics */
  apiUsage: APIUsage;
  /** User preferences */
  preferences: DeveloperPreferences;
  /** Available permission presets */
  permissionPresets: PermissionPresetConfig[];
}

/**
 * Configuration for creating a new personal access token.
 */
export interface NewTokenConfig {
  /** Token name */
  name: string;
  /** Permission scopes to grant */
  scopes: string[];
  /** Optional expiration duration (e.g., "30d", "1y") */
  expiresIn?: string;
}

/**
 * Configuration for adding a new SSH key.
 */
export interface NewSSHKeyConfig {
  /** Key name/label */
  name: string;
  /** SSH public key content */
  content: string;
}

/**
 * Configuration for adding a new GPG key.
 */
export interface NewGPGKeyConfig {
  /** Key name/label */
  name: string;
  /** GPG public key content */
  content: string;
  /** Email address associated with the key */
  email: string;
}

/**
 * Configuration for creating a new OAuth application.
 */
export interface NewOAuthAppConfig {
  /** Application name */
  name: string;
  /** OAuth callback/redirect URL */
  callback: string;
  /** Application description */
  description: string;
  /** Optional OAuth scopes/permissions */
  permissions?: string[];
}

/**
 * Configuration for creating a new webhook.
 */
export interface NewWebhookConfig {
  /** Webhook target URL */
  url: string;
  /** Event types to trigger the webhook */
  events: string[];
  /** Optional webhook secret for signature validation */
  secret?: string;
}

/**
 * Configuration for connecting a new integration.
 */
export interface NewIntegrationConfig {
  /** Integration to connect */
  integrationId: AvailableIntegrations;
  /** API key for authentication (if required) */
  apiKey?: string;
  /** Webhook URL for events (if required) */
  webhookUrl?: string;
  /** Custom permissions (overrides preset) */
  permissions?: Partial<IntegrationPermissions>;
  /** Permission preset to apply */
  permissionPreset: PermissionPreset;
}

/**
 * Developer entity types for generic operations.
 */
export type EntityType =
  | "token"
  | "sshKey"
  | "gpgKey"
  | "oauthApp"
  | "webhook"
  | "integration";

/**
 * Type mapping for entity types to their corresponding interfaces.
 * Enables type-safe entity operations.
 */
export type EntityMap = {
  token: PersonalAccessToken;
  sshKey: SSHKey;
  gpgKey: GPGKey;
  oauthApp: OAuthApp;
  webhook: Webhook;
  integration: ConnectedIntegration;
};

/**
 * Event emitted when integration permissions are modified.
 * Used for audit logging and change tracking.
 */
export interface PermissionChangeEvent {
  /** Integration that was modified */
  integrationId: string;
  /** Permissions before the change */
  previousPermissions: IntegrationPermissions;
  /** Permissions after the change */
  newPermissions: IntegrationPermissions;
  /** User ID who made the change */
  changedBy: string;
  /** ISO 8601 timestamp of the change */
  timestamp: string;
  /** Optional reason for the change */
  reason?: string;
}

/**
 * Result of permission validation.
 * Used to validate permission configurations before applying.
 */
export interface PermissionValidationResult {
  /** Whether the permissions are valid */
  valid: boolean;
  /** Critical validation errors */
  errors: string[];
  /** Non-critical validation warnings */
  warnings: string[];
  /** Required permissions that are missing */
  missingRequired: string[];
}

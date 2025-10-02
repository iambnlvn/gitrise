/**
 * Developer settings types.
 */

import { INTEGRATION_TYPES } from "./constants";

/**
 * Token status types.
 */
export type TokenStatus = "active" | "expired";

/**
 * Webhook status types.
 */
export type WebhookStatus = "active" | "failed";

/**
 * Integration status types.
 */
export type IntegrationStatus = "active" | "inactive";

/**
 * API version types.
 */
export type APIVersion = "v1";

/**
 * JSON indentation options.
 */
export type JSONIndentation = "2" | "4" | "minified";

/**
 * Personal access token information.
 *
 * @interface PersonalAccessToken
 * @property {string} id - Unique token identifier
 * @property {string} name - Token name/description
 * @property {string[]} scopes - Permission scopes
 * @property {string} lastUsed - Last usage timestamp
 * @property {string} created - Creation date
 * @property {string} expires - Expiration date
 * @property {TokenStatus} status - Token status
 */
export interface PersonalAccessToken {
  id: string;
  name: string;
  scopes: string[];
  lastUsed: string;
  created: string;
  expires: string;
  status: TokenStatus;
}

/**
 * SSH key information.
 *
 * @interface SSHKey
 * @property {string} id - Unique key identifier
 * @property {string} name - Key name
 * @property {string} fingerprint - Key fingerprint
 * @property {string} added - Date added
 * @property {string} lastUsed - Last usage with IP
 */
export interface SSHKey {
  id: string;
  name: string;
  fingerprint: string;
  added: string;
  lastUsed: string;
}

/**
 * GPG key information.
 *
 * @interface GPGKey
 * @property {string} id - Unique key identifier
 * @property {string} name - Key name
 * @property {string} keyId - Key ID
 * @property {string} email - Associated email
 * @property {string} added - Date added
 * @property {boolean} verified - Whether key is verified
 * @property {boolean} primary - Whether this is the primary key
 */
export interface GPGKey {
  id: string;
  name: string;
  keyId: string;
  email: string;
  added: string;
  verified: boolean;
  primary: boolean;
}

/**
 * OAuth application information.
 *
 * @interface OAuthApp
 * @property {string} id - Unique app identifier
 * @property {string} name - Application name
 * @property {string} clientId - OAuth client ID
 * @property {string} clientSecret - OAuth client secret
 * @property {string} callback - Callback URL
 * @property {string} created - Creation date
 * @property {string[]} permissions - App permissions
 */
export interface OAuthApp {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  callback: string;
  created: string;
  permissions: string[];
}

/**
 * Webhook configuration.
 *
 * @interface Webhook
 * @property {string} id - Unique webhook identifier
 * @property {string} url - Webhook endpoint URL
 * @property {string[]} events - Subscribed events
 * @property {WebhookStatus} status - Webhook status
 * @property {string} lastDelivery - Last delivery timestamp
 * @property {number} responseCode - Last response code
 * @property {string} latency - Last delivery latency
 */
export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: WebhookStatus;
  lastDelivery: string;
  responseCode: number;
  latency: string;
}

/**
 * Third-party integration.
 *
 * @interface Integration
 * @property {string} id - Unique integration identifier
 * @property {string} name - Integration name
 * @property {string} description - Brief description
 * @property {IntegrationStatus} status - Integration status
 * @property {string} lastSync - Last synchronization time
 * @property {string[]} permissions - Integration permissions
 */
export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  description: string;
  status: IntegrationStatus;
  lastSync: string;
  configuration: {
    apiKey: string;
    webhookUrl?: string;
    permissions: string[];
  };
}

export type IntegrationType = (typeof INTEGRATION_TYPES)[number]["value"];
export interface IntegrationPermissions {
  readRepos: boolean;
  writeRepos: boolean;
  readWebhooks: boolean;
  writeWebhooks: boolean;
}
/** * Token revocation reason types.
 */
export type TokenRevocationReason =
  | "compromised"
  | "no_longer_needed"
  | "other";

/**
 * API usage statistics.
 *
 * @interface APIUsage
 * @property {number} requestsToday - Number of requests today
 * @property {number} dailyLimit - Daily request limit
 * @property {number} rateLimitRemaining - Remaining rate limit
 * @property {string} rateLimitReset - Time until rate limit reset
 * @property {number} successRate - Success rate percentage
 * @property {number} failedRequests - Number of failed requests
 */
export interface APIUsage {
  requestsToday: number;
  dailyLimit: number;
  rateLimitRemaining: number;
  rateLimitReset: string;
  successRate: number;
  failedRequests: number;
}

/**
 * Developer preferences.
 *
 * @interface DeveloperPreferences
 * @property {APIVersion} defaultAPIVersion - Default API version
 * @property {boolean} webhookAutoRetry - Auto-retry failed webhooks
 * @property {JSONIndentation} jsonIndentation - JSON response formatting
 * @property {boolean} apiDocsDarkMode - Use dark mode for API docs
 */
export interface DeveloperPreferences {
  defaultAPIVersion: APIVersion;
  webhookAutoRetry: boolean;
  jsonIndentation: JSONIndentation;
  apiDocsDarkMode: boolean;
}

/**
 * Main developer state interface.
 *
 * @interface DeveloperState
 * @property {PersonalAccessToken[]} tokens - Personal access tokens
 * @property {SSHKey[]} sshKeys - SSH keys
 * @property {GPGKey[]} gpgKeys - GPG keys
 * @property {OAuthApp[]} oauthApps - OAuth applications
 * @property {Webhook[]} webhooks - Webhooks
 * @property {Integration[]} integrations - Third-party integrations
 * @property {APIUsage} apiUsage - API usage statistics
 * @property {DeveloperPreferences} preferences - Developer preferences
 */
export interface DeveloperState {
  tokens: PersonalAccessToken[];
  sshKeys: SSHKey[];
  gpgKeys: GPGKey[];
  oauthApps: OAuthApp[];
  webhooks: Webhook[];
  integrations: Integration[];
  apiUsage: APIUsage;
  preferences: DeveloperPreferences;
}

/**
 * New token configuration.
 */
export interface NewTokenConfig {
  name: string;
  scopes: string[];
}

/**
 * New SSH key configuration.
 */
export interface NewSSHKeyConfig {
  name: string;
  content: string;
}

/**
 * New OAuth app configuration.
 */
export interface NewOAuthAppConfig {
  name: string;
  callback: string;
  description: string;
}

/**
 * New webhook configuration.
 */
export interface NewWebhookConfig {
  url: string;
  events: string[];
}

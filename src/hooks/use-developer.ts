import { DEFAULT_DEVELOPER_STATE } from "@/app/settings/components/developer/constants";
import {
  DeveloperPreferences,
  DeveloperState,
  IntegrationStatus,
  NewOAuthAppConfig,
  NewSSHKeyConfig,
  NewTokenConfig,
  NewWebhookConfig,
  NewGPGKeyConfig,
  NewIntegrationConfig,
  ConnectedIntegration,
  IntegrationPermissions,
  PermissionChangeEvent,
} from "@/app/settings/components/developer/developer-types";
import {
  getPermissionSummary,
  mergePermissions,
  validatePermissions,
} from "@/utils/permission-manager";
import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Options for the developer hook.
 */
interface UseDeveloperOptions {
  onTokenGenerate?: (config: NewTokenConfig) => Promise<string>;
  onTokenRevoke?: (tokenId: string) => Promise<void>;
  onSSHKeyAdd?: (config: NewSSHKeyConfig) => Promise<void>;
  onSSHKeyRemove?: (keyId: string) => Promise<void>;
  onGPGKeyAdd?: (config: NewGPGKeyConfig) => Promise<void>;
  onGPGKeyRemove?: (keyId: string) => Promise<void>;
  onGPGKeySetPrimary?: (keyId: string) => Promise<void>;
  onOAuthAppCreate?: (config: NewOAuthAppConfig) => Promise<void>;
  onOAuthAppUpdate?: (
    appId: string,
    config: Partial<NewOAuthAppConfig>,
  ) => Promise<void>;
  onOAuthAppDelete?: (appId: string) => Promise<void>;
  onWebhookCreate?: (config: NewWebhookConfig) => Promise<void>;
  onWebhookUpdate?: (
    webhookId: string,
    config: Partial<NewWebhookConfig>,
  ) => Promise<void>;
  onWebhookDelete?: (webhookId: string) => Promise<void>;
  onWebhookTest?: (webhookId: string) => Promise<void>;
  onIntegrationAdd?: (config: NewIntegrationConfig) => Promise<void>;
  onIntegrationRemove?: (integrationId: string) => Promise<void>;
  onIntegrationToggle?: (
    integrationId: string,
    status: IntegrationStatus,
  ) => Promise<void>;
  onIntegrationRevoke?: (integrationId: string) => Promise<void>;
  onIntegrationPermissionsUpdate?: (
    integrationId: string,
    permissions: IntegrationPermissions,
  ) => Promise<void>;
  onPreferencesUpdate?: (preferences: DeveloperPreferences) => Promise<void>;
}

/**
 * Custom hook for managing developer settings and operations.
 *
 * @param {UseDeveloperOptions} [options] - Hook configuration options
 * @returns Developer state and action handlers
 */
export function useDeveloper(options?: UseDeveloperOptions) {
  const [state, setState] = useState<DeveloperState>(DEFAULT_DEVELOPER_STATE);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Generates a new access token.
   */
  const generateToken = useCallback(
    async (config: NewTokenConfig) => {
      setIsLoading(true);
      try {
        let tokenValue = `ghp_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

        if (options?.onTokenGenerate) {
          tokenValue = await options.onTokenGenerate(config);
        }

        const newToken = {
          id: Date.now().toString(),
          name: config.name,
          scopes: config.scopes,
          lastUsed: "Never",
          created: new Date().toLocaleDateString(),
          expires: "Never",
          status: "active" as const,
        };

        setState((prev) => ({
          ...prev,
          tokens: [...prev.tokens, newToken],
        }));

        toast.success("Access token generated successfully");
        return tokenValue;
      } catch (error) {
        toast.error("Failed to generate token");
        console.error("Token generate error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Revokes an access token.
   */
  const revokeToken = useCallback(
    async (tokenId: string) => {
      setIsLoading(true);
      try {
        if (options?.onTokenRevoke) {
          await options.onTokenRevoke(tokenId);
        }

        setState((prev) => ({
          ...prev,
          tokens: prev.tokens.filter((t) => t.id !== tokenId),
        }));

        toast.success("Access token revoked successfully");
      } catch (error) {
        toast.error("Failed to revoke token");
        console.error("Token revoke error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Adds a new SSH key.
   */
  const addSSHKey = useCallback(
    async (config: NewSSHKeyConfig) => {
      setIsLoading(true);
      try {
        if (options?.onSSHKeyAdd) {
          await options.onSSHKeyAdd(config);
        }

        const newKey = {
          id: Date.now().toString(),
          name: config.name,
          fingerprint: `SHA256:${Math.random().toString(36).substring(2, 45)}`,
          added: new Date().toLocaleDateString(),
          created: new Date().toLocaleDateString(),
          lastUsed: "Never",
        };

        setState((prev) => ({
          ...prev,
          sshKeys: [...prev.sshKeys, newKey],
        }));

        toast.success("SSH key added successfully");
      } catch (error) {
        toast.error("Failed to add SSH key");
        console.error("SSH key add error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Removes an SSH key.
   */
  const removeSSHKey = useCallback(
    async (keyId: string) => {
      setIsLoading(true);
      try {
        if (options?.onSSHKeyRemove) {
          await options.onSSHKeyRemove(keyId);
        }

        setState((prev) => ({
          ...prev,
          sshKeys: prev.sshKeys.filter((k) => k.id !== keyId),
        }));

        toast.success("SSH key removed successfully");
      } catch (error) {
        toast.error("Failed to remove SSH key");
        console.error("SSH key remove error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Adds a new GPG key.
   *
   */

  const addGPGKey = useCallback(
    async (config: NewGPGKeyConfig) => {
      setIsLoading(true);
      try {
        if (options?.onGPGKeyAdd) {
          await options.onGPGKeyAdd(config);
        }

        const newKey = {
          content: config.content,
          metadata: config.metadata,
          isPrimary: false,
        };

        setState((prev) => ({
          ...prev,
          gpgKeys: [...prev.gpgKeys, newKey],
        }));

        toast.success("GPG key added successfully");
      } catch (error) {
        toast.error("Failed to add GPG key");
        console.error("GPG key add error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Removes a GPG key.
   */
  const removeGPGKey = useCallback(
    async (keyId: string) => {
      setIsLoading(true);
      try {
        if (options?.onGPGKeyRemove) {
          await options.onGPGKeyRemove(keyId);
        }

        setState((prev) => ({
          ...prev,
          gpgKeys: prev.gpgKeys.filter((k) => k.metadata?.keyId !== keyId),
        }));

        toast.success("GPG key removed successfully");
      } catch (error) {
        toast.error("Failed to remove GPG key");
        console.error("GPG key remove error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Sets a GPG key as primary.
   */
  const setGPGKeyPrimary = useCallback(
    async (keyId: string) => {
      setIsLoading(true);
      try {
        if (options?.onGPGKeySetPrimary) {
          await options.onGPGKeySetPrimary(keyId);
        }

        setState((prev) => ({
          ...prev,
          gpgKeys: prev.gpgKeys.map((k) => ({
            ...k,
            primary: k.metadata?.keyId === keyId,
          })),
        }));

        toast.success("Primary GPG key updated");
      } catch (error) {
        toast.error("Failed to set primary key");
        console.error("GPG key set primary error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Creates a new OAuth application.
   */
  const createOAuthApp = useCallback(
    async (config: NewOAuthAppConfig) => {
      setIsLoading(true);
      try {
        if (options?.onOAuthAppCreate) {
          await options.onOAuthAppCreate(config);
        }

        const newApp = {
          id: Date.now().toString(),
          name: config.name,
          clientId: `Iv1.${Math.random().toString(36).substring(2, 18)}`,
          clientSecret: `secret_${Math.random().toString(36).substring(2, 18)}`,
          callback: config.callback,
          created: new Date().toLocaleDateString(),
          permissions: ["repo", "user"],
        };

        setState((prev) => ({
          ...prev,
          oauthApps: [...prev.oauthApps, newApp],
        }));

        toast.success("OAuth application created successfully");
      } catch (error) {
        toast.error("Failed to create OAuth application");
        console.error("OAuth app create error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Deletes an OAuth application.
   */
  const deleteOAuthApp = useCallback(
    async (appId: string) => {
      setIsLoading(true);
      try {
        if (options?.onOAuthAppDelete) {
          await options.onOAuthAppDelete(appId);
        }

        setState((prev) => ({
          ...prev,
          oauthApps: prev.oauthApps.filter((a) => a.id !== appId),
        }));

        toast.success("OAuth application deleted successfully");
      } catch (error) {
        toast.error("Failed to delete OAuth application");
        console.error("OAuth app delete error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Creates a new webhook.
   */
  const createWebhook = useCallback(
    async (config: NewWebhookConfig) => {
      setIsLoading(true);
      try {
        if (options?.onWebhookCreate) {
          await options.onWebhookCreate(config);
        }

        const newWebhook = {
          id: Date.now().toString(),
          url: config.url,
          events: config.events,
          status: "active" as const,
          lastDelivery: "Never",
          responseCode: 200,
          latency: "0ms",
        };

        setState((prev) => ({
          ...prev,
          webhooks: [...prev.webhooks, newWebhook],
        }));

        toast.success("Webhook created successfully");
      } catch (error) {
        toast.error("Failed to create webhook");
        console.error("Webhook create error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Deletes a webhook.
   */
  const deleteWebhook = useCallback(
    async (webhookId: string) => {
      setIsLoading(true);
      try {
        if (options?.onWebhookDelete) {
          await options.onWebhookDelete(webhookId);
        }

        setState((prev) => ({
          ...prev,
          webhooks: prev.webhooks.filter((w) => w.id !== webhookId),
        }));

        toast.success("Webhook deleted successfully");
      } catch (error) {
        toast.error("Failed to delete webhook");
        console.error("Webhook delete error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Tests a webhook.
   */
  const testWebhook = useCallback(
    async (webhookId: string) => {
      setIsLoading(true);
      try {
        if (options?.onWebhookTest) {
          await options.onWebhookTest(webhookId);
        }

        toast.success("Test payload sent successfully");
      } catch (error) {
        toast.error("Failed to send test payload");
        console.error("Webhook test error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Adds a new integration with permission validation.
   */
  const addIntegration = useCallback(
    async (config: NewIntegrationConfig) => {
      setIsLoading(true);
      try {
        // Find the integration from available integrations
        const baseIntegration = state.availableIntegrations.find(
          (i) => i.id === config.integrationId,
        );

        if (!baseIntegration) {
          throw new Error("Integration not found");
        }

        // Merge permissions with preset or use default
        const permissions = mergePermissions(
          config.permissions || {},
          config.permissionPreset ||
            state.preferences.defaultPermissionPreset ||
            "standard",
        );

        // Validate permissions against required permissions
        const validation = validatePermissions(
          permissions,
          baseIntegration.requiredPermissions,
        );

        if (!validation.valid) {
          toast.error(`Invalid permissions: ${validation.errors.join(", ")}`);
          throw new Error("Permission validation failed");
        }

        // Show warnings if any
        if (validation.warnings.length > 0) {
          validation.warnings.forEach((warning) => toast.warning(warning));
        }

        if (options?.onIntegrationAdd) {
          await options.onIntegrationAdd(config);
        }

        const newIntegration: ConnectedIntegration = {
          ...baseIntegration,
          connectedAt: new Date().toISOString(),
          status: "active",
          apiKey: config.apiKey,
          webhookUrl: config.webhookUrl,
          permissions,
          permissionPreset: config.permissionPreset,
        };

        setState((prev) => ({
          ...prev,
          connectedIntegrations: [
            ...prev.connectedIntegrations,
            newIntegration,
          ],
        }));

        const summary = getPermissionSummary(permissions);
        toast.success(`Integration added with: ${summary}`);
      } catch (error) {
        toast.error("Failed to add integration");
        console.error("Integration add error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      state.availableIntegrations,
      state.preferences.defaultPermissionPreset,
      options,
    ],
  );

  /**
   * Updates integration permissions.
   */
  const updateIntegrationPermissions = useCallback(
    async (
      integrationId: string,
      partialPermissions: Partial<IntegrationPermissions>,
      preset?: "read-only" | "standard" | "full-access" | "custom",
    ) => {
      setIsLoading(true);
      try {
        const integration = state.connectedIntegrations.find(
          (i) => i.id === integrationId,
        );

        if (!integration) {
          throw new Error("Integration not found");
        }

        // Store previous permissions for audit
        const previousPermissions = { ...integration.permissions };

        // Merge new permissions
        const newPermissions = mergePermissions(
          { ...integration.permissions, ...partialPermissions },
          preset || integration.permissionPreset || "custom",
        );

        // Validate new permissions
        const baseIntegration = state.availableIntegrations.find(
          (i) => i.id === integrationId,
        );

        const validation = validatePermissions(
          newPermissions,
          baseIntegration?.requiredPermissions,
        );

        if (!validation.valid) {
          toast.error(`Invalid permissions: ${validation.errors.join(", ")}`);
          throw new Error("Permission validation failed");
        }

        if (options?.onIntegrationPermissionsUpdate) {
          await options.onIntegrationPermissionsUpdate(
            integrationId,
            newPermissions,
          );
        }

        setState((prev) => ({
          ...prev,
          connectedIntegrations: prev.connectedIntegrations.map((i) =>
            i.id === integrationId
              ? {
                  ...i,
                  permissions: newPermissions,
                  permissionPreset: preset || "custom",
                }
              : i,
          ),
        }));

        // Create audit event
        const changeEvent: PermissionChangeEvent = {
          integrationId,
          previousPermissions,
          newPermissions,
          changedBy: "user", // Replace with actual user ID
          timestamp: new Date().toISOString(),
        };

        console.log("Permission change event:", changeEvent);

        toast.success("Integration permissions updated successfully");
      } catch (error) {
        toast.error("Failed to update integration permissions");
        console.error("Integration permissions update error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [state.connectedIntegrations, state.availableIntegrations, options],
  );
  /**
   * Toggles an integration.
   */
  const toggleIntegration = useCallback(
    async (integrationId: string) => {
      setIsLoading(true);
      try {
        const integration = state.connectedIntegrations.find(
          (i) => i.id === integrationId,
        );
        const newStatus =
          integration?.status === "active" ? "inactive" : "active";

        if (options?.onIntegrationToggle) {
          await options.onIntegrationToggle(integrationId, newStatus);
        }

        setState((prev) => ({
          ...prev,
          connectedIntegrations: prev.connectedIntegrations.map((i) =>
            i.id === integrationId ? { ...i, status: newStatus } : i,
          ),
        }));

        toast.success(
          newStatus === "active"
            ? "Integration activated"
            : "Integration deactivated",
        );
      } catch (error) {
        toast.error("Failed to toggle integration");
        console.error("Integration toggle error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [state.connectedIntegrations, options],
  );

  const revokeIntegration = useCallback(
    async (integrationId: string) => {
      setIsLoading(true);
      try {
        if (options?.onIntegrationRevoke) {
          await options.onIntegrationRevoke(integrationId);
        }

        setState((prev) => ({
          ...prev,
          connectedIntegrations: prev.connectedIntegrations.filter(
            (i) => i.id !== integrationId,
          ),
        }));

        toast.success("Integration revoked successfully");
      } catch (error) {
        toast.error("Failed to revoke integration");
        console.error("Integration revoke error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Gets permission summary for an integration.
   */
  const getIntegrationPermissionSummary = useCallback(
    (integrationId: string): string => {
      const integration = state.connectedIntegrations.find(
        (i) => i.id === integrationId,
      );

      if (!integration) {
        return "No permissions";
      }

      return getPermissionSummary(integration.permissions);
    },
    [state.connectedIntegrations],
  );
  /**
   * Updates developer preferences.
   */
  const updatePreferences = useCallback(
    async (preferences: Partial<DeveloperPreferences>) => {
      setIsLoading(true);
      try {
        const updatedPreferences = { ...state.preferences, ...preferences };

        if (options?.onPreferencesUpdate) {
          await options.onPreferencesUpdate(updatedPreferences);
        }

        setState((prev) => ({
          ...prev,
          preferences: updatedPreferences,
        }));

        toast.success("Preferences updated successfully");
      } catch (error) {
        toast.error("Failed to update preferences");
        console.error("Preferences update error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [state.preferences, options],
  );

  return {
    state,
    isLoading,
    generateToken,
    revokeToken,
    addSSHKey,
    removeSSHKey,
    removeGPGKey,
    setGPGKeyPrimary,
    addGPGKey,
    createOAuthApp,
    deleteOAuthApp,
    createWebhook,
    deleteWebhook,
    testWebhook,
    addIntegration,
    updateIntegrationPermissions,
    getIntegrationPermissionSummary,
    revokeIntegration,
    toggleIntegration,
    updatePreferences,
  };
}

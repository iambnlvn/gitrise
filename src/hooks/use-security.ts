import { useState, useCallback } from "react";
import { toast } from "sonner";
// this hook is temporary and will be replaced with a better pattern once backend is ready
import type {
  SecurityState,
  NewTokenConfig,
  NewSecurityKeyConfig,
  NewIPRuleConfig,
  PasswordChangeData,
  SecurityAlerts,
} from "@/app/settings/security/security-types";
import { DEFAULT_SECURITY_STATE } from "@/app/settings/security/constants";

/**
 * Options for the security hook.
 */
interface UseSecurityOptions {
  onPasswordChange?: (data: PasswordChangeData) => Promise<void>;
  on2FAToggle?: (enabled: boolean) => Promise<void>;
  onSessionRevoke?: (sessionId: string) => Promise<void>;
  onSessionRevokeAll?: () => Promise<void>;
  onDeviceRemove?: (deviceId: string) => Promise<void>;
  onSecurityKeyAdd?: (config: NewSecurityKeyConfig) => Promise<void>;
  onSecurityKeyRemove?: (keyId: string) => Promise<void>;
  onTokenGenerate?: (config: NewTokenConfig) => Promise<string>;
  onTokenRevoke?: (tokenId: string) => Promise<void>;
  onIPRuleAdd?: (config: NewIPRuleConfig) => Promise<void>;
  onIPRuleRemove?: (ruleId: string) => Promise<void>;
  onRecoveryCodesRegenerate?: () => Promise<void>;
  onAlertsUpdate?: (alerts: SecurityAlerts) => Promise<void>;
  onSessionTimeoutUpdate?: (timeout: string) => Promise<void>;
}

/**
 * Custom hook for managing security settings and operations.
 *
 * @param {UseSecurityOptions} [options] - Hook configuration options
 * @returns Security state and action handlers
 */
export function useSecurity(options?: UseSecurityOptions) {
  const [state, setState] = useState<SecurityState>(DEFAULT_SECURITY_STATE);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Changes the user's password.
   */
  const changePassword = useCallback(
    async (data: PasswordChangeData) => {
      setIsLoading(true);
      try {
        if (options?.onPasswordChange) {
          await options.onPasswordChange(data);
        }
        toast.success("Password updated successfully");
      } catch (error) {
        toast.error("Failed to update password");
        console.error("Password change error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Toggles two-factor authentication.
   */
  const toggle2FA = useCallback(
    async (enabled: boolean) => {
      setIsLoading(true);
      try {
        if (options?.on2FAToggle) {
          await options.on2FAToggle(enabled);
        }
        setState((prev) => ({ ...prev, twoFactorEnabled: enabled }));
        toast.success(
          enabled ? "2FA enabled successfully" : "2FA disabled successfully",
        );
      } catch (error) {
        toast.error("Failed to update 2FA settings");
        console.error("2FA toggle error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Revokes a specific session.
   */
  const revokeSession = useCallback(
    async (sessionId: string) => {
      setIsLoading(true);
      try {
        if (options?.onSessionRevoke) {
          await options.onSessionRevoke(sessionId);
        }
        setState((prev) => ({
          ...prev,
          sessions: prev.sessions.filter((s) => s.id !== sessionId),
        }));
        toast.success("Session revoked successfully");
      } catch (error) {
        toast.error("Failed to revoke session");
        console.error("Session revoke error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Revokes all sessions except current.
   */
  const revokeAllSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      if (options?.onSessionRevokeAll) {
        await options.onSessionRevokeAll();
      }
      setState((prev) => ({
        ...prev,
        sessions: prev.sessions.filter((s) => s.current),
      }));
      toast.success("All sessions revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke sessions");
      console.error("Session revoke all error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  /**
   * Removes a trusted device.
   */
  const removeTrustedDevice = useCallback(
    async (deviceId: string) => {
      setIsLoading(true);
      try {
        if (options?.onDeviceRemove) {
          await options.onDeviceRemove(deviceId);
        }
        setState((prev) => ({
          ...prev,
          trustedDevices: prev.trustedDevices.filter((d) => d.id !== deviceId),
        }));
        toast.success("Device removed successfully");
      } catch (error) {
        toast.error("Failed to remove device");
        console.error("Device remove error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Adds a new security key.
   */
  const addSecurityKey = useCallback(
    async (config: NewSecurityKeyConfig) => {
      setIsLoading(true);
      try {
        if (options?.onSecurityKeyAdd) {
          await options.onSecurityKeyAdd(config);
        }
        const newKey = {
          id: Date.now().toString(),
          name: config.name,
          addedOn: new Date().toLocaleDateString(),
        };
        setState((prev) => ({
          ...prev,
          securityKeys: [...prev.securityKeys, newKey],
        }));
        toast.success("Security key added successfully");
      } catch (error) {
        toast.error("Failed to add security key");
        console.error("Security key add error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Removes a security key.
   */
  const removeSecurityKey = useCallback(
    async (keyId: string) => {
      setIsLoading(true);
      try {
        if (options?.onSecurityKeyRemove) {
          await options.onSecurityKeyRemove(keyId);
        }
        setState((prev) => ({
          ...prev,
          securityKeys: prev.securityKeys.filter((k) => k.id !== keyId),
        }));
        toast.success("Security key removed successfully");
      } catch (error) {
        toast.error("Failed to remove security key");
        console.error("Security key remove error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Generates a new access token.
   */
  const generateToken = useCallback(
    async (config: NewTokenConfig) => {
      setIsLoading(true);
      try {
        let tokenValue = "ghp_" + Math.random().toString(36).substring(2, 42);
        if (options?.onTokenGenerate) {
          tokenValue = await options.onTokenGenerate(config);
        }
        const newToken = {
          id: Date.now().toString(),
          name: config.name,
          scopes: config.scopes,
          lastUsed: "Never",
          createdOn: new Date().toLocaleDateString(),
        };
        setState((prev) => ({
          ...prev,
          accessTokens: [...prev.accessTokens, newToken],
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
          accessTokens: prev.accessTokens.filter((t) => t.id !== tokenId),
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
   * Adds a new IP rule.
   */
  const addIPRule = useCallback(
    async (config: NewIPRuleConfig) => {
      setIsLoading(true);
      try {
        if (options?.onIPRuleAdd) {
          await options.onIPRuleAdd(config);
        }
        const newRule = {
          id: Date.now().toString(),
          ...config,
          addedOn: new Date().toLocaleDateString(),
        };
        setState((prev) => ({
          ...prev,
          ipRules: [...prev.ipRules, newRule],
        }));
        toast.success("IP rule added successfully");
      } catch (error) {
        toast.error("Failed to add IP rule");
        console.error("IP rule add error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Removes an IP rule.
   */
  const removeIPRule = useCallback(
    async (ruleId: string) => {
      setIsLoading(true);
      try {
        if (options?.onIPRuleRemove) {
          await options.onIPRuleRemove(ruleId);
        }
        setState((prev) => ({
          ...prev,
          ipRules: prev.ipRules.filter((r) => r.id !== ruleId),
        }));
        toast.success("IP rule removed successfully");
      } catch (error) {
        toast.error("Failed to remove IP rule");
        console.error("IP rule remove error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Regenerates recovery codes.
   */
  const regenerateRecoveryCodes = useCallback(async () => {
    setIsLoading(true);
    try {
      if (options?.onRecoveryCodesRegenerate) {
        await options.onRecoveryCodesRegenerate();
      }
      // Generate new codes (in real app, these come from backend)
      const newCodes = Array.from({ length: 8 }, () => ({
        code:
          Math.random().toString(36).substring(2, 6).toUpperCase() +
          "-" +
          Math.random().toString(36).substring(2, 6).toUpperCase() +
          "-" +
          Math.random().toString(36).substring(2, 6).toUpperCase(),
        used: false,
      }));
      setState((prev) => ({ ...prev, recoveryCodes: newCodes }));
      toast.success("Recovery codes regenerated successfully");
    } catch (error) {
      toast.error("Failed to regenerate recovery codes");
      console.error("Recovery codes regenerate error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  /**
   * Updates security alert preferences.
   */
  const updateAlerts = useCallback(
    async (alerts: Partial<SecurityAlerts>) => {
      setIsLoading(true);
      try {
        const updatedAlerts = { ...state.alerts, ...alerts };
        if (options?.onAlertsUpdate) {
          await options.onAlertsUpdate(updatedAlerts);
        }
        setState((prev) => ({ ...prev, alerts: updatedAlerts }));
        toast.success("Alert preferences updated successfully");
      } catch (error) {
        toast.error("Failed to update alert preferences");
        console.error("Alerts update error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [state.alerts, options],
  );

  /**
   * Updates session timeout setting.
   */
  const updateSessionTimeout = useCallback(
    async (timeout: string) => {
      setIsLoading(true);
      try {
        if (options?.onSessionTimeoutUpdate) {
          await options.onSessionTimeoutUpdate(timeout);
        }
        setState((prev) => ({ ...prev, sessionTimeout: timeout }));
        toast.success("Session timeout updated successfully");
      } catch (error) {
        toast.error("Failed to update session timeout");
        console.error("Session timeout update error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  /**
   * Exports recovery codes to a text file.
   */
  const exportRecoveryCodes = useCallback(() => {
    const codesText = state.recoveryCodes
      .map((rc) => `${rc.code} - ${rc.used ? "Used" : "Available"}`)
      .join("\n");
    const blob = new Blob([codesText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Recovery codes exported");
  }, [state.recoveryCodes]);

  return {
    state,
    isLoading,
    changePassword,
    toggle2FA,
    revokeSession,
    revokeAllSessions,
    removeTrustedDevice,
    addSecurityKey,
    removeSecurityKey,
    generateToken,
    revokeToken,
    addIPRule,
    removeIPRule,
    regenerateRecoveryCodes,
    updateAlerts,
    updateSessionTimeout,
    exportRecoveryCodes,
  };
}

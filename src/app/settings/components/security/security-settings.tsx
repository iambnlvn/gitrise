"use client";

import { useSecurity } from "@/hooks/use-security";
import { SettingHeader } from "../shared";
import { PasswordSection } from "./sections/password-section";
import { TwoFactorSection } from "./sections/two-factor-section";
import { RecoveryCodesSection } from "./sections/recovery-codes-section";
import { SessionTimeoutSection } from "./sections/session-timeout-section";
import { ActiveSessionsSection } from "./sections/active-sessions-section";
import { IPAccessControlSection } from "./sections/ip-control-section";
import { TrustedDevicesSection } from "./sections/trusted-devices-section";
import { SecurityAlertsSection } from "./sections/security-alerts-section";
import { SecurityKeysSection } from "./sections/security-keys-section";
import { AccessTokensSection } from "./sections/access-tokens-section";
import { LoginHistorySection } from "./sections/login-history-section";
import { DangerZoneSection } from "./sections/danger-zone-section";

export function SecuritySettings() {
  const {
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
  } = useSecurity({
    onPasswordChange: async (data) => {
      console.log("Changing password:", data);
    },
    on2FAToggle: async (enabled) => {
      console.log("Toggling 2FA:", enabled);
    },
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Security & Access Settings"
        description="Manage your account security preferences and access controls."
      />

      <div className="space-y-6">
        <PasswordSection onSubmit={changePassword} isLoading={isLoading} />

        <TwoFactorSection
          enabled={state.twoFactorEnabled}
          onToggle={toggle2FA}
          isLoading={isLoading}
        />

        {state.twoFactorEnabled && (
          <RecoveryCodesSection
            codes={state.recoveryCodes}
            onRegenerate={regenerateRecoveryCodes}
            onExport={exportRecoveryCodes}
            isLoading={isLoading}
          />
        )}

        {/* Session Timeout */}
        <SessionTimeoutSection
          timeout={state.sessionTimeout}
          onUpdate={updateSessionTimeout}
          isLoading={isLoading}
        />

        {/* Active Sessions */}
        <ActiveSessionsSection
          sessions={state.sessions}
          onRevoke={revokeSession}
          onRevokeAll={revokeAllSessions}
          isLoading={isLoading}
        />

        <IPAccessControlSection
          rules={state.ipRules}
          onAdd={addIPRule}
          onRemove={removeIPRule}
          isLoading={isLoading}
        />

        <TrustedDevicesSection
          devices={state.trustedDevices}
          onRemove={removeTrustedDevice}
          isLoading={isLoading}
        />

        <SecurityAlertsSection
          alerts={state.alerts}
          onUpdate={updateAlerts}
          isLoading={isLoading}
        />

        <SecurityKeysSection
          keys={state.securityKeys}
          onAdd={addSecurityKey}
          onRemove={removeSecurityKey}
          isLoading={isLoading}
        />

        <AccessTokensSection
          tokens={state.accessTokens}
          onGenerate={generateToken}
          onRevoke={revokeToken}
          isLoading={isLoading}
        />

        <LoginHistorySection history={state.loginHistory} />

        <DangerZoneSection />
      </div>
    </div>
  );
}

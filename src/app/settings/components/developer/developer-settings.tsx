"use client";

import { useState, useCallback } from "react";
import { useDeveloper } from "@/hooks/use-developer";
import { QuickActionsSection } from "./quick-actions";
import { PersonalAccessTokensSection } from "./personal-access-token";
import { SSHKeysSection } from "./ssh-keys";
import { GPGKeysSection } from "./gpg-keys";
import { OAuthAppsSection } from "./oAuth";
import { WebhooksSection } from "./webhooks";
import { APIUsageSection } from "./api-usage";
import { IntegrationsSection } from "./integrations";
import { PreferencesSection } from "./preferences";
import { CreateTokenDialog } from "./create-token-dialog";
import { AddSSHKeyDialog } from "./add-ssh-key-dialog";
import { CreateOAuthAppDialog } from "./create-Oauth-app-dialog";
import { CreateWebhookDialog } from "./create-webhook-dialog";
import { SettingHeader } from "../shared";
import { AddIntegrationDialog } from "./add-integration-dialog";
import { AddGPGKeyDialog } from "./add-gpg-key-dialog";

/**
 * Main developer settings component.
 *
 * Manages all developer-related settings including tokens, keys,
 * OAuth apps, webhooks, integrations, and preferences.
 */
export function DeveloperSettings() {
  const {
    state,
    isLoading,
    generateToken,
    revokeToken,
    addSSHKey,
    addGPGKey,
    removeSSHKey,
    removeGPGKey,
    setGPGKeyPrimary,
    createOAuthApp,
    deleteOAuthApp,
    createWebhook,
    deleteWebhook,
    testWebhook,
    toggleIntegration,
    addIntegration,
    updatePreferences,
  } = useDeveloper();

  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [showSSHDialog, setShowSSHDialog] = useState(false);
  const [showOAuthDialog, setShowOAuthDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [showGPGDialog, setShowGPGDialog] = useState(false);
  const handleOpenTokenDialog = useCallback(() => setShowTokenDialog(true), []);
  const handleOpenSSHDialog = useCallback(() => setShowSSHDialog(true), []);
  const handleOpenOAuthDialog = useCallback(() => setShowOAuthDialog(true), []);
  const handleOpenWebhookDialog = useCallback(
    () => setShowWebhookDialog(true),
    [],
  );

  const handleOpenIntegrationDialog = useCallback(
    () => setShowIntegrationDialog(true),
    [],
  );

  const handleOpenGPGDialog = useCallback(() => setShowGPGDialog(true), []);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Developer Settings"
        description="Manage your integrations, API access, and developer tools here."
      />
      <QuickActionsSection
        onCreateToken={handleOpenTokenDialog}
        onRegisterOAuth={handleOpenOAuthDialog}
        onAddSSHKey={handleOpenSSHDialog}
      />

      <PersonalAccessTokensSection
        tokens={state.tokens}
        onRevoke={revokeToken}
        onCreateNew={handleOpenTokenDialog}
        isLoading={isLoading}
      />

      <SSHKeysSection
        keys={state.sshKeys}
        onRemove={removeSSHKey}
        onAddNew={handleOpenSSHDialog}
        isLoading={isLoading}
      />

      <GPGKeysSection
        keys={state.gpgKeys}
        onRemove={removeGPGKey}
        onSetPrimary={setGPGKeyPrimary}
        onAddNew={handleOpenGPGDialog}
        isLoading={isLoading}
      />

      <OAuthAppsSection
        apps={state.oauthApps}
        onDelete={deleteOAuthApp}
        onCreateNew={handleOpenOAuthDialog}
        isLoading={isLoading}
      />

      <WebhooksSection
        webhooks={state.webhooks}
        onDelete={deleteWebhook}
        onTest={testWebhook}
        onCreateNew={handleOpenWebhookDialog}
        isLoading={isLoading}
      />

      <APIUsageSection usage={state.apiUsage} />

      <IntegrationsSection
        integrations={state.connectedIntegrations}
        onToggle={toggleIntegration}
        onAddNew={handleOpenIntegrationDialog}
        isLoading={isLoading}
      />

      <PreferencesSection
        preferences={state.preferences}
        onUpdate={updatePreferences}
        isLoading={isLoading}
      />

      <CreateTokenDialog
        open={showTokenDialog}
        onOpenChange={setShowTokenDialog}
        onGenerate={generateToken}
        isLoading={isLoading}
      />
      <AddGPGKeyDialog
        open={showGPGDialog}
        onOpenChange={setShowGPGDialog}
        onAdd={addGPGKey}
        isLoading={false}
      />
      <AddSSHKeyDialog
        open={showSSHDialog}
        onOpenChange={setShowSSHDialog}
        onAdd={addSSHKey}
        isLoading={isLoading}
      />

      <CreateOAuthAppDialog
        open={showOAuthDialog}
        onOpenChange={setShowOAuthDialog}
        onCreate={createOAuthApp}
        isLoading={isLoading}
      />

      <CreateWebhookDialog
        open={showWebhookDialog}
        onOpenChange={setShowWebhookDialog}
        onCreate={createWebhook}
        isLoading={isLoading}
      />

      <AddIntegrationDialog
        open={showIntegrationDialog}
        onOpenChange={setShowIntegrationDialog}
        onAdd={addIntegration}
        isLoading={isLoading}
      />
    </div>
  );
}

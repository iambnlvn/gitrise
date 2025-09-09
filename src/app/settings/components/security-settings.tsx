"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Smartphone,
  Key,
  Terminal,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  HelpCircle,
  Monitor,
  Globe,
  Clock,
  MapPin,
  RefreshCw,
  Eye,
  EyeOff,
  QrCode,
  Fingerprint,
  Lock,
  Unlock,
  Calendar,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  OAuthApp,
  PersonalAccessToken,
  SecurityKey,
  Session,
  SSHKey,
  TwoFactorMethod,
} from "../types";

export function SecuritySettings() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [twoFactorMethod, setTwoFactorMethod] =
    useState<TwoFactorMethod>("app");
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [show2FASetupDialog, setShow2FASetupDialog] = useState(false);
  const [show2FABackupCodes, setShow2FABackupCodes] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [backupCodes] = useState([
    "1234-5678-90AB",
    "CDEF-1234-5678",
    "90AB-CDEF-1234",
    "5678-90AB-CDEF",
    "1234-CDEF-5678",
    "90AB-1234-CDEF",
    "5678-CDEF-90AB",
    "1234-90AB-5678",
  ]);

  const [securityKeys, setSecurityKeys] = useState<SecurityKey[]>([
    {
      id: "1",
      name: "YubiKey 5C",
      addedDate: "2024-12-15",
      lastUsed: "2025-01-10",
    },
  ]);
  const [showAddSecurityKey, setShowAddSecurityKey] = useState(false);
  const [newSecurityKeyName, setNewSecurityKeyName] = useState("");

  const [oauthApps, setOauthApps] = useState<OAuthApp[]>([
    {
      id: "1",
      name: "GitRise CLI",
      description: "Command-line interface for GitRise",
      scopes: ["repo", "user", "workflow"],
      createdDate: "2024-11-20",
      lastUsed: "2 days ago",
    },
    {
      id: "2",
      name: "GitRise Mobile",
      description: "Official mobile app",
      scopes: ["repo", "user", "notifications"],
      createdDate: "2024-10-05",
      lastUsed: "1 week ago",
    },
    {
      id: "3",
      name: "CI/CD Integration",
      description: "Automated deployment pipeline",
      scopes: ["repo", "workflow", "packages"],
      createdDate: "2024-09-12",
      lastUsed: "3 hours ago",
    },
  ]);
  const [selectedOAuthApp, setSelectedOAuthApp] = useState<OAuthApp | null>(
    null,
  );
  const [showOAuthDetails, setShowOAuthDetails] = useState(false);
  const [showRevokeOAuth, setShowRevokeOAuth] = useState(false);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "MacBook Pro",
      browser: "Chrome 120",
      os: "macOS 14.2",
      location: "Night city, CA",
      ip: "192.168.1.100",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      browser: "Safari",
      os: "iOS 17.2",
      location: "Gotham, CA",
      ip: "192.168.1.101",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Windows Desktop",
      browser: "Edge 120",
      os: "Windows 11",
      location: "Arasaka, NY",
      ip: "203.0.113.42",
      lastActive: "1 day ago",
      isCurrent: false,
    },
  ]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const [showRevokeSession, setShowRevokeSession] = useState(false);
  const [showRevokeAllSessions, setShowRevokeAllSessions] = useState(false);

  const [sshKeys, setSSHKeys] = useState<SSHKey[]>([
    {
      id: "1",
      title: "Work Laptop",
      key: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC...",
      fingerprint: "SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8",
      addedDate: "2025-09-15",
      lastUsed: "2025-09-20",
    },
    {
      id: "2",
      title: "PC",
      key: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl",
      fingerprint: "SHA256:jZb16KVZnEWaqPa8VrYjLvgKoL05eGYxA8qRPbiY7jU",
      addedDate: "2025-11-11",
      lastUsed: "2025-12-12",
    },
  ]);
  const [showAddSSHKey, setShowAddSSHKey] = useState(false);
  const [newSSHKey, setNewSSHKey] = useState({ title: "", key: "" });
  const [showDeleteSSHKey, setShowDeleteSSHKey] = useState(false);
  const [selectedSSHKey, setSelectedSSHKey] = useState<SSHKey | null>(null);

  const [tokens, setTokens] = useState<PersonalAccessToken[]>([
    {
      id: "1",
      name: "CI/CD Pipeline Token",
      scopes: ["repo", "workflow", "write:packages"],
      createdDate: "2024-12-01",
      expiresDate: "2025-02-10",
      lastUsed: "3 hours ago",
    },
    {
      id: "2",
      name: "Development Token",
      scopes: ["repo", "user"],
      createdDate: "2024-11-15",
      expiresDate: "2025-05-15",
      lastUsed: "1 day ago",
    },
  ]);
  const [showCreateToken, setShowCreateToken] = useState(false);
  const [showGeneratedToken, setShowGeneratedToken] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [showDeleteToken, setShowDeleteToken] = useState(false);
  const [selectedToken, setSelectedToken] =
    useState<PersonalAccessToken | null>(null);
  const [newToken, setNewToken] = useState({
    name: "",
    expiration: "30",
    scopes: [] as string[],
  });
  const [showTokenValue, setShowTokenValue] = useState(false);

  const [require2FAForSensitive, setRequire2FAForSensitive] = useState(true);
  const [emailSecurityAlerts, setEmailSecurityAlerts] = useState(true);
  const [autoLogoutInactive, setAutoLogoutInactive] = useState(true);
  const [allowedIPAddresses, setAllowedIPAddresses] = useState(false);

  const handleEnable2FA = () => {
    setShow2FASetupDialog(true);
  };

  const handleDisable2FA = () => {
    setShow2FADialog(true);
  };

  const handleConfirmDisable2FA = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTwoFactorEnabled(false);
      setTwoFactorMethod("none");
      setShow2FADialog(false);
      setIsLoading(false);
      toast("Two-factor authentication disabled", {
        description:
          "Your account is now less secure. Consider re-enabling 2FA.",
      });
    }, 1000);
  };

  const handleSetup2FA = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTwoFactorEnabled(true);
      setShow2FASetupDialog(false);
      setShow2FABackupCodes(true);
      setIsLoading(false);
      toast("Two-factor authentication enabled", {
        description: "Your account is now more secure with 2FA enabled.",
      });
    }, 1000);
  };

  const handleDownloadBackupCodes = () => {
    const content = backupCodes.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gitrise-backup-codes.txt";
    a.click();
    toast("Backup codes downloaded", {
      description: "Keep them in a safe place.",
    });
  };

  const handleAddSecurityKey = () => {
    if (!newSecurityKeyName.trim()) {
      toast("Error", {
        description: "Please provide a name for the security key.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newKey: SecurityKey = {
        id: Date.now().toString(),
        name: newSecurityKeyName,
        addedDate: new Date().toISOString().split("T")[0],
        lastUsed: null,
      };
      setSecurityKeys([...securityKeys, newKey]);
      setShowAddSecurityKey(false);
      setNewSecurityKeyName("");
      setIsLoading(false);
      toast("Security key added", {
        description: `${newSecurityKeyName} has been added to your account.`,
      });
    }, 1500);
  };

  const handleRemoveSecurityKey = (id: string) => {
    setSecurityKeys(securityKeys.filter((key) => key.id !== id));
    toast("Security key removed", {
      description: "The security key has been removed from your account.",
    });
  };

  const handleRevokeOAuth = () => {
    if (!selectedOAuthApp) return;
    setIsLoading(true);
    setTimeout(() => {
      setOauthApps(oauthApps.filter((app) => app.id !== selectedOAuthApp.id));
      setShowRevokeOAuth(false);
      setShowOAuthDetails(false);
      setSelectedOAuthApp(null);
      setIsLoading(false);
      toast("Access revoked", {
        description: `${selectedOAuthApp.name} no longer has access to your account.`,
      });
    }, 1000);
  };

  const handleRevokeSession = () => {
    if (!selectedSession) return;
    setIsLoading(true);
    setTimeout(() => {
      setSessions(
        sessions.filter((session) => session.id !== selectedSession.id),
      );
      setShowRevokeSession(false);
      setShowSessionDetails(false);
      setSelectedSession(null);
      setIsLoading(false);
      toast("Session revoked", {
        description: "The session has been terminated.",
      });
    }, 1000);
  };

  const handleRevokeAllSessions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSessions(sessions.filter((session) => session.isCurrent));
      setShowRevokeAllSessions(false);
      setIsLoading(false);
      toast("All sessions revoked", {
        description: "All other sessions have been terminated.",
      });
    }, 1000);
  };

  const handleAddSSHKey = () => {
    if (!newSSHKey.title.trim() || !newSSHKey.key.trim()) {
      toast("Error", {
        description: "Please provide both a title and SSH key.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const key: SSHKey = {
        id: Date.now().toString(),
        title: newSSHKey.title,
        key: newSSHKey.key,
        fingerprint: `SHA256:${Math.random().toString(36).substring(2, 15)}`,
        addedDate: new Date().toISOString().split("T")[0],
        lastUsed: null,
      };
      setSSHKeys([...sshKeys, key]);
      setShowAddSSHKey(false);
      setNewSSHKey({ title: "", key: "" });
      setIsLoading(false);
      toast("SSH key added", {
        description: `${newSSHKey.title} has been added to your account.`,
      });
    }, 1000);
  };

  const handleDeleteSSHKey = () => {
    if (!selectedSSHKey) return;
    setIsLoading(true);
    setTimeout(() => {
      setSSHKeys(sshKeys.filter((key) => key.id !== selectedSSHKey.id));
      setShowDeleteSSHKey(false);
      setSelectedSSHKey(null);
      setIsLoading(false);
      toast("SSH key deleted", {
        description: "The SSH key has been removed from your account.",
      });
    }, 1000);
  };

  const handleCreateToken = () => {
    if (!newToken.name.trim() || newToken.scopes.length === 0) {
      toast("Error", {
        description: "Please provide a name and select at least one scope.",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const token: PersonalAccessToken = {
        id: Date.now().toString(),
        name: newToken.name,
        scopes: newToken.scopes,
        createdDate: new Date().toISOString().split("T")[0],
        expiresDate: new Date(
          Date.now() +
            Number.parseInt(newToken.expiration) * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
        lastUsed: null,
      };
      setTokens([...tokens, token]);
      setGeneratedToken(
        `ghp_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      );
      setShowCreateToken(false);
      setShowGeneratedToken(true);
      setNewToken({ name: "", expiration: "30", scopes: [] });
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteToken = () => {
    if (!selectedToken) return;
    setIsLoading(true);
    setTimeout(() => {
      setTokens(tokens.filter((token) => token.id !== selectedToken.id));
      setShowDeleteToken(false);
      setSelectedToken(null);
      setIsLoading(false);
      toast("Token deleted", {
        description: "The personal access token has been revoked.",
      });
    }, 1000);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    toast("Token copied", {
      description: "The token has been copied to your clipboard.",
    });
  };

  const toggleTokenScope = (scope: string) => {
    setNewToken((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scope)
        ? prev.scopes.filter((s) => s !== scope)
        : [...prev.scopes, scope],
    }));
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h2 className="text-foreground text-2xl font-bold">
            Security & Access
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your account security and access controls
          </p>
        </div>

        {/* Two-Factor Authentication */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    Two-Factor Authentication
                  </h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        2FA adds an extra layer of security by requiring a
                        second form of verification when signing in.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <Badge
              className={
                twoFactorEnabled
                  ? "border-green-500/20 bg-green-500/10 text-green-500"
                  : "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
              }
            >
              {twoFactorEnabled ? (
                <>
                  <CheckCircle2 className="mr-1 size-3" />
                  Enabled
                </>
              ) : (
                <>
                  <AlertCircle className="mr-1 size-3" />
                  Disabled
                </>
              )}
            </Badge>
          </div>

          <div className="mt-4 space-y-3">
            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-muted-foreground text-sm">
                    Use an app like Google Authenticator or Authy
                  </p>
                </div>
              </div>
              <Badge
                variant={twoFactorMethod === "app" ? "default" : "outline"}
              >
                {twoFactorMethod === "app" ? "Active" : "Not configured"}
              </Badge>
            </div>

            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex items-center gap-3">
                <Fingerprint className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="font-medium">Security Keys</p>
                  <p className="text-muted-foreground text-sm">
                    Hardware keys like YubiKey or Titan
                  </p>
                </div>
              </div>
              <Badge variant={securityKeys.length > 0 ? "default" : "outline"}>
                {securityKeys.length > 0
                  ? `${securityKeys.length} configured`
                  : "Not configured"}
              </Badge>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {twoFactorEnabled ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShow2FABackupCodes(true)}
                  className="gap-2"
                >
                  <Download className="size-4" />
                  View Backup Codes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisable2FA}
                  className="text-destructive hover:text-destructive gap-2 bg-transparent"
                >
                  <Unlock className="size-4" />
                  Disable 2FA
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleEnable2FA}
                className="gap-2 bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                <Lock className="size-4" />
                Enable 2FA
              </Button>
            )}
          </div>
        </Card>

        {/* Security Keys */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fingerprint className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Security Keys</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Security keys are physical devices that provide the
                        strongest form of two-factor authentication.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage your hardware security keys
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="gap-2 bg-[#947bd3] hover:bg-[#a58ddb]"
              onClick={() => setShowAddSecurityKey(true)}
            >
              <Plus className="size-4" />
              Add Key
            </Button>
          </div>

          {securityKeys.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              <Fingerprint className="mx-auto mb-3 size-12 opacity-50" />
              <p>No security keys configured</p>
              <p className="mt-1 text-sm">
                Add a hardware key for enhanced security
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {securityKeys.map((key) => (
                <div
                  key={key.id}
                  className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:border-[#947bd3]/30"
                >
                  <div className="flex items-center gap-3">
                    <Fingerprint className="text-muted-foreground size-5" />
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <p className="text-muted-foreground text-sm">
                        Added {key.addedDate}
                        {key.lastUsed && ` • Last used ${key.lastUsed}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSecurityKey(key.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* OAuth Applications */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    Authorized Applications
                  </h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        These applications have been granted access to your
                        GitRise account. Review and revoke access as needed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage third-party application access
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {oauthApps.map((app) => (
              <div
                key={app.id}
                className="border-border bg-accent/30 hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:border-[#947bd3]/30"
                onClick={() => {
                  setSelectedOAuthApp(app);
                  setShowOAuthDetails(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#947bd3]/10">
                    <Globe className="size-5 text-[#947bd3]" />
                  </div>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-muted-foreground text-sm">
                      Last used {app.lastUsed} • {app.scopes.length} permissions
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Sessions */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Active Sessions</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        These are the devices and locations where you&apos;re
                        currently signed in. Revoke any suspicious sessions.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  {sessions.length} active{" "}
                  {sessions.length === 1 ? "session" : "sessions"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRevokeAllSessions(true)}
              className="text-destructive hover:text-destructive gap-2"
            >
              <RefreshCw className="size-4" />
              Revoke All
            </Button>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="border-border bg-accent/30 hover:bg-accent/50 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:border-[#947bd3]/30"
                onClick={() => {
                  setSelectedSession(session);
                  setShowSessionDetails(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <Monitor className="text-muted-foreground size-5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {session.browser} on {session.os}
                      </p>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                      <MapPin className="size-3" />
                      <span>{session.location}</span>
                      <span>•</span>
                      <Clock className="size-3" />
                      <span>{session.lastActive}</span>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSession(session);
                      setShowRevokeSession(true);
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* SSH Keys */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">SSH Keys</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        SSH keys allow you to establish a secure connection
                        between your computer and GitRise.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage your SSH keys for Git operations
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="gap-2 bg-[#947bd3] hover:bg-[#a58ddb]"
              onClick={() => setShowAddSSHKey(true)}
            >
              <Plus className="size-4" />
              Add SSH Key
            </Button>
          </div>

          {sshKeys.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              <Terminal className="mx-auto mb-3 size-12 opacity-50" />
              <p>No SSH keys configured</p>
              <p className="mt-1 text-sm">
                Add an SSH key to access repositories via SSH
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sshKeys.map((key) => (
                <div
                  key={key.id}
                  className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:border-[#947bd3]/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Terminal className="text-muted-foreground size-4 flex-shrink-0" />
                      <p className="font-medium">{key.title}</p>
                    </div>
                    <p className="text-muted-foreground truncate font-mono text-sm">
                      {key.fingerprint}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Added {key.addedDate}
                      {key.lastUsed && ` • Last used ${key.lastUsed}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedSSHKey(key);
                      setShowDeleteSSHKey(true);
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Personal Access Tokens */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="size-5 text-[#947bd3]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    Personal Access Tokens
                  </h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Tokens function like passwords for API access. Keep them
                        secure and never share them.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  Manage tokens for API and CLI access
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="gap-2 bg-[#947bd3] hover:bg-[#a58ddb]"
              onClick={() => setShowCreateToken(true)}
            >
              <Plus className="size-4" />
              Generate Token
            </Button>
          </div>

          {tokens.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              <Key className="mx-auto mb-3 size-12 opacity-50" />
              <p>No personal access tokens</p>
              <p className="mt-1 text-sm">
                Create a token for API or CLI access
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.id}
                  className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:border-[#947bd3]/30"
                >
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Key className="text-muted-foreground h-4 w-4" />
                      <p className="font-medium">{token.name}</p>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1">
                      {token.scopes.map((scope) => (
                        <Badge
                          key={scope}
                          variant="secondary"
                          className="text-xs"
                        >
                          {scope}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Calendar className="size-3" />
                      <span>Expires {token.expiresDate}</span>
                      {token.lastUsed && (
                        <>
                          <span>•</span>
                          <Clock className="size-3" />
                          <span>Last used {token.lastUsed}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedToken(token);
                      setShowDeleteToken(true);
                    }}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Security Preferences */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:border-[#947bd3]/50">
          <div className="flex items-center gap-3">
            <Settings className="size-5 text-[#947bd3]" />
            <h3 className="text-lg font-semibold">Security Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Require 2FA for sensitive actions</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Prompt for 2FA when performing critical operations like
                        deleting repositories or changing security settings.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Prompt for 2FA when performing critical operations
                </p>
              </div>
              <Switch
                checked={require2FAForSensitive}
                onCheckedChange={(checked) => {
                  setRequire2FAForSensitive(checked);
                  setHasChanges(true);
                }}
              />
            </div>

            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Email security alerts</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Receive email notifications about suspicious activity,
                        new sign-ins, and security changes.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Get notified of suspicious activity
                </p>
              </div>
              <Switch
                checked={emailSecurityAlerts}
                onCheckedChange={(checked) => {
                  setEmailSecurityAlerts(checked);
                  setHasChanges(true);
                }}
              />
            </div>

            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>Auto-logout inactive sessions</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Automatically end sessions that have been inactive for
                        30 days to improve security.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Automatically end sessions after 30 days
                </p>
              </div>
              <Switch
                checked={autoLogoutInactive}
                onCheckedChange={(checked) => {
                  setAutoLogoutInactive(checked);
                  setHasChanges(true);
                }}
              />
            </div>

            <div className="border-border bg-accent/30 hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label>IP address restrictions</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="text-muted-foreground size-3" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Only allow access from specific IP addresses or ranges
                        for enhanced security.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-muted-foreground text-sm">
                  Restrict access to specific IP addresses
                </p>
              </div>
              <Switch
                checked={allowedIPAddresses}
                onCheckedChange={(checked) => {
                  setAllowedIPAddresses(checked);
                  setHasChanges(true);
                }}
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb]"
            disabled={!hasChanges}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setHasChanges(false);
                setIsLoading(false);
                toast("Settings saved", {
                  description: "Your security preferences have been updated.",
                });
              }, 1000);
            }}
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!hasChanges}
            onClick={() => setHasChanges(false)}
          >
            Reset to default
          </Button>
        </div>

        {/* 2FA Setup Dialog */}
        <Dialog open={show2FASetupDialog} onOpenChange={setShow2FASetupDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Scan this QR code with your authenticator app
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex justify-center rounded-lg bg-white p-6">
                <div className="flex size-48 items-center justify-center rounded-lg bg-gray-200">
                  <QrCode className="size-32 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Or enter this code manually</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value="JBSWY3DPEHPK3PXP"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText("JBSWY3DPEHPK3PXP");
                      toast("Code copied to clipboard");
                    }}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Verification Code</Label>
                <Input
                  placeholder="Enter 6-digit code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShow2FASetupDialog(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSetup2FA}
                disabled={twoFactorCode.length !== 6 || isLoading}
                className="bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Enable 2FA"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 2FA Disable Confirmation */}
        <AlertDialog open={show2FADialog} onOpenChange={setShow2FADialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Disable Two-Factor Authentication?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will make your account less secure. You&apos;ll only need
                your password to sign in. Are you sure you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDisable2FA}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Disabling...
                  </>
                ) : (
                  "Disable 2FA"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Backup Codes Dialog */}
        <Dialog open={show2FABackupCodes} onOpenChange={setShow2FABackupCodes}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Backup Codes</DialogTitle>
              <DialogDescription>
                Save these codes in a safe place. Each code can only be used
                once.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-accent/50 grid grid-cols-2 gap-2 rounded-lg p-4 font-mono text-sm">
                {backupCodes.map((code, index) => (
                  <div key={index} className="bg-background rounded p-2">
                    {code}
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                <p className="text-sm text-yellow-500">
                  Store these codes securely. You won&apos;t be able to see them
                  again.
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={handleDownloadBackupCodes}
                className="w-full gap-2 bg-transparent sm:w-auto"
              >
                <Download className="size-4" />
                Download Codes
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(backupCodes.join("\n"));
                  toast("Codes copied to clipboard");
                }}
                className="w-full gap-2 sm:w-auto"
              >
                <Copy className="size-4" />
                Copy to Clipboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Security Key Dialog */}
        <Dialog open={showAddSecurityKey} onOpenChange={setShowAddSecurityKey}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Security Key</DialogTitle>
              <DialogDescription>
                Insert your security key and give it a memorable name
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  placeholder="e.g., YubiKey 5C"
                  value={newSecurityKeyName}
                  onChange={(e) => setNewSecurityKeyName(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
                <Fingerprint className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                <p className="text-sm text-blue-500">
                  When you click &quot;Add Key&quot;, you&apos;ll be prompted to
                  insert and activate your security key.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddSecurityKey(false);
                  setNewSecurityKeyName("");
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSecurityKey}
                disabled={isLoading}
                className="bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Adding Key...
                  </>
                ) : (
                  "Add Key"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* OAuth App Details Dialog */}
        <Dialog open={showOAuthDetails} onOpenChange={setShowOAuthDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedOAuthApp?.name}</DialogTitle>
              <DialogDescription>
                {selectedOAuthApp?.description}
              </DialogDescription>
            </DialogHeader>

            {selectedOAuthApp && (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-sm">
                    Permissions
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedOAuthApp.scopes.map((scope) => (
                      <Badge key={scope} variant="secondary">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Created</Label>
                    <p className="mt-1">{selectedOAuthApp.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Used</Label>
                    <p className="mt-1">{selectedOAuthApp.lastUsed}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                  <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-yellow-500" />
                  <p className="text-sm text-yellow-500">
                    Revoking access will immediately prevent this application
                    from accessing your account.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowOAuthDetails(false);
                  setSelectedOAuthApp(null);
                }}
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowOAuthDetails(false);
                  setShowRevokeOAuth(true);
                }}
              >
                Revoke Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Revoke OAuth Confirmation */}
        <AlertDialog open={showRevokeOAuth} onOpenChange={setShowRevokeOAuth}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke Application Access?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedOAuthApp?.name} will no longer be able to access your
                GitRise account. You can re-authorize it later if needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRevokeOAuth}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  "Revoke Access"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Session Details Dialog */}
        <Dialog open={showSessionDetails} onOpenChange={setShowSessionDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Session Details</DialogTitle>
              <DialogDescription>
                {selectedSession?.browser} on {selectedSession?.os}
              </DialogDescription>
            </DialogHeader>

            {selectedSession && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Device</Label>
                    <p className="mt-1">{selectedSession.device}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Browser</Label>
                    <p className="mt-1">{selectedSession.browser}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Location</Label>
                    <p className="mt-1">{selectedSession.location}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">IP Address</Label>
                    <p className="mt-1 font-mono text-xs">
                      {selectedSession.ip}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Active</Label>
                    <p className="mt-1">{selectedSession.lastActive}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge
                      className="mt-1"
                      variant={
                        selectedSession.isCurrent ? "default" : "secondary"
                      }
                    >
                      {selectedSession.isCurrent ? "Current" : "Active"}
                    </Badge>
                  </div>
                </div>

                {!selectedSession.isCurrent && (
                  <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                    <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-yellow-500" />
                    <p className="text-sm text-yellow-500">
                      If you don&apos;t recognize this session, revoke it
                      immediately and change your password.
                    </p>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSessionDetails(false);
                  setSelectedSession(null);
                }}
              >
                Close
              </Button>
              {selectedSession && !selectedSession.isCurrent && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowSessionDetails(false);
                    setShowRevokeSession(true);
                  }}
                >
                  Revoke Session
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Revoke Session Confirmation */}
        <AlertDialog
          open={showRevokeSession}
          onOpenChange={setShowRevokeSession}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke Session?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately sign out the device and end the session.
                The user will need to sign in again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRevokeSession}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  "Revoke Session"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Revoke All Sessions Confirmation */}
        <AlertDialog
          open={showRevokeAllSessions}
          onOpenChange={setShowRevokeAllSessions}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke All Sessions?</AlertDialogTitle>
              <AlertDialogDescription>
                This will sign you out of all devices except your current
                session. All other devices will need to sign in again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRevokeAllSessions}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  "Revoke All Sessions"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Add SSH Key Dialog */}
        <Dialog open={showAddSSHKey} onOpenChange={setShowAddSSHKey}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add SSH Key</DialogTitle>
              <DialogDescription>
                Add a new SSH key to access repositories via SSH
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="e.g., Work Laptop"
                  value={newSSHKey.title}
                  onChange={(e) =>
                    setNewSSHKey({ ...newSSHKey, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Key</Label>
                <Textarea
                  placeholder="Begins with 'ssh-rsa', 'ssh-ed25519', 'ecdsa-sha2-nistp256', etc."
                  value={newSSHKey.key}
                  onChange={(e) =>
                    setNewSSHKey({ ...newSSHKey, key: e.target.value })
                  }
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
                <Terminal className="mt-0.5 size-5 flex-shrink-0 text-blue-500" />
                <div className="text-sm text-blue-500">
                  <p className="mb-1 font-medium">Generate an SSH key:</p>
                  <code className="bg-background/50 mt-1 block rounded p-2 text-xs">
                    ssh-keygen -t ed25519 -C &quot;your_email@example.com&quot;
                  </code>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddSSHKey(false);
                  setNewSSHKey({ title: "", key: "" });
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddSSHKey}
                disabled={isLoading}
                className="bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add SSH Key"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete SSH Key Confirmation */}
        <AlertDialog open={showDeleteSSHKey} onOpenChange={setShowDeleteSSHKey}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete SSH Key?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove &quot;{selectedSSHKey?.title}&quot; from your
                account. You won&apos;t be able to use this key to access
                repositories.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSSHKey}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Key"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Create Token Dialog */}
        <Dialog open={showCreateToken} onOpenChange={setShowCreateToken}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Personal Access Token</DialogTitle>
              <DialogDescription>
                Create a token for API or CLI access to your account
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label>Token Name</Label>
                <Input
                  placeholder="e.g., CI/CD Pipeline Token"
                  value={newToken.name}
                  onChange={(e) =>
                    setNewToken({ ...newToken, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Expiration</Label>
                <Select
                  value={newToken.expiration}
                  onValueChange={(value) =>
                    setNewToken({ ...newToken, expiration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="0">No expiration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Select Scopes</Label>
                <div className="space-y-2">
                  {[
                    {
                      value: "repo",
                      label: "Full control of private repositories",
                    },
                    { value: "repo:status", label: "Access commit status" },
                    {
                      value: "repo_deployment",
                      label: "Access deployment status",
                    },
                    {
                      value: "public_repo",
                      label: "Access public repositories",
                    },
                    { value: "user", label: "Update user data" },
                    {
                      value: "user:email",
                      label: "Access user email addresses",
                    },
                    {
                      value: "user:follow",
                      label: "Follow and unfollow users",
                    },
                    {
                      value: "workflow",
                      label: "Update GitHub Action workflows",
                    },
                    { value: "write:packages", label: "Upload packages" },
                    { value: "read:packages", label: "Download packages" },
                    { value: "delete:packages", label: "Delete packages" },
                    {
                      value: "admin:org",
                      label: "Full control of orgs and teams",
                    },
                    { value: "notifications", label: "Access notifications" },
                  ].map((scope) => (
                    <div
                      key={scope.value}
                      className="border-border bg-accent/30 hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors"
                      onClick={() => toggleTokenScope(scope.value)}
                    >
                      <Checkbox
                        checked={newToken.scopes.includes(scope.value)}
                        onCheckedChange={() => toggleTokenScope(scope.value)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{scope.value}</p>
                        <p className="text-muted-foreground text-xs">
                          {scope.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-yellow-500" />
                <p className="text-sm text-yellow-500">
                  Tokens are like passwords. Keep them secure and never share
                  them. You&apos;ll only see the token once after creation.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateToken(false);
                  setNewToken({ name: "", expiration: "30", scopes: [] });
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateToken}
                disabled={isLoading}
                className="bg-[#947bd3] hover:bg-[#a58ddb]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Token"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Generated Token Dialog */}
        <Dialog open={showGeneratedToken} onOpenChange={setShowGeneratedToken}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Personal Access Token Created</DialogTitle>
              <DialogDescription>
                Make sure to copy your token now. You won&apos;t be able to see
                it again!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your New Token</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={generatedToken}
                    readOnly
                    type={showTokenValue ? "text" : "password"}
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setShowTokenValue(!showTokenValue)}
                  >
                    {showTokenValue ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyToken}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-red-500" />
                <p className="text-sm text-red-500">
                  This is the only time you&apos;ll see this token. Store it
                  securely in a password manager or environment variable.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => {
                  setShowGeneratedToken(false);
                  setGeneratedToken("");
                  setShowTokenValue(false);
                }}
                className="w-full"
              >
                I&apos;ve Saved My Token
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Token Confirmation */}
        <AlertDialog open={showDeleteToken} onOpenChange={setShowDeleteToken}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Personal Access Token?</AlertDialogTitle>
              <AlertDialogDescription>
                This will revoke &quot;{selectedToken?.name}&quot; and any
                applications using it will lose access. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteToken}
                disabled={isLoading}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Token"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}

import type {
  SecurityState,
  Session,
  TrustedDevice,
  SecurityKey,
  AccessToken,
  LoginHistoryItem,
  IPRule,
  RecoveryCode,
} from "./security-types";

/**
 * Sample active sessions.
 */
export const INITIAL_SESSIONS: Session[] = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "San Francisco, CA",
    ip: "192.168.1.1",
    lastActive: "2 minutes ago",
    current: true,
  },
  {
    id: "2",
    device: "Firefox on Windows",
    location: "New York, NY",
    ip: "192.168.1.2",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    device: "Safari on iOS",
    location: "Los Angeles, CA",
    ip: "192.168.1.3",
    lastActive: "1 day ago",
    current: false,
  },
];

/**
 * Sample trusted devices.
 */
export const INITIAL_TRUSTED_DEVICES: TrustedDevice[] = [
  {
    id: "1",
    name: "MacBook Pro",
    type: "desktop",
    addedOn: "Jan 15, 2025",
    lastUsed: "2 minutes ago",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    type: "mobile",
    addedOn: "Dec 20, 2024",
    lastUsed: "1 day ago",
  },
];

/**
 * Sample security keys.
 */
export const INITIAL_SECURITY_KEYS: SecurityKey[] = [
  {
    id: "1",
    name: "YubiKey 5C",
    addedOn: "Jan 10, 2025",
  },
];

/**
 * Sample access tokens.
 */
export const INITIAL_ACCESS_TOKENS: AccessToken[] = [
  {
    id: "1",
    name: "GitHub Actions CI/CD",
    scopes: ["repo", "workflow"],
    lastUsed: "5 minutes ago",
    createdOn: "Jan 1, 2025",
  },
  {
    id: "2",
    name: "Personal CLI Tool",
    scopes: ["read:user", "repo"],
    lastUsed: "2 days ago",
    createdOn: "Dec 15, 2024",
  },
];

/**
 * Sample login history.
 */
export const INITIAL_LOGIN_HISTORY: LoginHistoryItem[] = [
  {
    id: "1",
    timestamp: "2025-01-28 14:30:00",
    location: "San Francisco, CA",
    ip: "192.168.1.1",
    device: "Chrome on macOS",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2025-01-28 09:15:00",
    location: "New York, NY",
    ip: "192.168.1.2",
    device: "Firefox on Windows",
    status: "success",
  },
  {
    id: "3",
    timestamp: "2025-01-27 18:45:00",
    location: "Unknown",
    ip: "203.0.113.0",
    device: "Chrome on Linux",
    status: "failed",
  },
];

/**
 * Sample IP rules.
 */
export const INITIAL_IP_RULES: IPRule[] = [
  {
    id: "1",
    ip: "192.168.1.0/24",
    type: "whitelist",
    description: "Office Network",
    addedOn: "Jan 20, 2025",
  },
  {
    id: "2",
    ip: "203.0.113.0",
    type: "blacklist",
    description: "Suspicious IP",
    addedOn: "Jan 15, 2025",
  },
];

/**
 * Sample recovery codes.
 */
export const INITIAL_RECOVERY_CODES: RecoveryCode[] = [
  { code: "ABCD-1234-EFGH", used: false },
  { code: "IJKL-5678-MNOP", used: false },
  { code: "QRST-9012-UVWX", used: true },
  { code: "YZAB-3456-CDEF", used: false },
  { code: "GHIJ-7890-KLMN", used: false },
  { code: "OPQR-1234-STUV", used: false },
  { code: "WXYZ-5678-ABCD", used: false },
  { code: "EFGH-9012-IJKL", used: false },
];

/**
 * Default security state.
 */
export const DEFAULT_SECURITY_STATE: SecurityState = {
  twoFactorEnabled: false,
  sessionTimeout: "24",
  sessions: INITIAL_SESSIONS,
  trustedDevices: INITIAL_TRUSTED_DEVICES,
  securityKeys: INITIAL_SECURITY_KEYS,
  accessTokens: INITIAL_ACCESS_TOKENS,
  loginHistory: INITIAL_LOGIN_HISTORY,
  ipRules: INITIAL_IP_RULES,
  recoveryCodes: INITIAL_RECOVERY_CODES,
  alerts: {
    emailEnabled: true,
    failedLoginAlerts: true,
    newDeviceAlerts: true,
    suspiciousActivityAlerts: true,
  },
};

/**
 * Session timeout options.
 */
export const SESSION_TIMEOUT_OPTIONS = [
  { value: "1", label: "1 hour" },
  { value: "2", label: "2 hours" },
  { value: "4", label: "4 hours" },
  { value: "8", label: "8 hours" },
  { value: "12", label: "12 hours" },
  { value: "24", label: "24 hours" },
  { value: "never", label: "Never" },
];

/**
 * Available token scopes.
 */
export const TOKEN_SCOPES = [
  { id: "repo", label: "repo - Full control of repositories" },
  { id: "workflow", label: "workflow - Update GitHub Action workflows" },
  { id: "read:user", label: "read:user - Read user profile data" },
  { id: "write:discussion", label: "write:discussion - Write discussions" },
  { id: "admin:org", label: "admin:org - Full control of orgs" },
];

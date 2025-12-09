/**
 * Security settings types.
 */

/**
 * Device types for session tracking.
 */
export type DeviceType = "desktop" | "mobile" | "tablet";

/**
 * Session status types.
 */
export type SessionStatus = "active" | "expired";

/**
 * Login attempt status.
 */
export type LoginStatus = "success" | "failed";

/**
 * IP rule types.
 */
export type IPRuleType = "whitelist" | "blacklist";

/**
 * Active session information.
 *
 * @interface Session
 * @property {string} id - Unique session identifier
 * @property {string} device - Device and browser information
 * @property {string} location - Geographic location
 * @property {string} ip - IP address
 * @property {string} lastActive - Last activity timestamp
 * @property {boolean} current - Whether this is the current session
 */
export interface Session {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

/**
 * Trusted device information.
 *
 * @interface TrustedDevice
 * @property {string} id - Unique device identifier
 * @property {string} name - Device name
 * @property {DeviceType} type - Type of device
 * @property {string} addedOn - Date device was added
 * @property {string} lastUsed - Last usage timestamp
 */
export interface TrustedDevice {
  id: string;
  name: string;
  type: DeviceType;
  addedOn: string;
  lastUsed: string;
}

/**
 * Hardware security key information.
 *
 * @interface SecurityKey
 * @property {string} id - Unique key identifier
 * @property {string} name - User-friendly key name
 * @property {string} addedOn - Date key was added
 */
export interface SecurityKey {
  id: string;
  name: string;
  addedOn: string;
}

/**
 * Personal access token information.
 *
 * @interface AccessToken
 * @property {string} id - Unique token identifier
 * @property {string} name - Token name/description
 * @property {string[]} scopes - Permission scopes
 * @property {string} lastUsed - Last usage timestamp
 * @property {string} createdOn - Creation date
 */
export interface AccessToken {
  id: string;
  name: string;
  scopes: string[];
  lastUsed: string;
  createdOn: string;
}

/**
 * Login history entry.
 *
 * @interface LoginHistoryItem
 * @property {string} id - Unique entry identifier
 * @property {string} timestamp - Login timestamp
 * @property {string} location - Geographic location
 * @property {string} ip - IP address
 * @property {string} device - Device information
 * @property {LoginStatus} status - Login attempt status
 */
export interface LoginHistoryItem {
  id: string;
  timestamp: string;
  location: string;
  ip: string;
  device: string;
  status: LoginStatus;
}

/**
 * IP access control rule.
 *
 * @interface IPRule
 * @property {string} id - Unique rule identifier
 * @property {string} ip - IP address or CIDR range
 * @property {IPRuleType} type - Rule type (whitelist/blacklist)
 * @property {string} description - Rule description
 * @property {string} addedOn - Date rule was added
 */
export interface IPRule {
  id: string;
  ip: string;
  type: IPRuleType;
  description: string;
  addedOn: string;
}

/**
 * Recovery code for 2FA backup.
 *
 * @interface RecoveryCode
 * @property {string} code - The recovery code
 * @property {boolean} used - Whether code has been used
 */
export interface RecoveryCode {
  code: string;
  used: boolean;
}

/**
 * Security alert preferences.
 *
 * @interface SecurityAlerts
 * @property {boolean} emailEnabled - Master toggle for email alerts
 * @property {boolean} failedLoginAlerts - Alert on failed login attempts
 * @property {boolean} newDeviceAlerts - Alert on new device login
 * @property {boolean} suspiciousActivityAlerts - Alert on suspicious activity
 */
export interface SecurityAlerts {
  emailEnabled: boolean;
  failedLoginAlerts: boolean;
  newDeviceAlerts: boolean;
  suspiciousActivityAlerts: boolean;
}

/**
 * Main security state interface.
 *
 * @interface SecurityState
 * @property {boolean} twoFactorEnabled - Whether 2FA is enabled
 * @property {string} sessionTimeout - Session timeout duration in hours
 * @property {Session[]} sessions - Active sessions
 * @property {TrustedDevice[]} trustedDevices - Trusted devices
 * @property {SecurityKey[]} securityKeys - Hardware security keys
 * @property {AccessToken[]} accessTokens - Personal access tokens
 * @property {LoginHistoryItem[]} loginHistory - Recent login attempts
 * @property {IPRule[]} ipRules - IP access control rules
 * @property {RecoveryCode[]} recoveryCodes - 2FA recovery codes
 * @property {SecurityAlerts} alerts - Security alert preferences
 */
export interface SecurityState {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
  sessions: Session[];
  trustedDevices: TrustedDevice[];
  securityKeys: SecurityKey[];
  accessTokens: AccessToken[];
  loginHistory: LoginHistoryItem[];
  ipRules: IPRule[];
  recoveryCodes: RecoveryCode[];
  alerts: SecurityAlerts;
}

/**
 * New token configuration.
 */
export interface NewTokenConfig {
  name: string;
  scopes: string[];
}

/**
 * New security key configuration.
 */
export interface NewSecurityKeyConfig {
  name: string;
}

/**
 * New IP rule configuration.
 */
export interface NewIPRuleConfig {
  ip: string;
  type: IPRuleType;
  description: string;
}

/**
 * Password change data.
 */
export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

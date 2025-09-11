export type SettingsSection =
  | "profile"
  | "appearance"
  | "notifications"
  | "security"
  | "billing"
  | "developer"
  | "privacy";

export type UsernameStatus = "idle" | "checking" | "available" | "taken";

export type TwoFactorMethod = "app" | "sms" | "none";
export type SecurityKey = {
  id: string;
  name: string;
  addedDate: string;
  lastUsed: string | null;
};

export type OAuthApp = {
  id: string;
  name: string;
  description: string;
  scopes: string[];
  createdDate: string;
  lastUsed: string;
  icon?: string;
};

export type Session = {
  id: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
};

export type SSHKey = {
  id: string;
  title: string;
  key: string;
  fingerprint: string;
  addedDate: string;
  lastUsed: string | null;
};

export type PersonalAccessToken = {
  id: string;
  name: string;
  scopes: string[];
  createdDate: string;
  expiresDate: string;
  lastUsed: string | null;
};

export type PaymentMethod = {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  downloadUrl: string;
};

export type Plan = {
  name: string;
  price: number | null;
  period: string;
  features: string[];
  current: boolean;
};

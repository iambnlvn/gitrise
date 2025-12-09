/**
 * Subscription plan tiers.
 */
export type PlanTier = "free" | "pro" | "enterprise";

/**
 * Payment method types.
 */
export type PaymentMethodType = "card" | "paypal" | "bank";

/**
 * Card brand types.
 */
export type CardType = "visa" | "mastercard" | "amex" | "discover" | "unknown";

/**
 * Invoice status types.
 */
export type InvoiceStatus = "paid" | "pending" | "failed";

/**
 * Payment method information.
 *
 * @interface PaymentMethod
 * @property {string} id - Unique identifier for the payment method
 * @property {PaymentMethodType} type - Type of payment method
 * @property {string} last4 - Last 4 digits of card/account number
 * @property {string} brand - Brand name (e.g., "Visa", "Mastercard", "PayPal")
 * @property {string} expiry - Expiry date (for cards)
 * @property {boolean} isDefault - Whether this is the default payment method
 */
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4: string;
  brand: string;
  expiry: string;
  isDefault: boolean;
}

/**
 * Subscription plan details.
 *
 * @interface Plan
 * @property {string} id - Unique plan identifier
 * @property {string} name - Display name of the plan
 * @property {string} description - Brief description of the plan
 * @property {number} price - Monthly price in dollars
 * @property {string} interval - Billing interval
 * @property {string[]} features - List of plan features
 * @property {boolean} popular - Whether this plan is marked as popular
 * @property {number} [repositories] - Maximum number of repositories
 * @property {number} [collaborators] - Maximum number of collaborators
 * @property {string} [storage] - Storage allocation
 */
export interface Plan {
  id: string;
  name: string;
  period: string;
  price: number;
  features: { name: string; value: string | boolean }[];
  popular?: boolean;
  repositories?: number;
  collaborators?: number;
  storage?: string;
}

/**
 * Invoice information.
 *
 * @interface Invoice
 * @property {string} id - Unique invoice identifier
 * @property {string} date - Invoice date
 * @property {number} amount - Invoice amount in dollars
 * @property {InvoiceStatus} status - Payment status
 * @property {string} description - Invoice description
 * @property {string} [downloadUrl] - URL to download invoice PDF
 */
export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  description: string;
  downloadUrl?: string;
}

/**
 * Usage statistics for the current billing period.
 *
 * @interface UsageStats
 * @property {number} repositories - Number of repositories used
 * @property {number} repositoriesLimit - Maximum repositories allowed
 * @property {number} collaborators - Number of active collaborators
 * @property {number} collaboratorsLimit - Maximum collaborators allowed
 * @property {number} storageUsed - Storage used in GB
 * @property {number} storageLimit - Storage limit in GB
 * @property {number} buildMinutes - Build minutes used this month
 * @property {number} buildMinutesLimit - Build minutes limit
 * @property {number} bandwidthUsed - Bandwidth used in GB
 * @property {number} bandwidthLimit - Bandwidth limit in GB
 */
export interface UsageStats {
  repositories: number;
  repositoriesLimit: number;
  collaborators: number;
  collaboratorsLimit: number;
  storageUsed: number;
  storageLimit: number;
  buildMinutes: number;
  buildMinutesLimit: number;
  bandwidthUsed: number;
  bandwidthLimit: number;
}

/**
 * Billing state interface.
 *
 * @interface BillingState
 * @property {string} currentPlan - ID of the current subscription plan
 * @property {PaymentMethod[]} paymentMethods - List of saved payment methods
 * @property {Invoice[]} invoices - Billing history
 * @property {UsageStats} usage - Current usage statistics
 * @property {string | null} isDownloading - ID of invoice being downloaded
 */
export interface BillingState {
  currentPlan: string;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  usage: UsageStats;
  isDownloading: string | null;
}

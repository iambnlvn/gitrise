/**
 * Notification delivery channels.
 */
export type NotificationChannel = "email" | "inApp" | "push";

/**
 * Types of activities that can trigger notifications.
 */
export type ActivityType =
  | "pullRequests"
  | "issues"
  | "comments"
  | "mentions"
  | "repositoryUpdates";

/**
 * Email digest frequency options.
 */
export type DigestFrequency =
  | "realtime"
  | "hourly"
  | "daily"
  | "weekly"
  | "never";

/**
 * This interface defines all configurable notification options.
 *
 * @interface NotificationState
 * @property {boolean} emailEnabled - Email notifications enabled
 * @property {boolean} inAppEnabled - In-app notifications enabled
 * @property {boolean} pushEnabled - Push notifications enabled
 * @property {boolean} pullRequestsEnabled - PR notifications enabled
 * @property {boolean} issuesEnabled - Issue notifications enabled
 * @property {boolean} commentsEnabled - Comment notifications enabled
 * @property {boolean} mentionsEnabled - Mention notifications enabled
 * @property {boolean} repositoryUpdatesEnabled - Repository update notifications enabled
 * @property {DigestFrequency} emailDigestFrequency - Email digest frequency
 * @property {boolean} doNotDisturb - Do not disturb mode enabled
 * @property {boolean} onlyParticipating - Only notify for participating threads
 * @property {boolean} ignoreBotActivity - Ignore bot activity notifications
 * @property {boolean} groupSimilar - Group similar notifications
 */
export interface NotificationState {
  emailEnabled: boolean;
  inAppEnabled: boolean;
  pushEnabled: boolean;
  pullRequestsEnabled: boolean;
  issuesEnabled: boolean;
  commentsEnabled: boolean;
  mentionsEnabled: boolean;
  repositoryUpdatesEnabled: boolean;
  emailDigestFrequency: DigestFrequency;
  doNotDisturb: boolean;
  onlyParticipating: boolean;
  ignoreBotActivity: boolean;
  groupSimilar: boolean;
}

import {
  IntegrationPermissions,
  PermissionPreset,
  PermissionPresetConfig,
  PermissionScope,
  PermissionValidationResult,
} from "@/app/settings/developer/developer-types";

/**
 * Default permission presets.
 */
export const PERMISSION_PRESETS: Record<
  PermissionPreset,
  PermissionPresetConfig
> = {
  "read-only": {
    preset: "read-only",
    label: "Read Only",
    description: "View repositories, issues, and pull requests",
    permissions: {
      repository: "read",
      webhook: "read",
      issues: "read",
      pullRequests: "read",
      deployments: "read",
      organization: "read",
      canCreateRepositories: false,
      canDeleteRepositories: false,
      canManageTeams: false,
      canManageMembers: false,
      canAccessAnalytics: true,
      canManageSecrets: false,
      canTriggerBuilds: false,
      grantedAt: new Date().toISOString(),
    },
  },
  standard: {
    preset: "standard",
    label: "Standard",
    description: "Read and write access to repositories and issues",
    permissions: {
      repository: "write",
      webhook: "write",
      issues: "write",
      pullRequests: "write",
      deployments: "read",
      organization: "read",
      canCreateRepositories: true,
      canDeleteRepositories: false,
      canManageTeams: false,
      canManageMembers: false,
      canAccessAnalytics: true,
      canManageSecrets: false,
      canTriggerBuilds: true,
      grantedAt: new Date().toISOString(),
    },
  },
  "full-access": {
    preset: "full-access",
    label: "Full Access",
    description: "Complete administrative access to all resources",
    permissions: {
      repository: "admin",
      webhook: "write",
      issues: "write",
      pullRequests: "write",
      deployments: "write",
      organization: "admin",
      canCreateRepositories: true,
      canDeleteRepositories: true,
      canManageTeams: true,
      canManageMembers: true,
      canAccessAnalytics: true,
      canManageSecrets: true,
      canTriggerBuilds: true,
      grantedAt: new Date().toISOString(),
    },
  },
  custom: {
    preset: "custom",
    label: "Custom",
    description: "Configure permissions manually",
    permissions: {
      repository: "none",
      webhook: "none",
      issues: "none",
      pullRequests: "none",
      deployments: "none",
      organization: "none",
      canCreateRepositories: false,
      canDeleteRepositories: false,
      canManageTeams: false,
      canManageMembers: false,
      canAccessAnalytics: false,
      canManageSecrets: false,
      canTriggerBuilds: false,
      grantedAt: new Date().toISOString(),
    },
  },
};

/**
 * Common permission scopes.
 */
export const PERMISSION_SCOPES: PermissionScope[] = [
  {
    id: "repository-access",
    name: "Repository Access",
    description: "Access to view, create, and modify repositories",
    permissions: [
      "repository",
      "canCreateRepositories",
      "canDeleteRepositories",
    ],
    required: true,
  },
  {
    id: "webhook-management",
    name: "Webhook Management",
    description: "Manage webhooks and delivery settings",
    permissions: ["webhook"],
    required: false,
  },
  {
    id: "issue-management",
    name: "Issue Management",
    description: "Create, edit, and manage issues/tickets",
    permissions: ["issues"],
    required: false,
  },
  {
    id: "pull-request-access",
    name: "Pull Request Access",
    description: "Review and manage pull requests",
    permissions: ["pullRequests"],
    required: false,
  },
  {
    id: "deployment-access",
    name: "Deployment Access",
    description: "View and trigger deployments",
    permissions: ["deployments", "canTriggerBuilds"],
    required: false,
  },
  {
    id: "team-management",
    name: "Team Management",
    description: "Manage organization teams and members",
    permissions: ["organization", "canManageTeams", "canManageMembers"],
    required: false,
  },
  {
    id: "security-access",
    name: "Security Access",
    description: "Manage secrets and security settings",
    permissions: ["canManageSecrets"],
    required: false,
  },
];

/**
 * Gets a permission preset configuration.
 */
export function getPermissionPreset(
  preset: PermissionPreset,
): IntegrationPermissions {
  return { ...PERMISSION_PRESETS[preset].permissions };
}

/**
 * Validates integration permissions.
 */
export function validatePermissions(
  permissions: Partial<IntegrationPermissions>,
  requiredPermissions?: (keyof IntegrationPermissions)[],
): PermissionValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const missingRequired: string[] = [];

  // Check required permissions
  if (requiredPermissions) {
    for (const required of requiredPermissions) {
      if (!permissions[required]) {
        missingRequired.push(required);
        errors.push(`Missing required permission: ${required}`);
      }
    }
  }

  // Validate permission combinations
  if (permissions.canDeleteRepositories && permissions.repository !== "admin") {
    warnings.push("Delete repositories requires admin repository access");
  }

  if (permissions.canManageTeams && permissions.organization === "none") {
    warnings.push("Managing teams requires organization access");
  }

  if (permissions.canManageMembers && permissions.organization === "none") {
    warnings.push("Managing members requires organization access");
  }

  if (permissions.canTriggerBuilds && permissions.deployments === "none") {
    warnings.push("Triggering builds requires deployment access");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    missingRequired,
  };
}

/**
 * Merges partial permissions with defaults.
 */
export function mergePermissions(
  partial: Partial<IntegrationPermissions>,
  preset: PermissionPreset = "standard",
): IntegrationPermissions {
  const basePermissions = getPermissionPreset(preset);
  return {
    ...basePermissions,
    ...partial,
    grantedAt: new Date().toISOString(),
  };
}

/**
 * Checks if permissions are elevated from a base level.
 */
export function hasElevatedPermissions(
  permissions: IntegrationPermissions,
  basePreset: PermissionPreset = "read-only",
): boolean {
  const base = getPermissionPreset(basePreset);

  return (
    permissions.repository !== base.repository ||
    permissions.canDeleteRepositories !== base.canDeleteRepositories ||
    permissions.canManageTeams !== base.canManageTeams ||
    permissions.organization !== base.organization
  );
}

/**
 * Generates a permission summary description.
 */
export function getPermissionSummary(
  permissions: IntegrationPermissions,
): string {
  const summaries: string[] = [];

  if (permissions.repository !== "none") {
    summaries.push(`${permissions.repository} repository access`);
  }

  if (permissions.webhook !== "none") {
    summaries.push(`${permissions.webhook} webhook access`);
  }

  if (permissions.canTriggerBuilds) {
    summaries.push("trigger builds");
  }

  if (permissions.canManageTeams) {
    summaries.push("manage teams");
  }

  return summaries.length > 0 ? summaries.join(", ") : "No permissions";
}

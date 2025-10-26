import { CheckCircle, FolderGit2, Link2, Settings, User } from "lucide-react";

export const WIZARD_STEPS = [
  {
    id: "neural-id",
    label: "Identity",
    description: "Set up your profile",
    icon: User,
  },
  {
    id: "holo-deck",
    label: "Preferences",
    description: "Customize your experience",
    icon: Settings,
  },
  {
    id: "uplink",
    label: "Integrations",
    description: "Connect your tools",
    icon: Link2,
  },
  {
    id: "node-init",
    label: "Workspace",
    description: "Create your first project",
    icon: FolderGit2,
  },
  {
    id: "mission-ready",
    label: "Complete",
    description: "You're all set",
    icon: CheckCircle,
  },
];

export const WIZARD_ROLES = [
  {
    id: "developer",
    label: "Developer",
    icon: "👨‍💻",
    description: "Build and ship code",
  },
  {
    id: "designer",
    label: "Designer",
    icon: "🎨",
    description: "Craft visual experiences",
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "⚙️",
    description: "Infrastructure & automation",
  },
  {
    id: "lead",
    label: "Tech Lead",
    icon: "🚀",
    description: "Guide teams to success",
  },
];

// these are empty placeholder avatars for now
export const WIZARD_AVATARS = [
  "/placeholder.svg?height=80&width=80",
  "/placeholder.svg?height=80&width=80",
  "/placeholder.svg?height=80&width=80",
  "/placeholder.svg?height=80&width=80",
  "/placeholder.svg?height=80&width=80",
  "/placeholder.svg?height=80&width=80",
];

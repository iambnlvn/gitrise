import {
  CheckCircle,
  FolderGit2,
  Laptop,
  Link2,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

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

export const WIZARD_THEMES = [
  { id: "light", label: "Light", icon: Sun, description: "Bright and clear" },
  { id: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
  {
    id: "system",
    label: "System",
    icon: Laptop,
    description: "Match OS setting",
  },
] as const;

export const WIZARD_DENSITIES = [
  { id: "compact", label: "Compact", description: "Maximum density" },
  { id: "comfortable", label: "Comfortable", description: "Balanced layout" },
  { id: "spacious", label: "Spacious", description: "Relaxed spacing" },
] as const;

export const WIZARD_EDITING_MODES = [
  { id: "standard", label: "Standard", description: "Default keybindings" },
  { id: "vim", label: "Vim", description: "Modal editing" },
  { id: "emacs", label: "Emacs", description: "Chord keybindings" },
] as const;

export const WIZARD_GIT_PROVIDERS = [
  {
    id: "github",
    name: "GitHub",
    icon: "https://cdn.simpleicons.org/github",
    description: "Sync with GitHub repositories",
    recommended: true,
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: "https://cdn.simpleicons.org/gitlab",
    description: "Integrated CI/CD and DevOps",
    recommended: false,
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    icon: "https://cdn.simpleicons.org/bitbucket",
    description: "Collaborate on code with Bitbucket",
    recommended: false,
  },
];

export const WIZARD_COMMUNICATION_TOOLS = [
  {
    id: "slack",
    name: "Slack",
    icon: "https://cdn.simpleicons.org/slack",
    description: "Get notifications in your channels",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "https://cdn.simpleicons.org/discord",
    description: "Connect with your team",
  },
];

export const WIZARD_PROJECT_TEMPLATES = [
  { id: "nextjs", name: "Next.js", icon: "▲", description: "React framework" },
  { id: "react", name: "React", icon: "⚛️", description: "UI library" },
  { id: "node", name: "Node.js", icon: "◆", description: "JavaScript runtime" },
  { id: "python", name: "Python", icon: "🐍", description: "ML & scripting" },
];

export const COMPLETION_ITEMS = [
  { id: "neural-id", label: "Profile Created", icon: User },
  { id: "holo-deck", label: "Preferences Saved", icon: Settings },
  { id: "uplink", label: "Integrations Ready", icon: Link2 },
  { id: "node-init", label: "Workspace Created", icon: FolderGit2 },
];

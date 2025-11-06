import {
  CircleDot,
  GitBranch,
  GitFork,
  GitPullRequest,
  Star,
} from "lucide-react";

export const mockRepositories = [
  {
    name: "awesome-project",
    description:
      "A comprehensive web application built with Next.js and TypeScript. Features include user authentication, real-time updates, and a modern UI.",
    owner: "iambnlvn",
    language: "TypeScript",

    stars: 1247,
    forks: 89,
    isPrivate: false,
    updatedAt: "2 hours ago",
  },
  {
    name: "mobile-app",
    description:
      "Cross-platform mobile application using React Native with Redux for state management.",
    owner: "iambnlvn",
    language: "JavaScript",
    stars: 523,
    forks: 34,
    isPrivate: true,
    updatedAt: "1 day ago",
  },
  {
    name: "data-analysis-toolkit",
    description:
      "Python toolkit for data analysis and visualization with pandas, numpy, and matplotlib.",
    owner: "iambnlvn",
    language: "Python",
    stars: 892,
    forks: 156,
    isPrivate: false,
    updatedAt: "3 days ago",
  },
  {
    name: "rust-cli-tool",
    description:
      "Fast and efficient command-line tool written in Rust for file processing and automation.",
    owner: "iambnlvn",
    language: "Rust",
    stars: 234,
    forks: 12,
    isPrivate: false,
    updatedAt: "1 week ago",
  },
  {
    name: "design-system",
    description:
      "Comprehensive design system with reusable components, tokens, and documentation.",
    owner: "iambnlvn",
    language: "CSS",
    stars: 678,
    forks: 45,
    isPrivate: false,
    updatedAt: "2 weeks ago",
  },
  {
    name: "api-gateway",
    description:
      "Microservices API gateway built with Go, featuring rate limiting, authentication, and monitoring.",
    owner: "iambnlvn",
    language: "Go",
    stars: 445,
    forks: 67,
    isPrivate: true,
    updatedAt: "3 weeks ago",
  },
];

export const mockNotes = [
  {
    id: 1,
    user: "iambnlvn",
    avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    color: "bg-blue-500",
    content: "Reviewed the latest PR and added comments.",
    reactions: { like: 12, love: 5, laugh: 2 },
    timestamp: "1h ago",
    replies: [
      {
        id: 1,
        user: "contributor1",
        avatar: "C",
        color: "bg-yellow-500",
        content: "Thanks for the review! I'll address the comments.",
        type: "reply",
        timestamp: "45m ago",
      },
      {
        id: 2,
        user: "contributor2",
        avatar: "C",
        color: "bg-pink-500",
        content: "Appreciate the feedback!",
        type: "reply",
        timestamp: "30m ago",
      },
    ],
  },
  {
    id: 2,
    user: "Torvalds",
    avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    color: "bg-green-500",
    content: "windows sucks, new major linux kernel update coming soon.",
    reactions: { like: 8, love: 3, laugh: 1210 },
    timestamp: "2h ago",
    replies: [
      {
        id: 1,
        user: "contributor1",
        avatar: "C",
        color: "bg-yellow-500",
        content: "cant wait to try it out!",
        type: "reply",
        timestamp: "45m ago",
      },
      {
        id: 2,
        user: "contributor2",
        avatar: "C",
        color: "bg-pink-500",
        content: "common Linux W",
        type: "reply",
        timestamp: "30m ago",
      },
    ],
  },
  {
    id: 3,
    user: "mike-ops",
    avatar: "M",
    color: "bg-red-500",
    content: "Deployed the latest changes to production.",
    reactions: { like: 10, love: 2, laugh: 0 },
    timestamp: "3h ago",
  },
  {
    id: 4,
    user: "team-lead",
    avatar: "T",
    color: "bg-orange-500",
    content: "Reviewed the project roadmap.",
    reactions: { like: 5, love: 1, laugh: 0 },
    timestamp: "4h ago",
  },
  {
    id: 5,
    user: "qa-bot",
    avatar: "Q",
    color: "bg-purple-500",
    content: "Created test cases for new features.",
    reactions: { like: 7, love: 3, laugh: 1 },
    timestamp: "5h ago",
  },
  {
    id: 6,
    user: "doc-writer",
    avatar: "D",
    color: "bg-blue-500",
    content: "Updated documentation for API endpoints.",
    reactions: { like: 4, love: 2, laugh: 0 },
    timestamp: "6h ago",
  },
  {
    id: 7,
    user: "security",
    avatar: "S",
    color: "bg-green-500",
    content: "Conducted security audit for the application.",
    reactions: { like: 6, love: 1, laugh: 0 },
    timestamp: "7h ago",
  },
];

export const QUICK_REACTIONS = ["❤️", "😂", "😮", "😢", "🔥", "🎉", "👀", "💯"];

export const COLOR_OPTIONS = [
  "bg-blue-400 text-blue-800",
  "bg-green-400 text-green-800",
  "bg-yellow-400 text-yellow-800",
  "bg-purple-400 text-purple-800",
  "bg-pink-400 text-pink-800",
  "bg-orange-400 text-orange-800",
  "bg-red-400 text-red-800",
  "bg-teal-400 text-teal-800",
  "bg-gray-400 text-gray-800",
  "bg-indigo-400 text-indigo-800",
];
export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate: string;
  createdAt: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "overdue";
  tags?: string[];
}
export const mockTasks: Task[] = [
  {
    id: "task-001",
    title: "Implement user authentication system",
    description:
      "Build a secure authentication system with JWT tokens, password hashing, and multi-factor authentication support.",
    assignedBy: {
      id: "user-manager-01",
      name: "Torvalds",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-dev-01",
      name: "Alex Chen",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "high",
    status: "in_progress",
    tags: ["backend", "security", "authentication"],
  },
  {
    id: "task-002",
    title: "Design dashboard wireframes",
    description:
      "Create detailed wireframes for the admin dashboard including user management, analytics, and reporting sections.",
    assignedBy: {
      id: "user-pm-01",
      name: "Mike Rodriguez",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-designer-01",
      name: "Emma Wilson",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "medium",
    status: "pending",
    tags: ["design", "wireframes", "dashboard", "UX"],
  },
  {
    id: "task-003",
    title: "Fix critical database performance issue",
    description:
      "Investigate and resolve the slow query performance affecting the user search functionality.",
    assignedBy: {
      id: "user-lead-01",
      name: "David Kim",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-dev-02",
      name: "Lisa Zhang",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "urgent",
    status: "overdue",
    tags: ["database", "performance", "backend", "critical"],
  },
  {
    id: "task-004",
    title: "Update project documentation",
    description:
      "Revise API documentation and add setup instructions for new team members.",
    assignedBy: {
      id: "user-manager-01",
      name: "Sarah Johnson",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-dev-03",
      name: "James Park",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "low",
    status: "pending",
    tags: ["documentation", "API", "onboarding"],
  },
  {
    id: "task-005",
    title: "Implement real-time notifications",
    description:
      "Build WebSocket-based notification system for instant updates across the application.",
    assignedBy: {
      id: "user-pm-01",
      name: "Mike Rodriguez",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-dev-01",
      name: "Alex Chen",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "medium",
    status: "completed",
    tags: ["frontend", "websocket", "notifications", "real-time"],
  },
  {
    id: "task-006",
    title: "Code review for payment integration",
    description:
      "Review the Stripe payment integration implementation and ensure PCI compliance standards.",
    assignedBy: {
      id: "user-lead-01",
      name: "David Kim",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-senior-01",
      name: "Rachel Thompson",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "high",
    status: "in_progress",
    tags: ["code-review", "payments", "security", "compliance"],
  },
  {
    id: "task-007",
    title: "Mobile app UI testing",
    description:
      "Conduct comprehensive UI testing on iOS and Android versions of the mobile application.",
    assignedBy: {
      id: "Torvalds",
      name: "Torvalds",
      avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    },
    assignedTo: {
      id: "user-qa-01",
      name: "iambnlvn",
      avatar: "https://avatars.githubusercontent.com/u/97989036?v=4",
    },
    dueDate: "2025-11-13T18:00:00Z",
    createdAt: "2025-11-06T13:45:00Z",
    priority: "medium",
    status: "pending",
    tags: ["testing", "mobile", "iOS", "android", "QA"],
  },
];

export const mockActivity = [
  {
    id: 1,
    user: "jessica-lee",
    action: "starred",
    target: "facebook/react",
    time: "2h ago",
    icon: Star,
    iconColor: "text-yellow-500",
  },
  {
    id: 2,
    user: "david-kim",
    action: "forked",
    target: "vercel/next.js",
    time: "4h ago",
    icon: GitFork,
    iconColor: "text-gray-500",
  },
  {
    id: 3,
    user: "dev-team",
    action: "pushed to",
    target: "main",
    context: "frontend-monorepo",
    time: "5h ago",
    icon: GitBranch,
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    user: "security-bot",
    action: "opened issue",
    target: "vulnerability-report",
    time: "1d ago",
    icon: CircleDot,
    iconColor: "text-red-500",
  },
  {
    id: 5,
    user: "sarah-dev",
    action: "merged PR",
    target: "#882",
    context: "design-system",
    time: "1d ago",
    icon: GitPullRequest,
    iconColor: "text-purple-500",
  },
];

import { Repository, Profile } from "@/types/profile";

export const mockRepositories: Repository[] = [
  {
    name: "gitrise",
    owner: "iambnlvn",
    description: "A modern GitHub clone built with Next.js and ShadcnUI",
    language: "TypeScript",
    stars: 48,
    forks: 12,
    isPrivate: false,
    updatedAt: "2 days ago",
    topics: ["nextjs", "react", "typescript", "shadcn"],
  },
  {
    name: "neural-commit-analyzer",
    owner: "iambnlvn",
    description:
      "AI-powered tool to analyze git commit patterns and provide insights",
    language: "Python",
    stars: 124,
    forks: 22,
    isPrivate: false,
    updatedAt: "1 week ago",
    topics: ["ai", "machine-learning", "git"],
  },
  {
    name: "devflow",
    owner: "iambnlvn",
    description: "Developer workflow automation toolkit",
    language: "Rust",
    stars: 72,
    forks: 8,
    isPrivate: false,
    updatedAt: "3 weeks ago",
    topics: ["cli", "developer-tools", "rust"],
  },
  {
    name: "config-files",
    owner: "iambnlvn",
    description: "Personal configuration files for various development tools",
    language: "Shell",
    stars: 32,
    forks: 5,
    isPrivate: false,
    updatedAt: "1 month ago",
    topics: ["dotfiles", "neovim", "tmux", "zsh"],
  },
];

export const starredRepositories: Repository[] = [
  {
    name: "next.js",
    description: "The React Framework",
    owner: "vercel",
    language: "TypeScript",
    stars: 112000,
    forks: 24500,
    isPrivate: false,
    updatedAt: "1 week ago",
    topics: ["react", "framework", "typescript"],
  },
  {
    name: "ziglang",
    description: "The Zig Programming Language",
    owner: "ziglang",
    language: "Zig",
    stars: 24800,
    forks: 2100,
    isPrivate: false,
    updatedAt: "2 days ago",
    topics: ["systems-programming", "language", "compiler"],
  },
];

export const recentActivity = [
  {
    type: "created",
    repo: "gitrise-core",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    type: "pushed",
    repo: "iambnlvn/neural-commit-analyzer",
    commits: 3,
    time: "1 day ago",
    color: "bg-blue-500",
  },
  {
    type: "starred",
    repo: "ziglang/zig",
    time: "2 days ago",
    color: "bg-yellow-500",
  },
  {
    type: "forked",
    repo: "neovim/neovim",
    time: "3 days ago",
    color: "bg-purple-500",
  },
];

export const mockUser: Profile = {
  id: "1",
  username: "iambnlvn",
  name: "Benaya Ilouz",
  email: "benaya@example.com",
  avatar: "https://avatars.githubusercontent.com/u/12345678",
  bio: "Software engineer passionate about open source and building developer tools",
  location: "Paris, France",
  website: "https://example.dev",
  company: "@acme",
  joinDate: "2020-01-15",
  followers: 284,
  following: 127,
  publicRepos: 26,
  starredRepos: 312,
  totalStars: 748,
  totalForks: 192,
  totalCommits: 2158,
  streak: 12,
  rank: "Gold",
  languages: [
    {
      name: "TypeScript",
      percentage: 42,
      color: "",
    },
    {
      name: "Python",
      percentage: 28,
      color: "",
    },
    {
      name: "Rust",
      percentage: 15,
      color: "",
    },
    {
      name: "Shell",
      percentage: 8,
      color: "",
    },
    {
      name: "Go",
      percentage: 7,
      color: "",
    },
  ],
};

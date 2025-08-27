export interface Profile {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  joinDate: string;
  followers: number;
  following: number;
  publicRepos: number;
  starredRepos: number;
  isFollowing?: boolean;
  isSponsoring?: boolean;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  streak: number;
  rank: string;
  languages: { name: string; percentage: number; color: string }[];
}

export interface DisplayConfig {
  showContributions?: boolean;
  showLanguages?: boolean;
  showStats?: boolean;
  showActivity?: boolean;
}

export interface UserProfileProps {
  user: Profile;
  isOwnProfile?: boolean;
  config?: DisplayConfig;
}

export interface CommitDay {
  date: string;
  count: number;
  level: number;
}

export interface Repository {
  name: string;
  owner: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: string;
  topics?: string[];
}

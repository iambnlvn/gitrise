"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RepositoryCard } from "@/components/layout/repository-card";
import {
  MapPin,
  LinkIcon,
  Calendar,
  Users,
  Star,
  Book,
  Building,
  UserPlus,
  Heart,
  Mail,
  Trophy,
  Zap,
  Code,
  Activity,
  Settings,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { mockRepositories } from "@/app/dashboard/constants/constants";

interface UserProfileProps {
  user: {
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
  };
  isOwnProfile?: boolean;
}

// Generate realistic commit data for the past year(thanks to chatgpt i got this for testing purposes only)
const generateCommitData = () => {
  const data = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create realistic patterns - more commits on weekdays, less on weekends
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseChance = isWeekend ? 0.3 : 0.7;

    // Add some randomness and seasonal patterns
    const seasonalMultiplier = Math.sin((i / 365) * Math.PI * 2) * 0.3 + 1;
    const randomFactor = Math.random();

    let count = 0;
    if (randomFactor < baseChance * seasonalMultiplier) {
      count = Math.floor(Math.random() * 8) + 1;
    }

    data.push({
      date: date.toISOString().split("T")[0],
      count,
      level:
        count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
    });
  }

  return data;
};

const starredRepos = [
  {
    name: "next.js",
    description: "The React Framework",
    owner: "vercel",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 1200,
    forks: 100,
    isPrivate: false,
    updatedAt: "1 week ago",
    topics: ["ai", "code-review", "typescript"],
  },
  {
    name: "ziglang",
    description: "The Zig Programming Language",
    owner: "ziglang",
    language: "Zig",
    languageColor: "#ec915c",
    stars: 800,
    forks: 50,
    isPrivate: false,
    updatedAt: "2 days ago",
    topics: ["low level programming", "systems programming", "zig"],
  },
];

export function UserProfile({ user, isOwnProfile = false }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [commitData] = useState(generateCommitData());
  const [animateSquares, setAnimateSquares] = useState(false);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [isSponsoring, setIsSponsoring] = useState(user.isSponsoring || false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimateSquares(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-gray-100 dark:bg-gray-800", // 0 contributions
      "bg-green-200 dark:bg-green-900", // 1-2 contributions
      "bg-green-400 dark:bg-green-700", // 3-4 contributions
      "bg-green-600 dark:bg-green-500", // 5-6 contributions
      "bg-green-800 dark:bg-green-300", // 7+ contributions
    ];
    return colors[level] || colors[0];
  };

  const totalContributions = commitData.reduce(
    (sum, day) => sum + day.count,
    0,
  );
  const currentStreak = user.streak || 12;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSponsor = () => {
    setIsSponsoring(!isSponsoring);
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar className="ring-primary/20 mx-auto mb-4 size-32 ring-4">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="from-primary to-secondary bg-gradient-to-br text-3xl text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <h1 className="mb-1 text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground mb-2">@{user.username}</p>

                {/* Rank Badge */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                  >
                    <Trophy className="mr-1 size-3" />
                    {user.rank} Developer
                  </Badge>
                </motion.div>
              </div>

              {user.bio && (
                <motion.p
                  className="mb-6 text-center text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {user.bio}
                </motion.p>
              )}

              {/* Action Buttons */}
              <div className="mb-6 space-y-3">
                {isOwnProfile ? (
                  <Link href="/settings/profile">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Settings className="mr-2 size-4" />
                      Edit profile
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={handleFollow}
                      className={`w-full ${isFollowing ? "bg-gray-600 hover:bg-gray-700" : "bg-primary hover:bg-primary/90"}`}
                    >
                      <UserPlus className="mr-2 size-4" />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSponsor}
                        className={
                          isSponsoring ? "border-pink-500 text-pink-500" : ""
                        }
                      >
                        <Heart
                          className={`size-4 ${isSponsoring ? "fill-pink-500" : ""}`}
                        />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="mb-6 space-y-3 text-sm">
                {user.company && (
                  <div className="flex items-center space-x-2">
                    <Building className="text-muted-foreground h-4 w-4" />
                    <span>{user.company}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="text-muted-foreground size-4" />
                    <a
                      href={user.website}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="text-muted-foreground size-4" />
                  <span>Joined {formatJoinDate(user.joinDate)}</span>
                </div>
              </div>

              {/* Social Stats */}
              <div className="flex items-center justify-between border-t pt-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="size-4" />
                  <span className="font-medium">
                    {user.followers.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">
                    {user.following.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">following</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Stats Card */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="mr-2 size-5 text-yellow-500" />
                Developer Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-primary text-2xl font-bold">
                    {user.totalStars.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Total Stars
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {user.totalForks.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Total Forks
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">
                    {user.totalCommits.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Total Commits
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">
                    {currentStreak}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Day Streak
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Languages */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Code className="mr-2 size-5" />
                Top Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div
                        className="mr-2 size-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-muted-foreground">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full rounded-full">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-card/50 mb-6 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2"
              >
                <Activity className="size-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="repositories"
                className="flex items-center space-x-2"
              >
                <Book className="size-4" />
                <span>Repositories</span>
                <Badge variant="secondary">{user.publicRepos}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="flex items-center space-x-2"
              >
                <Star className="size-4" />
                <span>Starred</span>
                <Badge variant="secondary">{user.starredRepos}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Contribution Graph */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>Contribution Activity</span>
                    <span className="text-muted-foreground text-sm font-normal">
                      {totalContributions.toLocaleString()} contributions in the
                      last year
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="mb-3 grid grid-cols-53 gap-1">
                      {commitData.map((day, index) => (
                        <motion.div
                          key={day.date}
                          className={`size-3 rounded-sm ${getContributionColor(day.level)} hover:ring-primary/50 cursor-pointer hover:ring-2`}
                          title={`${day.count} contributions on ${day.date}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            animateSquares
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                          }
                          transition={{
                            delay: animateSquares ? index * 0.001 : 0,
                            duration: 0.2,
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                      <span>Less</span>
                      <div className="flex items-center space-x-1">
                        <div className="size-3 rounded-sm bg-gray-100 dark:bg-gray-800" />
                        <div className="size-3 rounded-sm bg-green-200 dark:bg-green-900" />
                        <div className="size-3 rounded-sm bg-green-400 dark:bg-green-700" />
                        <div className="size-3 rounded-sm bg-green-600 dark:bg-green-500" />
                        <div className="size-3 rounded-sm bg-green-800 dark:bg-green-300" />
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
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
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-muted/50 flex items-start space-x-3 rounded-lg p-3 transition-colors"
                      >
                        <div
                          className={`size-2 rounded-full ${activity.color} mt-2`}
                        />
                        <div className="flex-1">
                          <p className="text-sm">
                            {activity.type === "created" &&
                              `Created repository `}
                            {activity.type === "pushed" &&
                              `Pushed ${activity.commits} commits to `}
                            {activity.type === "starred" && `Starred `}
                            {activity.type === "forked" && `Forked `}
                            <Link
                              href={`/${activity.repo}/${activity.repo}`}
                              className="text-primary font-medium hover:underline"
                            >
                              {activity.repo}
                            </Link>
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="repositories" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Public repositories</h2>
                {isOwnProfile && (
                  <Link href="/new">
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      New repository
                    </Button>
                  </Link>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {mockRepositories.map((repo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/${repo.owner}/${repo.name}`}>
                      <RepositoryCard
                        name={repo.name}
                        owner={repo.owner}
                        description={repo.description}
                        language={repo.language}
                        languageColor={repo.languageColor}
                        stars={repo.stars}
                        forks={repo.forks}
                        isPrivate={repo.isPrivate}
                        updatedAt={repo.updatedAt}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="starred" className="space-y-4">
              <h2 className="text-lg font-semibold">Starred repositories</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {starredRepos.map((repo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/${repo.owner}/${repo.name}`}>
                      <RepositoryCard
                        name={repo.name}
                        owner={repo.owner}
                        description={repo.description}
                        language={repo.language}
                        languageColor={repo.languageColor}
                        stars={repo.stars}
                        forks={repo.forks}
                        isPrivate={false}
                        updatedAt={repo.updatedAt}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

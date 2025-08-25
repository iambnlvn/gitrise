"use client";
import { useState } from "react";
import {
  Star,
  GitFork,
  Circle,
  Lock,
  Calendar,
  ChevronDown,
  ExternalLink,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getLanguageColor } from "@/utils/color-utils";

interface RepositoryCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  isPrivate?: boolean;
  updatedAt: string;
  watchers?: number;
  issues?: number;
  progress?: number;
  owner: string;
  branches?: number;
  isStarred?: boolean;
  isForked?: boolean;
  onStar?: (name: string) => Promise<void>;
  onFork?: (name: string) => Promise<void>;
}

export function RepositoryCard({
  name,
  description,
  language,
  stars,
  forks,
  isPrivate = false,
  updatedAt,
  owner = "user",
  isStarred = false,
  isForked = false,
  onStar = async () => {},
  onFork = async () => {},
}: RepositoryCardProps) {
  const [starred, setStarred] = useState(isStarred);
  const [forked, setForked] = useState(isForked);
  const [starCount, setStarCount] = useState(stars);
  const [forkCount, setForkCount] = useState(forks);
  const [isStarring, setIsStarring] = useState(false);
  const [isForking, setIsForking] = useState(false);
  const color = getLanguageColor(language);
  const handleStar = async () => {
    setIsStarring(true);
    try {
      await onStar(name);
      setStarred(!starred);
      setStarCount(starred ? starCount - 1 : starCount + 1);
    } finally {
      setIsStarring(false);
    }
  };

  const handleFork = async () => {
    setIsForking(true);
    try {
      await onFork(name);
      setForked(true);
      setForkCount(forkCount + 1);
    } finally {
      setIsForking(false);
    }
  };

  return (
    <TooltipProvider>
      <Card className="group border-border/60 hover:border-primary/20 border transition-all duration-200 hover:shadow-md">
        <CardContent className="p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="flex items-center font-medium">
                <Link
                  href={`/${owner}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {owner}/
                </Link>
                <Link
                  href={`/${owner}/${name}`}
                  className="text-primary ml-0.5 max-w-[150px] overflow-hidden font-bold text-ellipsis whitespace-nowrap transition-colors hover:underline sm:max-w-[200px]"
                >
                  {name}
                </Link>
              </h3>
              {isPrivate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="ml-1 border-amber-200 bg-amber-50/30 text-amber-700 dark:border-amber-800/30 dark:bg-amber-900/20 dark:text-amber-500"
                    >
                      <Lock className="mr-0.5 size-2.5" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    Only collaborators can access this repository
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <div className="ml-auto flex items-center gap-1 sm:ml-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={starred ? "secondary" : "outline"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={handleStar}
                    disabled={isStarring}
                  >
                    <Star
                      className={`mr-1 size-3.5 ${starred ? "fill-current text-yellow-500" : ""}`}
                    />
                    <span className="hidden sm:inline">
                      {starCount > 999
                        ? `${(starCount / 1000).toFixed(1)}k`
                        : starCount}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {starred ? "Unstar this repository" : "Star this repository"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={forked ? "secondary" : "outline"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={handleFork}
                    disabled={isForking || forked}
                  >
                    <GitFork className="mr-1 size-3.5" />
                    <span className="hidden sm:inline">{forkCount}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {forked ? "Already forked" : "Fork this repository"}
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="size-7 px-0">
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem className="cursor-pointer text-xs">
                    <ExternalLink className="mr-2 size-3.5" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-xs">
                    <Share2 className="mr-2 size-3.5" />
                    Copy URL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-muted-foreground mb-3 line-clamp-2 text-xs sm:text-sm">
              {description}
            </p>
          )}

          {/* Footer with language, forks and update date */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {language && (
                <div className="flex items-center gap-x-1">
                  <Circle
                    className="size-2.5 fill-current"
                    style={{ color: color }}
                  />
                  <span>{language}</span>
                </div>
              )}

              <div className="text-muted-foreground flex items-center gap-x-1">
                <Calendar className="size-3" />
                <span>{updatedAt}</span>
              </div>
            </div>

            <Link
              href={`/${owner}/${name}`}
              className="text-primary text-xs font-medium hover:underline"
            >
              View repository
            </Link>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

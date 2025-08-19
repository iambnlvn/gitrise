import { Star, GitFork, Circle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RepositoryCardProps {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  isPrivate?: boolean;
  updatedAt: string;
}

export function RepositoryCard({
  name,
  description,
  language,
  languageColor,
  stars,
  forks,
  isPrivate = false,
  updatedAt,
}: RepositoryCardProps) {
  return (
    <Card className="border-border transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-accent cursor-pointer font-semibold hover:underline">
              {name}
            </h3>
            {isPrivate && (
              <Badge variant="outline" className="text-xs">
                Private
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-xs"
          >
            <Star className="mr-1 h-3 w-3" />
            Star
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
          {description}
        </p>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Circle
                className="h-3 w-3 fill-current"
                style={{ color: languageColor }}
              />
              <span>{language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-3 w-3" />
              <span>{forks}</span>
            </div>
          </div>
          <span>Updated {updatedAt}</span>
        </div>
      </CardContent>
    </Card>
  );
}

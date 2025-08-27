import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  HeartHandshake,
  MoreHorizontal,
  UserMinus,
  UserPlus,
  UserRoundPlus,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Profile } from "@/types/profile";

interface ProfileActionsProps {
  user: Profile;
  isOwnProfile: boolean;
}

export function ProfileActions({ user, isOwnProfile }: ProfileActionsProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [isSponsoring, setIsSponsoring] = useState(user.isSponsoring || false);
  const [followersCount, setFollowersCount] = useState(user.followers);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowersCount(isFollowing ? followersCount - 1 : followersCount + 1);
  };

  const handleSponsor = () => {
    if (isSponsoring) {
      return;
    }

    setIsSponsoring(true);
  };

  if (isOwnProfile) {
    return (
      <div className="mb-6 flex justify-center">
        <Button className="w-full" variant="outline" size="sm">
          Edit profile
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="mb-6 flex space-x-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Button
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        className="flex-1"
        onClick={handleFollow}
      >
        {isFollowing ? (
          <>
            <UserMinus className="mr-2 size-4" />
            Unfollow
          </>
        ) : (
          <>
            <UserPlus className="mr-2 size-4" />
            Follow
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`${
          isSponsoring
            ? "border-pink-500 text-pink-500 hover:border-pink-600 hover:text-pink-600"
            : ""
        }`}
        onClick={handleSponsor}
      >
        <HeartHandshake
          className={`mr-2 size-4 ${isSponsoring ? "fill-pink-500" : ""}`}
        />
        {isSponsoring ? "Sponsoring" : "Sponsor"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Mail className="mr-2 size-4" />
            Send message
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRoundPlus className="mr-2 size-4" />
            Block user
          </DropdownMenuItem>
          <DropdownMenuItem>Report abuse</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

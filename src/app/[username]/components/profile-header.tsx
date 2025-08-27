import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { Profile } from "@/types/profile";

interface ProfileHeaderProps {
  user: Profile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
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
    </div>
  );
}

import { motion } from "framer-motion";
import Link from "next/link";
import { Building, Calendar, Globe, Mail, MapPin } from "lucide-react";
import { Profile } from "@/types/profile";

interface ProfileDetailsProps {
  user: Profile;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-3">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href={`/${user.username}/followers`}
            className="hover:text-primary flex items-center transition-colors"
          >
            <span className="font-semibold">
              {user.followers.toLocaleString()}
            </span>
            <span className="text-muted-foreground ml-1">followers</span>
          </Link>
        </motion.div>
        <span className="text-muted-foreground">·</span>
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href={`/${user.username}/following`}
            className="hover:text-primary flex items-center transition-colors"
          >
            <span className="font-semibold">
              {user.following.toLocaleString()}
            </span>
            <span className="text-muted-foreground ml-1">following</span>
          </Link>
        </motion.div>
      </div>

      <div className="text-muted-foreground space-y-3 text-sm">
        {user.bio && (
          <motion.p
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {user.bio}
          </motion.p>
        )}

        {/* Personal details */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {user.company && (
            <div className="flex items-center">
              <Building className="mr-2 size-4" />
              <span>{user.company}</span>
            </div>
          )}

          {user.location && (
            <div className="flex items-center">
              <MapPin className="mr-2 size-4" />
              <span>{user.location}</span>
            </div>
          )}

          {user.email && (
            <div className="flex items-center">
              <Mail className="mr-2 size-4" />
              <a
                href={`mailto:${user.email}`}
                className="hover:text-primary transition-colors"
              >
                {user.email}
              </a>
            </div>
          )}

          {user.website && (
            <div className="flex items-center">
              <Globe className="mr-2 size-4" />
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary truncate transition-colors"
              >
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="mr-2 size-4" />
            <span>Joined {formatDate(user.joinDate)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Format like "Jan 15, 2020"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

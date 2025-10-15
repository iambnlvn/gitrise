import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { useProfileStore } from "@/store/profile-store";
import { toast } from "sonner";

interface ProfileAvatarProps {
  email: string;
  fullName?: string;
}

export function ProfileAvatar({ email, fullName }: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    profileImage,
    isUploading,
    setProfileImage,
    setIsUploading,
    setShowRemoveDialog,
  } = useProfileStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.", {
        description: "Please choose a smaller file.",
      });
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
        toast.success("Profile picture updated!", {
          description: "Your new avatar has been uploaded.",
        });
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const hasCustomImage =
    profileImage && profileImage !== email.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="group relative cursor-pointer">
            <Avatar className="border-border/50 hover:border-primary/50 size-32 border-2 shadow-lg transition-all duration-300 hover:shadow-xl">
              <AvatarImage
                src={profileImage || "/placeholder.svg"}
                alt={fullName || "User Avatar"}
              />
              <AvatarFallback className="bg-primary text-xl font-bold text-white">
                {email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isUploading && (
              <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-full backdrop-blur-sm">
                <Loader2 className="text-primary size-6 animate-spin" />
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="cursor-pointer gap-2"
          >
            <Upload className="size-4" />
            Upload New Picture
          </DropdownMenuItem>
          {hasCustomImage && (
            <DropdownMenuItem
              onClick={() => setShowRemoveDialog(true)}
              disabled={isUploading}
              className="text-destructive focus:text-destructive cursor-pointer gap-2"
            >
              <Trash2 className="size-4" />
              Remove Picture
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <p className="text-muted-foreground text-xs">JPG, PNG or GIF. Max 2MB.</p>
    </div>
  );
}

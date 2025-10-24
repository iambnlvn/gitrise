"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProfileStore } from "@/store/profile-store";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface RemoveImageDialogProps {
  userEmail: string;
}

export function RemoveImageDialog({ userEmail }: RemoveImageDialogProps) {
  const { showRemoveDialog, setShowRemoveDialog, setProfileImage } =
    useProfileStore();
  const [isRemoving, setIsRemoving] = useState(false);
  const isMobile = useIsMobile();
  const handleRemoveImage = async () => {
    setIsRemoving(true);

    try {
      // Simulate API call to remove image
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset to default avatar (first letter of email)
      setProfileImage(userEmail.charAt(0).toUpperCase());

      toast.success("Profile picture removed!", {
        description: "Your avatar has been reset to default.",
      });
    } catch {
      toast.error("Failed to remove profile picture", {
        description: "Please try again later.",
      });
    } finally {
      setIsRemoving(false);
      setShowRemoveDialog(false);
    }
  };

  if (isMobile) {
    return (
      <Drawer open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Remove Profile Picture</DrawerTitle>
            <DrawerDescription>
              Are you sure you want to remove your profile picture? Your avatar
              will be reset to the default initial based on your email address.
              You can upload a new picture at any time.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <Button
              variant="outline"
              onClick={() => setShowRemoveDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRemoveImage}
              disabled={isRemoving}
            >
              {isRemoving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Remove
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="text-destructive size-5" />
            Remove Profile Picture
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Are you sure you want to remove your profile picture?</p>
            <span className="text-muted-foreground text-sm">
              Your avatar will be reset to the default initial based on your
              email address. You can upload a new picture at any time.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemoveImage}
            disabled={isRemoving}
            className="bg-destructive hover:bg-destructive/90 gap-2"
          >
            {isRemoving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Remove
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

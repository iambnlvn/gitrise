import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, X } from "lucide-react";
import { useProfileStore } from "@/store/profile-store";
import { toast } from "sonner";

interface UsernameInputProps {
  originalUsername: string;
}

export function UsernameInput({ originalUsername }: UsernameInputProps) {
  const {
    formData,
    usernameStatus,
    validationErrors,
    updateField,
    setUsernameStatus,
  } = useProfileStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const username = formData.username || "";

    // Reset status if empty
    if (!username) {
      setUsernameStatus("idle");
      return;
    }

    // If same as original, it's available (no need to check)
    if (username === originalUsername) {
      setUsernameStatus("idle");
      return;
    }

    // Don't check if there are validation errors
    if (validationErrors.username) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");

    timeoutRef.current = setTimeout(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockTakenUsernames = ["admin", "test", "user", "demo"];
        const isAvailable = !mockTakenUsernames.includes(
          username.toLowerCase(),
        );
        setUsernameStatus(isAvailable ? "available" : "taken");
      } catch {
        setUsernameStatus("idle");
        toast.error("Failed to check username availability", {
          description: "Please try again later.",
        });
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    formData.username,
    originalUsername,
    setUsernameStatus,
    validationErrors.username,
  ]);
  return (
    <div className="space-y-2">
      <Label htmlFor="username" className="text-sm font-medium">
        Username
      </Label>
      <div className="relative">
        <Input
          id="username"
          placeholder="johndoe"
          value={formData.username || ""}
          onChange={(e) => updateField("username", e.target.value)}
          className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border pr-10 transition-all duration-200 ${
            validationErrors.username || usernameStatus === "taken"
              ? "border-red-500"
              : ""
          } ${usernameStatus === "available" ? "border-emerald-500" : ""}`}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {usernameStatus === "checking" && (
            <Loader2 className="text-primary size-4 animate-spin" />
          )}
          {usernameStatus === "available" && (
            <Check className="size-4 text-emerald-500" />
          )}
          {usernameStatus === "taken" && <X className="size-4 text-red-500" />}
        </div>
      </div>
      {validationErrors.username && (
        <p className="text-xs text-red-500">{validationErrors.username}</p>
      )}
      {!validationErrors.username && usernameStatus === "available" && (
        <p className="animate-in fade-in text-xs text-emerald-500/80 duration-200">
          Username is available
        </p>
      )}
      {!validationErrors.username && usernameStatus === "taken" && (
        <p className="animate-in fade-in text-xs text-red-500/80 duration-200">
          Username is already taken
        </p>
      )}
      <p className="text-muted-foreground text-xs">
        3-20 characters, letters, numbers, hyphens and underscores only
      </p>
    </div>
  );
}

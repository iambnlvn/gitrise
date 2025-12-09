"use client";
//TODO!: redesign urgently
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPLETION_ITEMS } from "../constants";
import { useWizardStore } from "@/app/stores/wizard-store";

export function MissionReadyStep() {
  const data = useWizardStore((state) => state.data);
  const router = useRouter();
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  useEffect(() => {
    COMPLETION_ITEMS.forEach((item, index) => {
      setTimeout(
        () => {
          setCompletedItems((prev) => [...prev, item.id]);
        },
        300 * (index + 1),
      );
    });
  }, []);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="bg-background mx-auto mb-4 flex size-20 items-center justify-center rounded-full"
        >
          <PartyPopper className="size-10 text-emerald-600" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-foreground text-2xl font-semibold"
        >
          You&apos;re All Set!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-2"
        >
          System online. Your deck is fully operational.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto max-w-sm space-y-3"
      >
        {COMPLETION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isComplete = completedItems.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isComplete ? 1 : 0.4,
                x: 0,
              }}
              className={cn(
                "flex items-center gap-4 rounded-xl border p-4 transition-all",
                isComplete ? "bg-emerald-50" : "bg-gray-50",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                  isComplete
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-400",
                )}
              >
                {isComplete ? (
                  <CheckCircle className="size-5" />
                ) : (
                  <Icon className="size-5" />
                )}
              </div>
              <span
                className={cn(
                  "font-medium",
                  isComplete ? "text-gray-900" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="bg-background shadow-mute mx-auto max-w-sm rounded-xl border border-gray-200 p-6 shadow-md"
      >
        <div className="text-center">
          <h3 className="font-semibold text-gray-900">
            Welcome, {data.neuralId.displayName || "Operator"}!
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Your workspace{" "}
            <span className="text-primary font-mono font-medium">
              {data.nodeInit.workspaceName ||
                data.nodeInit.projectName ||
                "untitled"}
            </span>{" "}
            is ready. Start building something amazing.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex justify-center pt-4"
      >
        <Button size="lg" onClick={handleGoToDashboard} className="gap-3">
          Go to Dashboard
          <ArrowRight className="size-5" />
        </Button>
      </motion.div>
    </div>
  );
}

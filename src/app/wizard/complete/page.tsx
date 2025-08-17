"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  Sparkles,
  Rocket,
  Code,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useWizardStore } from "@/app/store/wizard-store";
import type { CompletionState } from "../components/types";

type SetupStepProps = {
  label: string;
  completed: boolean;
};

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  desc: string;
};

const SetupStep = ({ label, completed }: SetupStepProps) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex size-5 items-center justify-center rounded-full border ${
        completed ? "border-primary bg-primary text-white" : "border-slate-300"
      }`}
    >
      {completed && <CheckCircle className="size-3" />}
    </div>
    <span
      className={`text-sm ${completed ? "text-slate-900" : "text-muted-foreground"}`}
    >
      {label}
    </span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <Icon className="text-primary mx-auto mb-2 size-6" />
    <h3 className="mb-1 font-medium text-slate-900">{title}</h3>
    <p className="text-muted-foreground text-xs">{desc}</p>
  </div>
);

const LoadingState = ({ progress }: { progress: number }) => (
  <div className="text-center">
    <div className="mb-6 flex items-center justify-center">
      <div className="bg-primary/10 relative rounded-full p-3">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    </div>

    <CardTitle className="mb-2 text-2xl font-bold">
      Setting up your workspace
    </CardTitle>
    <CardDescription className="mb-6 text-lg">
      We&apos;re personalizing GitRise based on your preferences...
    </CardDescription>

    {/* Progress bar */}
    <div className="mx-auto mb-6 w-full">
      <Progress value={progress} className="h-2" />
      <p className="text-muted-foreground mt-2 text-sm">{progress}% Complete</p>
    </div>

    {/* Processing steps */}
    <div className="mx-auto mt-6 max-w-sm space-y-3 text-left">
      {[
        { label: "Analyzing your preferences", completed: progress >= 20 },
        { label: "Setting up your dashboard", completed: progress >= 40 },
        { label: "Configuring integrations", completed: progress >= 60 },
        { label: "Preparing your workspace", completed: progress >= 80 },
        { label: "Finalizing setup", completed: progress >= 100 },
      ].map((step, index) => (
        <SetupStep key={index} label={step.label} completed={step.completed} />
      ))}
    </div>
  </div>
);

const SuccessState = ({ onContinue }: { onContinue: () => void }) => (
  <div className="text-center">
    <div className="mb-6 flex items-center justify-center">
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle className="size-8 text-green-600" />
      </div>
    </div>

    <CardTitle className="mb-2 text-2xl font-bold">
      Welcome to GitRise! 🎉
    </CardTitle>
    <CardDescription className="mb-6 text-lg">
      Your workspace is ready. Let&apos;s start building amazing things
      together!
    </CardDescription>

    {/* Success features */}
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {[
        {
          icon: Rocket,
          title: "Dashboard Ready",
          desc: "Your personalized workspace",
        },
        {
          icon: Code,
          title: "Tools Configured",
          desc: "Based on your preferences",
        },
        {
          icon: Sparkles,
          title: "AI Powered",
          desc: "Smart recommendations enabled",
        },
      ].map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          desc={feature.desc}
        />
      ))}
    </div>

    <div className="mt-8 border-t pt-6">
      <Button onClick={onContinue} className="min-w-[150px]">
        Enter Dashboard
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  </div>
);

const ErrorState = ({
  onRetry,
  onSkip,
}: {
  onRetry: () => void;
  onSkip: () => void;
}) => (
  <div className="text-center">
    <div className="mb-6 flex items-center justify-center">
      <div className="rounded-full bg-red-100 p-3">
        <AlertCircle className="size-8 text-red-600" />
      </div>
    </div>

    <CardTitle className="mb-2 text-2xl font-bold">Setup Incomplete</CardTitle>
    <CardDescription className="mb-6 text-lg">
      We encountered an issue while setting up your workspace. Don&apos;t worry,
      we can try again!
    </CardDescription>

    <div className="mt-8 flex justify-center gap-4 border-t pt-6">
      <Button variant="outline" onClick={onSkip}>
        Skip Setup
      </Button>
      <Button onClick={onRetry}>
        <RefreshCw className="mr-2 size-4" />
        Try Again
      </Button>
    </div>
  </div>
);

export default function OnboardingCompletePage() {
  const [state, setState] = useState<CompletionState>("loading");
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { resetWizard: resetStore } = useWizardStore();

  useEffect(() => {
    const processOnboarding = async () => {
      try {
        // Process steps sequentially
        const progressSteps = [20, 40, 60, 80, 100];
        for (const step of progressSteps) {
          await new Promise((resolve) => setTimeout(resolve, 400));
          setProgress(step);
        }

        // Simulate api
        await new Promise((resolve) => setTimeout(resolve, 800));

        setState("success");
        // Reset store after successful completion
        setTimeout(() => resetStore(), 3000);
      } catch {
        setState("error");
      }
    };

    processOnboarding();
  }, [resetStore]);

  // Handlers
  const handleContinue = () => router.push("/dashboard");

  const handleRetry = () => {
    setState("loading");
    setProgress(0);
    setTimeout(() => router.refresh(), 500);
  };

  const handleSkip = () => router.push("/dashboard");

  const renderStateComponent = () => {
    switch (state) {
      case "loading":
        return <LoadingState progress={progress} />;
      case "success":
        return <SuccessState onContinue={handleContinue} />;
      case "error":
        return <ErrorState onRetry={handleRetry} onSkip={handleSkip} />;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/95 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-2 text-center">
            <Progress value={100} className="h-2" />
            <p className="text-muted-foreground mt-2 text-sm">Setup Complete</p>
          </CardHeader>

          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {renderStateComponent()}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OnboardingWizardProps } from "./types";
import { useWizardStore } from "@/app/store/wizard-store";
import { STEPS } from "./constants";
import { PersonalInfoStep } from "./steps/personal-info-step";
import DeveloperProfileStep from "@/app/wizard/components/steps/dev-profile-step";
import { InterestsGoalsStep } from "./steps/interests-step";
import { PreferencesStep } from "./steps/preferences-step";
import { useRouter } from "next/navigation";

export function WizardLayout({ onComplete, onSkip }: OnboardingWizardProps) {
  const { currentStep, data, nextStep, prevStep } = useWizardStore();
  const router = useRouter();
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return data.fullName.trim() !== "" && data.username.trim() !== "";
      case 1:
        return data.experienceLevel !== "" && data.primaryRole !== "";
      case 2:
        return data.primaryGoal !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      nextStep();
    } else {
      onComplete(data);
      router.push("/wizard/complete");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <DeveloperProfileStep />;
      case 2:
        return <InterestsGoalsStep />;
      case 3:
        return <PreferencesStep />;
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-white/95 shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-2 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <StepIcon className="text-primary size-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {currentStepData.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {currentStepData.description}
            </CardDescription>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-muted-foreground mt-2 text-sm">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {renderStep()}

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 size-4" />
                    Previous
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={onSkip}
                  className="text-muted-foreground"
                >
                  Skip for now
                </Button>
              </div>

              <Button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                className="min-w-[120px]"
              >
                {currentStep === STEPS.length - 1 ? "Complete Setup" : "Next"}
                {currentStep < STEPS.length - 1 && (
                  <ChevronRight className="ml-2 size-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

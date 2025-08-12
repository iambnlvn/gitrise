export interface WizardData {
  fullName: string;
  username: string;
  bio: string;
  location: string;
  company: string;
  website: string;

  experienceLevel: string;
  primaryRole: string;
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  interests: string[];

  theme: string;
  codeEditor: string;
  workflowPreference: string;
  collaborationStyle: string;

  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  securityAlerts: boolean;

  primaryGoal: string;
  projectTypes: string[];
  teamSize: string;
}

export interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  fields: Array<keyof WizardData>;
}

export interface OnboardingWizardProps {
  onComplete: (data: WizardData) => void;
  onSkip: () => void;
}

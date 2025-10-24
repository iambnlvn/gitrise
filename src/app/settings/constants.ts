import {
  Bell,
  Code,
  CreditCard,
  Lock,
  Palette,
  Shield,
  User,
} from "lucide-react";
import { SettingsSection } from "./components/shared/types";

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    path: "/settings/profile",
    label: "Profile",
    icon: User,
    description: "Personal information",
  },
  {
    path: "/settings/appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme & layout",
  },
  {
    path: "/settings/notifications",
    label: "Notifications",
    icon: Bell,
    description: "Email & alerts",
  },
  {
    path: "/settings/security",
    label: "Security",
    icon: Shield,
    description: "Password & auth",
  },
  {
    path: "/settings/billing",
    label: "Billing",
    icon: CreditCard,
    description: "Payment & plans",
  },
  {
    path: "/settings/developer",
    label: "Developer",
    icon: Code,
    description: "API & tokens",
  },
  {
    path: "/settings/privacy",
    label: "Privacy",
    icon: Lock,
    description: "Data & privacy",
  },
];

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Palette,
  Bell,
  Shield,
  CreditCard,
  Code,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SettingsCategory {
  id: string;
  path: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  accentColor: string;
}

const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: "profile",
    path: "/settings/profile",
    label: "Profile",
    description:
      "Manage your personal information, avatar, bio, and professional details",
    icon: User,
    badge: "Complete",
    accentColor: "from-violet-500 to-purple-600",
  },
  {
    id: "security",
    path: "/settings/security",
    label: "Security",
    description:
      "Two-factor authentication, sessions, trusted devices, and security keys",
    icon: Shield,
    badge: "2FA Active",
    accentColor: "from-red-500 to-pink-600",
  },
  {
    id: "appearance",
    path: "/settings/appearance",
    label: "Appearance",
    description:
      "Theme preferences, color schemes, layout density, and visual customization",
    icon: Palette,
    accentColor: "from-blue-500 to-cyan-600",
  },
  {
    id: "notifications",
    path: "/settings/notifications",
    label: "Notifications",
    description:
      "Email alerts, push notifications, and communication preferences",
    icon: Bell,
    accentColor: "from-yellow-500 to-orange-600",
  },
  {
    id: "billing",
    path: "/settings/billing",
    label: "Billing & Plans",
    description:
      "Subscription management, payment methods, invoices, and usage",
    icon: CreditCard,
    badge: "Pro Plan",
    accentColor: "from-green-500 to-emerald-600",
  },
  {
    id: "developer",
    path: "/settings/developer",
    label: "Developer",
    description:
      "API access tokens, webhooks, OAuth apps, and integration settings",
    icon: Code,
    accentColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "privacy",
    path: "/settings/privacy",
    label: "Privacy",
    description:
      "Data sharing controls, visibility settings, and GDPR compliance",
    icon: Lock,
    accentColor: "from-gray-500 to-slate-600",
  },
];

const QUICK_STATS = [
  {
    label: "Account Status",
    value: "Active",
    icon: Activity,
    color: "text-green-500",
  },
  {
    label: "Security Score",
    value: "95/100",
    icon: Shield,
    color: "text-violet-500",
  },
  {
    label: "Last Login",
    value: "2 hours ago",
    icon: TrendingUp,
    color: "text-blue-500",
  },
];

function SettingCard({
  item,
  index,
}: {
  item: SettingsCategory;
  index: number;
}) {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.path}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <Card className="bg-card border-border hover:border-primary/50 hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom-4 relative h-full overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
        <div
          className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${item.accentColor} transition-all duration-500 ${
            isHovered ? "h-2 opacity-100" : "opacity-60"
          }`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} transition-all duration-700 ${
            isHovered ? "opacity-5" : "opacity-0"
          }`}
        />

        <div className="relative p-8">
          <div className="mb-6 flex items-start justify-between">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} rounded-2xl blur-xl transition-all duration-500 ${
                  isHovered ? "scale-110 opacity-60" : "opacity-20"
                }`}
              />
              <div className="bg-card border-border group-hover:border-primary/30 relative rounded-2xl border p-4 transition-all duration-300 group-hover:scale-110">
                <Icon className="text-primary h-8 w-8 transition-transform duration-300 group-hover:rotate-6" />
              </div>
            </div>
            {item.badge && (
              <span className="bg-primary/10 text-primary border-primary/20 animate-in fade-in zoom-in-50 rounded-full border px-3 py-1 text-xs font-semibold duration-300">
                {item.badge}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground group-hover:text-primary text-xl font-bold transition-colors duration-300">
                {item.label}
              </h3>
              <ArrowRight
                className={`text-muted-foreground group-hover:text-primary h-5 w-5 transition-all duration-300 ${
                  isHovered
                    ? "translate-x-2 opacity-100"
                    : "translate-x-0 opacity-0"
                }`}
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <div
            className={`border-border mt-6 border-t pt-4 transition-all duration-300 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
          >
            <span className="text-primary flex items-center gap-1 text-xs font-medium">
              Configure <Zap className="size-3 animate-pulse" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function QuickStatCard({
  stat,
  index,
}: {
  stat: (typeof QUICK_STATS)[0];
  index: number;
}) {
  const Icon = stat.icon;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Card
      className={`bg-card border-border hover:border-primary/30 hover:shadow-primary/10 border p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
        isVisible ? "animate-in fade-in slide-in-from-left-4" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 hover:bg-primary/20 rounded-xl p-3 transition-all duration-300 hover:scale-110">
          <Icon
            className={`size-6 ${stat.color} transition-transform duration-300 hover:rotate-12`}
          />
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {stat.label}
          </p>
          <p className="text-foreground text-xl font-bold">{stat.value}</p>
        </div>
      </div>
    </Card>
  );
}

export default function SettingsOverviewPage() {
  const [sparkleFloat, setSparkleFloat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkleFloat((prev) => (prev + 1) % 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="from-primary/5 via-background to-background border-border relative overflow-hidden border-b bg-gradient-to-br">
        <div className="bg-grid-white/5 absolute inset-0 animate-pulse [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="bg-primary/10 absolute top-20 right-20 size-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-secondary/10 absolute bottom-20 left-20 size-96 animate-pulse rounded-full blur-3xl delay-1000" />

        <div className="animate-in fade-in slide-in-from-bottom-8 relative px-6 py-16 duration-700 sm:px-12 lg:px-16 lg:py-24">
          <div className="max-w-4xl">
            <div className="bg-primary/10 border-primary/20 animate-in fade-in zoom-in-50 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 duration-500">
              <Sparkles
                className="text-primary size-4"
                style={{
                  transform: `translateY(${Math.sin(sparkleFloat / 3) * 2}px)`,
                  transition: "transform 0.1s linear",
                }}
              />
              <span className="text-primary text-sm font-medium">
                Account Settings
              </span>
            </div>
            <h1 className="text-foreground animate-in fade-in slide-in-from-bottom-6 mb-6 text-5xl font-bold text-balance delay-100 duration-700 lg:text-6xl">
              Customize Your Experience
            </h1>
            <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-4 max-w-2xl text-xl leading-relaxed text-pretty delay-200 duration-700">
              Manage your profile, security, preferences, and integrations all
              in one place. Fine-tune every aspect of your account.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-10">
        <div className="mb-10">
          <h2 className="text-muted-foreground animate-in fade-in slide-in-from-left-4 mb-6 text-sm font-semibold tracking-wider uppercase">
            Quick Overview
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {QUICK_STATS.map((stat, index) => (
              <QuickStatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-muted-foreground animate-in fade-in slide-in-from-left-4 mb-6 text-sm font-semibold tracking-wider uppercase">
              All Settings
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
              {SETTINGS_CATEGORIES.map((category, index) => (
                <SettingCard key={category.id} item={category} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-border animate-in fade-in slide-in-from-bottom-4 mt-20 border-t pt-12 duration-700">
          <Card className="from-primary/5 to-background border-primary/20 hover:border-primary/40 hover:shadow-primary/10 border bg-gradient-to-br p-8 transition-all duration-500 hover:shadow-2xl lg:p-12">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="flex-1">
                <h3 className="text-foreground mb-3 text-2xl font-bold">
                  Need Help?
                </h3>
                <p className="text-muted-foreground text-lg">
                  Our documentation and support team are here to assist you with
                  any questions.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary/10 min-w-[140px] bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Documentation
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 hover:shadow-primary/30 min-w-[140px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

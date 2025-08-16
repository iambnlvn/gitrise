"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Sun,
  Moon,
  Code,
  Target,
  Users,
  Bell,
  Mail,
  Coffee,
  Settings,
  Zap,
  Clock,
  Shield,
  Palette,
  GitBranch,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useWizardStore } from "@/app/store/wizard-store";

const THEMES = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    desc: "Bright and clean",
    color: "from-yellow-400 to-orange-400",
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    desc: "Easy on the eyes",
    color: "from-purple-600 to-blue-600",
  },

  {
    value: "auto",
    label: "Auto Switch",
    icon: Clock,
    desc: "Light by day, dark by night",
    color: "from-indigo-500 to-purple-500",
  },
];

const CODE_EDITORS = [
  { value: "vscode", label: "VS Code", icon: "💙", popularity: 95 },
  { value: "webstorm", label: "WebStorm", icon: "🧠", popularity: 75 },
  { value: "neovim", label: "Neovim", icon: "🔥", popularity: 60 },
  { value: "sublime", label: "Sublime Text", icon: "✨", popularity: 45 },
  { value: "cursor", label: "Cursor", icon: "🎯", popularity: 80 },
  { value: "zed", label: "Zed", icon: "⚡", popularity: 35 },
  { value: "vim", label: "Vim", icon: "🗡️", popularity: 55 },
  { value: "emacs", label: "Emacs", icon: "🎭", popularity: 25 },
];

const WORKFLOWS = [
  {
    value: "agile",
    label: "Agile/Scrum",
    desc: "Sprint-based development",
    icon: "🏃‍♂️",
    color: "from-green-500 to-emerald-500",
  },
  {
    value: "kanban",
    label: "Kanban",
    desc: "Continuous flow",
    icon: "📋",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "waterfall",
    label: "Waterfall",
    desc: "Sequential phases",
    icon: "🌊",
    color: "from-indigo-500 to-blue-500",
  },
  {
    value: "flexible",
    label: "Flexible/Adaptive",
    desc: "Mix and match",
    icon: "🔄",
    color: "from-purple-500 to-pink-500",
  },
];

const COLLABORATION_STYLES = [
  {
    value: "frequent",
    label: "Frequent Check-ins",
    desc: "Regular sync meetings",
    icon: "📞",
    color: "from-orange-500 to-red-500",
  },
  {
    value: "async",
    label: "Async Communication",
    desc: "Written updates",
    icon: "💬",
    color: "from-teal-500 to-green-500",
  },
  {
    value: "independent",
    label: "Independent Work",
    desc: "Minimal interruptions",
    icon: "🎯",
    color: "from-violet-500 to-purple-500",
  },
  {
    value: "pair",
    label: "Pair Programming",
    desc: "Code together",
    icon: "👥",
    color: "from-pink-500 to-rose-500",
  },
];

const ADVANCED_PREFERENCES = [
  {
    key: "autoSave",
    label: "Auto-save preferences",
    desc: "Automatically save your work",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
  },
  {
    key: "darkModeSchedule",
    label: "Smart dark mode scheduling",
    desc: "Switch themes based on time",
    icon: Clock,
    color: "from-indigo-500 to-purple-500",
  },
  {
    key: "advancedGitIntegration",
    label: "Advanced Git integration",
    desc: "Enhanced Git workflow features",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
  },
  {
    key: "aiAssistance",
    label: "AI-powered assistance",
    desc: "Smart code suggestions and help",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
];

const NOTIFICATIONS = [
  {
    key: "emailNotifications",
    label: "Email notifications for important updates",
    icon: Mail,
    desc: "Get notified via email",
    color: "from-blue-500 to-cyan-500",
    priority: "high",
  },
  {
    key: "pushNotifications",
    label: "Push notifications for mentions and reviews",
    icon: Bell,
    desc: "Real-time alerts",
    color: "from-purple-500 to-pink-500",
    priority: "medium",
  },
  {
    key: "weeklyDigest",
    label: "Weekly digest of activity",
    icon: Coffee,
    desc: "Summary emails",
    color: "from-orange-500 to-red-500",
    priority: "low",
  },
  {
    key: "securityAlerts",
    label: "Security alerts (recommended)",
    icon: Settings,
    desc: "Important security updates",
    color: "from-green-500 to-emerald-500",
    priority: "critical",
  },
];

export function PreferencesStep() {
  const { data, updateField } = useWizardStore();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hoveredEditor, setHoveredEditor] = useState<string | null>(null);

  const productivityLevel = data.productivityLevel || 50;

  return (
    <div className="space-y-10">
      {/* Theme Selection with Enhanced Animation */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
            <Palette className="text-primary size-6" />
          </div>
          <div>
            <Label className="text-xl font-bold">Visual Preferences</Label>
            <p className="text-muted-foreground text-sm">
              Customize your visual experience
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {THEMES.map((theme, index) => {
            const IconComponent = theme.icon;
            const isSelected = data.theme === theme.value;
            return (
              <motion.div
                key={theme.value}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  type: "spring",
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 ${
                  isSelected
                    ? `border-primary bg-gradient-to-br ${theme.color} bg-opacity-20 shadow-xl`
                    : "border-border hover:border-primary/50 hover:shadow-lg"
                }`}
                onClick={() => updateField("theme", theme.value)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10 space-y-3 text-center">
                  <motion.div
                    className={`mx-auto rounded-xl bg-gradient-to-r p-3 ${theme.color} bg-opacity-30`}
                    animate={{ rotate: isSelected ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="text-primary size-6" />
                  </motion.div>
                  <div>
                    <div className="font-semibold">{theme.label}</div>
                    <div className="text-muted-foreground text-xs">
                      {theme.desc}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Star className="text-primary size-4 fill-current" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Code Editor with Popularity Indicators */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
            <Code className="text-primary size-6" />
          </div>
          <div>
            <Label className="text-xl font-bold">Development Environment</Label>
            <p className="text-muted-foreground text-sm">
              Choose your coding companion
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CODE_EDITORS.map((editor, index) => {
            const isSelected = data.codeEditor === editor.value;
            const isHovered = hoveredEditor === editor.value;
            return (
              <motion.div
                key={editor.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border hover:border-primary/50 hover:shadow-md"
                }`}
                onClick={() => updateField("codeEditor", editor.value)}
                onMouseEnter={() => setHoveredEditor(editor.value)}
                onMouseLeave={() => setHoveredEditor(null)}
              >
                <div className="space-y-3 text-center">
                  <motion.div
                    className="text-3xl"
                    animate={{ scale: isSelected || isHovered ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {editor.icon}
                  </motion.div>
                  <div>
                    <div className="font-medium">{editor.label}</div>
                    <div className="text-muted-foreground text-xs">
                      {editor.popularity}% popularity
                    </div>
                  </div>
                  {/* Popularity bar */}
                  <div className="bg-muted h-1.5 w-full rounded-full">
                    <motion.div
                      className="from-primary to-primary/60 h-1.5 rounded-full bg-gradient-to-r"
                      initial={{ width: 0 }}
                      animate={{ width: `${editor.popularity}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Productivity Level Slider */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2">
            <Zap className="text-primary size-6" />
          </div>
          <div>
            <Label className="text-xl font-bold">Productivity Level</Label>
            <p className="text-muted-foreground text-sm">
              How intense is your workflow?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Slider
            value={[productivityLevel]}
            onValueChange={(value) =>
              updateField("productivityLevel", value[0])
            }
            max={100}
            step={10}
            className="w-full"
          />
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>Casual</span>
            <span className="text-primary font-medium">
              {productivityLevel}%
            </span>
            <span>Intense</span>
          </div>
        </div>
      </motion.div>

      {/* Workflow and Collaboration */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2">
              <Target className="text-primary size-6" />
            </div>
            <div>
              <Label className="text-xl font-bold">Workflow Style</Label>
              <p className="text-muted-foreground text-sm">
                How do you organize work?
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {WORKFLOWS.map((workflow, index) => {
              const isSelected = data.workflowPreference === workflow.value;
              return (
                <motion.div
                  key={workflow.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300 ${
                    isSelected
                      ? `border-primary bg-gradient-to-r ${workflow.color} bg-opacity-10 shadow-lg`
                      : "border-border hover:border-primary/50 hover:shadow-md"
                  }`}
                  onClick={() =>
                    updateField("workflowPreference", workflow.value)
                  }
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isSelected ? "0%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: isSelected ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {workflow.icon}
                    </motion.span>
                    <div>
                      <div className="font-semibold">{workflow.label}</div>
                      <div className="text-muted-foreground text-sm">
                        {workflow.desc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
              <Users className="text-primary size-6" />
            </div>
            <div>
              <Label className="text-xl font-bold">Collaboration Style</Label>
              <p className="text-muted-foreground text-sm">
                How do you work with others?
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {COLLABORATION_STYLES.map((style, index) => {
              const isSelected = data.collaborationStyle === style.value;
              return (
                <motion.div
                  key={style.value}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 transition-all duration-300 ${
                    isSelected
                      ? `border-primary bg-gradient-to-l ${style.color} bg-opacity-10 shadow-lg`
                      : "border-border hover:border-primary/50 hover:shadow-md"
                  }`}
                  onClick={() => updateField("collaborationStyle", style.value)}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent"
                    initial={{ x: "100%" }}
                    animate={{ x: isSelected ? "0%" : "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.span
                      className="text-3xl"
                      animate={{ scale: isSelected ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {style.icon}
                    </motion.span>
                    <div>
                      <div className="font-semibold">{style.label}</div>
                      <div className="text-muted-foreground text-sm">
                        {style.desc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Advanced Preferences Toggle */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-2">
              <Settings className="text-primary size-6" />
            </div>
            <div>
              <Label className="text-xl font-bold">
                Advanced Features{" "}
                <span className="text-muted-foreground">(Beta)</span>
              </Label>
              <p className="text-muted-foreground text-sm">
                Power user options
              </p>
            </div>
          </div>
          <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {ADVANCED_PREFERENCES.map((pref, index) => {
                const IconComponent = pref.icon;
                const isChecked = data[
                  pref.key as keyof typeof data
                ] as boolean;
                return (
                  <motion.div
                    key={pref.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                      isChecked
                        ? `border-primary bg-gradient-to-r ${pref.color} bg-opacity-10 shadow-lg`
                        : "border-border hover:border-primary/50 hover:shadow-md"
                    }`}
                    onClick={() =>
                      updateField(pref.key as keyof typeof data, !isChecked)
                    }
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ scale: isChecked ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1"
                        />
                      </motion.div>
                      <div
                        className={`rounded-lg bg-gradient-to-r p-2 ${pref.color} bg-opacity-20`}
                      >
                        <IconComponent className="text-primary size-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{pref.label}</div>
                        <div className="text-muted-foreground mt-1 text-sm">
                          {pref.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-opacity-20 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-2">
            <Bell className="text-primary size-6" />
          </div>
          <div>
            <Label className="text-xl font-bold">
              Notification Preferences
            </Label>
            <p className="text-muted-foreground text-sm">
              Stay informed your way
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {NOTIFICATIONS.map((notification, index) => {
            const IconComponent = notification.icon;
            const isChecked = data[
              notification.key as keyof typeof data
            ] as boolean;
            const priorityColors = {
              critical: "ring-red-500/50",
              high: "ring-orange-500/50",
              medium: "ring-yellow-500/50",
              low: "ring-green-500/50",
            };

            return (
              <motion.div
                key={notification.key}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 ${
                  isChecked
                    ? `border-primary bg-gradient-to-br ${notification.color} bg-opacity-10 shadow-xl ring-2 ${priorityColors[notification.priority as keyof typeof priorityColors]}`
                    : "border-border hover:border-primary/50 hover:shadow-lg"
                }`}
                onClick={() =>
                  updateField(notification.key as keyof typeof data, !isChecked)
                }
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{
                      scale: isChecked ? 1.1 : 1,
                      rotate: isChecked ? 360 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1"
                    />
                  </motion.div>
                  <motion.div
                    className={`rounded-xl bg-gradient-to-r p-3 ${notification.color} bg-opacity-20`}
                    animate={{ rotate: isChecked ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="text-primary size-5" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-semibold">{notification.label}</div>
                    <div className="text-muted-foreground mt-1 text-sm">
                      {notification.desc}
                    </div>
                    <div
                      className={`mt-2 inline-block rounded-full px-2 py-1 text-xs ${
                        notification.priority === "critical"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : notification.priority === "high"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                            : notification.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                    >
                      {notification.priority} priority
                    </div>
                  </div>
                </div>
                {isChecked && (
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Star className="text-primary size-4 fill-current" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

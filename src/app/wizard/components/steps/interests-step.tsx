"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Zap, Target, Code, Users, Star } from "lucide-react";
import { useWizardStore } from "@/app/store/wizard-store";
import { GOALS, INTERESTS, PROJECT_TYPES, TEAM_SIZES } from "../constants";

export function InterestsGoalsStep() {
  const { data, updateField: updateData, toggleArrayItem } = useWizardStore();

  const getExperienceBasedGoals = () => {
    if (data.experienceLevel === "student") {
      return GOALS.filter((goal) =>
        ["learning", "projects", "collaboration"].includes(goal.value),
      );
    }
    return GOALS;
  };

  const availableGoals = getExperienceBasedGoals();

  return (
    <div className="space-y-8">
      {/* Interests */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Zap className="text-primary size-5" />
          Areas of Interest
          <motion.span
            className="text-muted-foreground text-sm font-normal"
            key={data.interests.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            ({data.interests.length} selected)
          </motion.span>
        </Label>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">
            {data.experienceLevel === "student"
              ? "What areas of tech excite you the most?"
              : "Select your areas of expertise and interest"}
          </div>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    data.interests.includes(interest) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all duration-300 ${
                    data.interests.includes(interest)
                      ? "from-primary via-primary/90 to-primary/80 bg-gradient-to-r shadow-lg"
                      : "hover:bg-primary/10 hover:border-primary/50"
                  }`}
                  onClick={() => toggleArrayItem("interests", interest)}
                >
                  {interest}
                  {data.interests.includes(interest) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Zap className="ml-1 size-3 fill-current" />
                    </motion.div>
                  )}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Primary Goal */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Target className="text-primary size-5" />
          Primary Goal *
        </Label>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {availableGoals.map((goal, index) => (
            <motion.div
              key={goal.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 ${
                data.primaryGoal === goal.value
                  ? `border-primary bg-gradient-to-br ${goal.color} bg-opacity-10 shadow-lg`
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              onClick={() => updateData("primaryGoal", goal.value)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-lg bg-gradient-to-r p-3 text-3xl ${goal.color} bg-opacity-20`}
                >
                  {goal.icon}
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold">{goal.label}</div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {goal.desc}
                  </div>
                </div>
              </div>
              {data.primaryGoal === goal.value && (
                <motion.div
                  className="absolute top-3 right-3"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="bg-primary size-4 animate-pulse rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Types */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Code className="text-primary size-5" />
          Project Types You Work On
          <motion.span
            className="text-muted-foreground text-sm font-normal"
            key={data.projectTypes.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            ({data.projectTypes.length} selected)
          </motion.span>
        </Label>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">
            {data.experienceLevel === "student"
              ? "What kind of projects do you want to build?"
              : "What type of projects do you typically work on?"}
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    data.projectTypes.includes(type) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all duration-300 ${
                    data.projectTypes.includes(type)
                      ? "from-primary to-primary/80 bg-gradient-to-r shadow-lg"
                      : "hover:bg-primary/10 hover:border-primary/50"
                  }`}
                  onClick={() => toggleArrayItem("projectTypes", type)}
                >
                  {type}
                  {data.projectTypes.includes(type) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Star className="ml-1 size-3 fill-current" />
                    </motion.div>
                  )}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Size */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Users className="text-primary size-5" />
          Preferred Team Size
        </Label>
        <Select
          value={data.teamSize}
          onValueChange={(value) => updateData("teamSize", value)}
        >
          <SelectTrigger className="h-14 text-base">
            <SelectValue placeholder="How do you like to work?" />
          </SelectTrigger>
          <SelectContent>
            {TEAM_SIZES.map((size) => (
              <SelectItem
                key={size.value}
                value={size.value}
                className="py-4 text-base"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{size.icon}</span>
                  <div>
                    <div className="font-medium">{size.label}</div>
                    <div className="text-muted-foreground text-xs">
                      {size.desc}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  EXPERIENCE_LEVELS,
  FRAMEWORKS,
  PRIMARY_ROLES,
  PROGRAMMING_LANGUAGES,
  TOOLS,
} from "../constants";
import { Badge } from "@/components/ui/badge";
import { useWizardStore } from "../../../store/wizard-store";
import {
  Award,
  Briefcase,
  Code,
  Heart,
  Lightbulb,
  Settings,
  Star,
} from "lucide-react";

const DeveloperProfileStep = () => {
  const { data, updateField, toggleArrayItem } = useWizardStore();

  return (
    <div className={`space-y-8 transition-all duration-500`}>
      {/* Experience Level with animated cards */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Award className="text-primary size-5" />
          Experience Level *
        </Label>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {EXPERIENCE_LEVELS.map((level, index) => (
            <div
              key={level.value}
              className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                data.experienceLevel === level.value
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => updateField("experienceLevel", level.value)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{level.icon}</span>
                <div>
                  <div className="font-medium">{level.label}</div>
                  <div className="text-muted-foreground text-sm">
                    {level.desc}
                  </div>
                </div>
              </div>
              {data.experienceLevel === level.value && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary size-3 animate-pulse rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Primary Role with enhanced select */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="text-primary size-5" />
          Primary Role *
        </Label>
        <div className="relative">
          <Select
            value={data.primaryRole}
            onValueChange={(value) => updateField("primaryRole", value)}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="What's your main role?" />
            </SelectTrigger>
            <SelectContent>
              {PRIMARY_ROLES.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="py-3 text-base"
                >
                  <span className="flex items-center gap-2">
                    <span>{role.icon}</span>
                    {role.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programming Languages with search and categories */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Code className="text-primary size-5" />
          Programming Languages
          <span className="text-muted-foreground text-sm font-normal">
            ({data.programmingLanguages.length} selected)
          </span>
        </Label>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">
            Click to select your favorite languages
          </div>
          <div className="flex flex-wrap gap-2">
            {PROGRAMMING_LANGUAGES.map((lang, index) => (
              <Badge
                key={lang}
                variant={
                  data.programmingLanguages.includes(lang)
                    ? "default"
                    : "outline"
                }
                className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                  data.programmingLanguages.includes(lang)
                    ? "animate-pulse shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleArrayItem("programmingLanguages", lang)}
              >
                {lang}
                {data.programmingLanguages.includes(lang) && (
                  <Star className="ml-1 size-3 fill-current" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Frameworks with enhanced interaction */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Lightbulb className="text-primary size-5" />
          Frameworks & Libraries
          <span className="text-muted-foreground text-sm font-normal">
            ({data.frameworks.length} selected)
          </span>
        </Label>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">
            Select the frameworks you love working with
          </div>
          <div className="flex flex-wrap gap-2">
            {FRAMEWORKS.map((framework, index) => (
              <Badge
                key={framework}
                variant={
                  data.frameworks.includes(framework) ? "default" : "outline"
                }
                className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                  data.frameworks.includes(framework)
                    ? "animate-pulse shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleArrayItem("frameworks", framework)}
              >
                {framework}
                {data.frameworks.includes(framework) && (
                  <Heart className="ml-1 size-3 fill-current" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tools with enhanced interaction */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Settings className="text-primary size-5" />
          Tools & Technologies
          <span className="text-muted-foreground text-sm font-normal">
            ({data.tools.length} selected)
          </span>
        </Label>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">
            What tools make you productive?
          </div>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool, index) => (
              <Badge
                key={tool}
                variant={data.tools.includes(tool) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                  data.tools.includes(tool)
                    ? "animate-pulse shadow-lg"
                    : "hover:bg-primary/10 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleArrayItem("tools", tool)}
              >
                {tool}
                {data.tools.includes(tool) && (
                  <Star className="ml-1 size-3 fill-current" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfileStep;

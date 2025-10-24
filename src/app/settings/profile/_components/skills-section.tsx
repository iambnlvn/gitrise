"use client";
//TODO?: should I add a mobile friendly ui like a drawer
import { useState } from "react";
import { SettingCard } from "../shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Code2 } from "lucide-react";
import { useProfileStore } from "@/store/profile-store";
import { toast } from "sonner";

const POPULAR_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Next.js",
  "Vue.js",
];

export function SkillsSection() {
  const { skills, addSkill, removeSkill } = useProfileStore();
  const [newSkill, setNewSkill] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      toast.error("Please enter a skill");
      return;
    }

    if (skill.length > 30) {
      toast.error("Skill name must be less than 30 characters");
      return;
    }

    if (skills.includes(skill)) {
      toast.error("Skill already added");
      return;
    }

    if (skills.length >= 20) {
      toast.error("Maximum of 20 skills allowed");
      return;
    }

    addSkill(skill);
    setNewSkill("");
    toast.success("Skill added successfully");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAddPopularSkill = (skill: string) => {
    if (skills.includes(skill)) {
      toast.error("Skill already added");
      return;
    }

    if (skills.length >= 20) {
      toast.error("Maximum of 20 skills allowed");
      return;
    }

    addSkill(skill);
    toast.success("Skill added successfully");
  };

  const filteredSuggestions = POPULAR_SKILLS.filter(
    (skill) =>
      !skills.includes(skill) &&
      skill.toLowerCase().includes(newSkill.toLowerCase()),
  );

  return (
    <SettingCard
      title="Skills & Technologies"
      description="Add your technical skills and expertise"
      tooltip="These skills will be displayed on your public profile."
      icon={<Code2 className="text-primary size-5" />}
    >
      <div className="space-y-5">
        {/* Skill Input */}
        <div className="relative space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Add a skill (e.g., React, Python, Docker)"
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowSuggestions(newSkill.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200"
                maxLength={30}
              />

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="border-border bg-background animate-in fade-in slide-in-from-top-2 absolute top-full z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border shadow-lg duration-200">
                  {filteredSuggestions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        handleAddPopularSkill(skill);
                        setNewSkill("");
                        setShowSuggestions(false);
                      }}
                      className="hover:bg-muted/50 flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
                    >
                      <Code2 className="text-muted-foreground size-4" />
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              type="button"
              onClick={handleAddSkill}
              disabled={!newSkill.trim()}
              size="default"
              className="gap-2"
            >
              <Plus className="size-4" />
              Add
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            {skills.length}/20 skills • Press Enter or click Add
          </p>
        </div>

        {skills.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Your Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="hover:bg-secondary/80 animate-in fade-in zoom-in group gap-1.5 pr-1.5 pl-3 text-sm transition-all duration-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      removeSkill(skill);
                      toast.success("Skill removed");
                    }}
                    className="hover:bg-destructive/20 hover:text-destructive ml-1 rounded-sm p-0.5 transition-colors"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {skills.length < 20 && (
          <div className="space-y-3">
            <h4 className="text-muted-foreground text-sm font-medium">
              Popular Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.filter((skill) => !skills.includes(skill))
                .slice(0, 8)
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="hover:border-primary/50 hover:bg-primary/5 cursor-pointer gap-1.5 transition-all duration-200"
                    onClick={() => handleAddPopularSkill(skill)}
                  >
                    <Plus className="size-3" />
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>
    </SettingCard>
  );
}

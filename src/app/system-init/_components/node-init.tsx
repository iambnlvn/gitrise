"use client";
//TODO!: this ui is kinda euh, redesign it later
import { useState } from "react";
import {
  FolderGit2,
  Plus,
  Download,
  Sparkles,
  ArrowRight,
  Info,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWizardStore } from "@/app/stores/wizard-store";
import { WIZARD_PROJECT_TEMPLATES } from "../constants";
import { SectionHeader } from "./shared";

export function NodeInitStep() {
  const {
    data: { nodeInit: data },
    updateData,
  } = useWizardStore();
  const [activeTab, setActiveTab] = useState<"create" | "import">(
    data.createNew ? "create" : "import",
  );

  const handleTabChange = (tab: "create" | "import") => {
    setActiveTab(tab);
    updateData("nodeInit", { createNew: tab === "create" });
  };

  const suggestProjectName = () => {
    if (data.importUrl) {
      const match = data.importUrl.match(/\/([^/]+?)(?:\.git)?$/);
      if (match) {
        updateData("nodeInit", { projectName: match[1] });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-foreground text-3xl font-bold">Workspace Setup</h2>
        <p className="text-muted-foreground mt-2">
          Create or import your first project
        </p>
        <Badge variant="secondary" className="bg-foreground text-muted mt-3">
          Choose your starting point
        </Badge>
      </div>

      <div className="bg-background 0 flex rounded-xl p-1">
        <button
          onClick={() => handleTabChange("create")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
            activeTab === "create"
              ? "bg-primary text-muted shadow-sm"
              : "text-muted-foreground",
          )}
        >
          <Plus className="size-4" />
          Create New
        </button>
        <button
          onClick={() => handleTabChange("import")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
            activeTab === "import"
              ? "bg-primary text-muted shadow-sm"
              : "text-muted-foreground",
          )}
        >
          <Download className="size-4" />
          Import Existing
        </button>
      </div>

      {activeTab === "create" ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionHeader
              icon={Settings}
              title="Workspace Configuration"
              description="Set up your workspace and project details"
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="workspaceName"
                  className="text-muted-foreground text-sm font-medium"
                >
                  Workspace Name
                </Label>
                <Input
                  id="workspaceName"
                  placeholder="my-workspace"
                  value={data.workspaceName}
                  onChange={(e) =>
                    updateData("nodeInit", { workspaceName: e.target.value })
                  }
                  className="bg-background font-mono shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="projectName"
                  className="text-muted-foreground text-sm font-medium"
                >
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="awesome-project"
                  value={data.projectName}
                  onChange={(e) =>
                    updateData("nodeInit", { projectName: e.target.value })
                  }
                  className="bg-background font-mono shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionHeader
              icon={FolderGit2}
              title="Project Templates"
              description="Start from a template or create from scratch"
            />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {WIZARD_PROJECT_TEMPLATES.map((template) => {
                const isSelected = data.template === template.id;

                return (
                  <button
                    key={template.id}
                    onClick={() =>
                      updateData("nodeInit", { template: template.id })
                    }
                    className={cn(
                      "flex flex-col items-center gap-3 rounded-xl p-4 text-center transition-all",
                      isSelected
                        ? "bg-primary shadow-sm"
                        : "bg-foreground hover:shadow-sm",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl text-2xl transition-all",
                        isSelected
                          ? "bg-background text-primary"
                          : "text-muted bg-background",
                      )}
                    >
                      {template.icon}
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">
                        {template.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {template.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="bg-primary text-secondary flex size-6 items-center justify-center rounded-full shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionHeader
              icon={Download}
              title="Import Repository"
              description="Connect an existing repository to your workspace"
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="importUrl"
                  className="text-muted-foreground text-sm font-medium"
                >
                  Repository URL
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="importUrl"
                    placeholder="https://github.com/username/repo.git"
                    value={data.importUrl}
                    onChange={(e) =>
                      updateData("nodeInit", { importUrl: e.target.value })
                    }
                    className="bg-background flex-1 font-mono shadow-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={suggestProjectName}
                    disabled={!data.importUrl}
                    className="gap-2 bg-transparent"
                  >
                    <Sparkles className="size-4" />
                    Detect
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="importProjectName"
                  className="text-muted-foreground text-sm font-medium"
                >
                  Project Name
                </Label>
                <Input
                  id="importProjectName"
                  placeholder="Will be detected from URL"
                  value={data.projectName}
                  onChange={(e) =>
                    updateData("nodeInit", { projectName: e.target.value })
                  }
                  className="bg-background font-mono shadow-sm"
                />
                <p className="text-muted-foreground text-xs">
                  We&apos;ll try to detect this from your repository URL
                </p>
              </div>
            </div>
          </div>

          {data.importUrl && (
            <div className="space-y-3">
              <SectionHeader
                icon={FolderGit2}
                title="Import Preview"
                description="Review your import configuration"
              />

              <div className="bg-background rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-background flex size-10 items-center justify-center rounded-lg">
                    <FolderGit2 className="text-primary size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground font-mono text-sm font-medium">
                      {data.projectName || "project-name"}
                    </p>
                    <p className="text-muted-foreground truncate font-mono text-xs">
                      {data.importUrl}
                    </p>
                  </div>
                  <ArrowRight className="text-muted-foreground size-5" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-muted relative overflow-hidden rounded-xl p-6">
        <div className="absolute -top-4 -right-4 size-24 rounded-full bg-blue-100/50"></div>
        <div className="bg-background absolute -bottom-2 -left-2 size-16 rounded-full"></div>

        <div className="relative flex items-start gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Info className="size-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-foreground mb-1 font-medium">Pro Tip</h4>
            <p className="text-muted-foreground mb-3 text-sm">
              {activeTab === "create"
                ? "Use lowercase letters and hyphens for project names for compatibility. Templates can be customized after creation."
                : "Make sure you have access to the repository. Private repos require authentication during the import process."}
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <Settings className="size-3" />
              <span className="flex items-center">
                Configurable later in Settings
                <ArrowRight className="mx-0.5 size-3" />
                Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { User, AtSign, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useWizardStore } from "@/app/stores/wizard-store";
import { WIZARD_AVATARS as AVATARS, WIZARD_ROLES as ROLES } from "../constants";

export function NeuralIdStep() {
  const { data: globalWizardData, updateData } = useWizardStore();
  const [selectedAvatar, setSelectedAvatar] = useState(
    globalWizardData.neuralId.avatar || AVATARS[0],
  );

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    updateData("neuralId", { avatar });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome, Operator
        </h2>
        <p className="mt-2 text-gray-500">
          Link your neural signature to the system
        </p>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="size-4 text-violet-600" />
          Choose your avatar
        </Label>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {AVATARS.map((avatar, index) => (
            <button
              key={index}
              onClick={() => handleAvatarSelect(avatar)}
              className={cn(
                "relative rounded-full p-0.5 transition-all",
                selectedAvatar === avatar
                  ? "ring-2 ring-violet-600 ring-offset-2"
                  : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2",
              )}
            >
              <Avatar className="size-14">
                <AvatarImage src={avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  OP
                </AvatarFallback>
              </Avatar>
              {selectedAvatar === avatar && (
                <div className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white shadow-md">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <AtSign className="size-4 text-violet-600" />
            Username
          </Label>
          <Input
            id="username"
            placeholder="johndoe"
            value={globalWizardData.neuralId.username}
            onChange={(e) =>
              updateData("neuralId", { username: e.target.value })
            }
            className="border-gray-300 bg-white shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
          <p className="text-xs text-gray-500">Your unique identifier</p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="displayName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <User className="size-4 text-violet-600" />
            Display Name
          </Label>
          <Input
            id="displayName"
            placeholder="John Doe"
            value={globalWizardData.neuralId.displayName}
            onChange={(e) =>
              updateData("neuralId", { displayName: e.target.value })
            }
            className="border-gray-300 bg-white shadow-sm focus:border-violet-500 focus:ring-violet-500"
          />
          <p className="text-xs text-gray-500">How others will see you</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Shield className="size-4 text-violet-600" />
          Primary Role
        </Label>
        <RadioGroup
          value={globalWizardData.neuralId.role}
          onValueChange={(value) => updateData("neuralId", { role: value })}
          className="grid gap-3 md:grid-cols-2"
        >
          {ROLES.map((role) => (
            <Label
              key={role.id}
              htmlFor={role.id}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                globalWizardData.neuralId.role === role.id
                  ? "border-violet-600 bg-violet-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
              )}
            >
              <RadioGroupItem
                value={role.id}
                id={role.id}
                className="sr-only"
              />
              <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                {role.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{role.label}</p>
                <p className="text-xs text-gray-500">{role.description}</p>
              </div>
              {globalWizardData.neuralId.role === role.id && (
                <div className="flex size-5 items-center justify-center rounded-full bg-violet-600 text-xs text-white">
                  ✓
                </div>
              )}
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useProfileStore } from "@/store/profile-store";
import type { ProfileFormData } from "@/store/profile-store";
import type { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: keyof ProfileFormData;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "url" | "textarea";
  icon?: LucideIcon;
  rows?: number;
}

export function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  rows,
}: FormInputProps) {
  const { formData, validationErrors, updateField } = useProfileStore();

  const InputComponent = type === "textarea" ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium"
      >
        {Icon && <Icon className="size-4" />}
        {label}
      </Label>
      <InputComponent
        id={id}
        type={type === "textarea" ? undefined : type}
        placeholder={placeholder}
        value={formData[id] || ""}
        onChange={(e) => updateField(id, e.target.value)}
        rows={rows}
        className={`border-border/50 bg-background/50 focus:border-primary/50 focus:bg-background border transition-all duration-200 ${
          validationErrors[id] ? "border-red-500" : ""
        }`}
      />
      {validationErrors[id] && (
        <p className="text-xs text-red-500">{validationErrors[id]}</p>
      )}
    </div>
  );
}

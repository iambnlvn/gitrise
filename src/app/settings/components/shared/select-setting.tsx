import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionConfig } from "./types";

/**
 *
 * @interface SelectSettingProps
 * @property {string} id - Unique ID for the select element
 * @property {string} label - Label text
 * @property {string} value - Currently selected value
 * @property {function} onValueChange - Callback when selection changes
 * @property {OptionConfig[]} options - Available options
 * @property {string} [description] - Optional description text
 */
interface SelectSettingProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: OptionConfig[];
  description?: string;
}

/**
 * Dropdown select setting component with label and optional description.
 * Layout adapts based on whether description is provided.
 *
 */
export function SelectSetting({
  id,
  label,
  value,
  onValueChange,
  options,
  description,
}: SelectSettingProps) {
  return (
    <div
      className={
        description ? "flex items-center justify-between" : "space-y-2"
      }
    >
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className={`transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 ${description ? "w-fit" : ""}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

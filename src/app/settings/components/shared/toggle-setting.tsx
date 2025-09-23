import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/**
 *
 * @interface ToggleSettingProps
 * @property {string} label - Label for the toggle
 * @property {string} description - Description text
 * @property {boolean} checked - Current toggle state
 * @property {function} onCheckedChange - Callback when toggle changes
 */
interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Toggle switch setting component with label and description.
 *
 */
export function ToggleSetting({
  label,
  description,
  checked,
  onCheckedChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

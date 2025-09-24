import { Check } from "lucide-react";
import { Theme } from "./appearance-types";
import { THEME_GRADIENT_MAP } from "./constants";
import { OptionConfig } from "../shared/types";

/**
 * @interface ThemePickerProps
 * @property {OptionConfig<Theme>[]} options - Available theme options
 * @property {Theme} value - Currently selected theme
 * @property {function} onChange - Callback when theme changes
 */
interface ThemePickerProps {
  options: OptionConfig<Theme>[];
  value: Theme;
  onChange: (value: Theme) => void;
}
/**
 * Theme picker component displaying theme options as visual cards.
 * Each card shows a gradient preview of the theme with an icon.
 *
 */
export function ThemePicker({ options, value, onChange }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map(({ value: optionValue, icon: Icon, label }) => (
        <button
          key={optionValue}
          className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
            value === optionValue
              ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
              : "border-border bg-card hover:border-purple-500/50 hover:shadow-md"
          }`}
          onClick={() => onChange(optionValue)}
        >
          <div
            className={`absolute inset-0 transition-all duration-300 ${THEME_GRADIENT_MAP[optionValue]}`}
          />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div
              className={`rounded-lg p-3 transition-all duration-300 ${
                value === optionValue
                  ? "bg-purple-500 text-white"
                  : "bg-muted text-muted-foreground group-hover:bg-purple-500/20"
              }`}
            >
              {Icon && <Icon className="size-6" />}
            </div>
            <span className="text-sm font-medium">{label}</span>
            {value === optionValue && (
              <Check className="absolute top-2 right-2 size-4 text-purple-500" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

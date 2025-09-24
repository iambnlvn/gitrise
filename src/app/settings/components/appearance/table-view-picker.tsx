import { Check } from "lucide-react";
import { TableView } from "./appearance-types";
import { OptionConfig } from "../shared/types";

/**
 *
 * @interface TableViewPickerProps
 * @property {OptionConfig<TableView>[]} options - Available table view options
 * @property {TableView} value - Currently selected table view
 * @property {function} onChange - Callback when table view changes
 */
interface TableViewPickerProps {
  options: OptionConfig<TableView>[];
  value: TableView;
  onChange: (value: TableView) => void;
}

/**
 * Table view picker component displaying layout options as preview cards.
 * Each card shows a simplified representation of the table layout.
 */
export function TableViewPicker({
  options,
  value,
  onChange,
}: TableViewPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map(({ value: optionValue, label, description }) => (
        <button
          key={optionValue}
          className={`relative overflow-hidden rounded-lg border-2 p-4 text-left transition-all duration-300 ${
            value === optionValue
              ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
              : "border-border bg-card hover:border-purple-500/50"
          }`}
          onClick={() => onChange(optionValue)}
        >
          <div className="mb-3 space-y-2">
            <div className="bg-muted h-2 w-full rounded" />
            <div className="bg-muted h-2 w-3/4 rounded" />
            <div className="bg-muted h-2 w-5/6 rounded" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
          {value === optionValue && (
            <Check className="absolute top-2 right-2 size-4 text-purple-500" />
          )}
        </button>
      ))}
    </div>
  );
}

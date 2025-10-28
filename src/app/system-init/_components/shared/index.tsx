import { Label } from "@/components/ui/label";

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="space-y-1">
      <Label className="text-foreground flex items-center gap-2 text-sm font-medium">
        <Icon className="text-primary size-4" />
        {title}
      </Label>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
}

/**
 * @interface SettingHeaderProps
 * @property {string} title - Page title
 * @property {string} description - Page description
 * @property {React.ReactNode} [actions] - Optional action buttons
 */
interface SettingHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

/**
 * Header for settings pages.
 */
export function SettingHeader({
  title,
  description,
  actions,
}: SettingHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-foreground text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

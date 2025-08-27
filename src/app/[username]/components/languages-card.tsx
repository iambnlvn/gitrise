import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLanguageColor } from "@/utils/color-utils";

interface Language {
  name: string;
  percentage: number;
  color?: string;
}

interface LanguagesCardProps {
  languages: Language[];
}

export function LanguagesCard({ languages }: LanguagesCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Code className="mr-2 size-5" />
          Top Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {languages.map((lang, index) => {
          // Use provided color or get one from our utility
          const langColor = lang.color || getLanguageColor(lang.name);

          return (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <div
                    className="mr-2 size-3 rounded-full"
                    style={{ backgroundColor: langColor }}
                  />
                  {lang.name}
                </span>
                <span className="text-muted-foreground">
                  {lang.percentage}%
                </span>
              </div>
              <div className="bg-muted h-2 w-full rounded-full">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: langColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

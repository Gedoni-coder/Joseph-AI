import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EconomicContext } from "@/lib/economic-data";
import { Globe, MapPin, Building2, Flag } from "lucide-react";

interface ContextSwitcherProps {
  activeContext: EconomicContext;
  onContextChange: (context: EconomicContext) => void;
}

const contextConfig = {
  local: {
    label: "Local",
    icon: MapPin,
    description: "City & Regional",
  },
  state: {
    label: "State",
    icon: Building2,
    description: "State Level",
  },
  national: {
    label: "National",
    icon: Flag,
    description: "United States",
  },
  international: {
    label: "International",
    icon: Globe,
    description: "Global Markets",
  },
} as const;

export function ContextSwitcher({
  activeContext,
  onContextChange,
}: ContextSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
      {(Object.keys(contextConfig) as EconomicContext[]).map((context) => {
        const config = contextConfig[context];
        const Icon = config.icon;
        const isActive = activeContext === context;

        return (
          <Button
            key={context}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onContextChange(context)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all",
              "hover:bg-background hover:shadow-sm",
              isActive && "bg-background shadow-sm text-primary",
            )}
          >
            <Icon className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span>{config.label}</span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {config.description}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}

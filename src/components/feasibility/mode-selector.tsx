import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeasibilityMode } from "@/lib/feasibility-data";
import {
  Shield,
  TrendingUp,
  Zap,
  AlertTriangle,
  Target,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  selectedMode: FeasibilityMode;
  onModeChange: (mode: FeasibilityMode) => void;
  title?: string;
}

const modeConfig = {
  conservative: {
    label: "Conservative",
    icon: Shield,
    description: "Worst-case scenarios with cautious estimates",
    color: "bg-red-50 border-red-200 text-red-800",
    iconColor: "text-red-600",
    characteristics: [
      "75% of projected revenue",
      "125% of estimated costs",
      "Higher risk factors",
      "Conservative timelines",
    ],
    riskLevel: "High Risk Adjustment",
    useCase: "Risk-averse investors, worst-case planning",
  },
  safe: {
    label: "Safe",
    icon: Target,
    description: "Balanced, realistic approach using industry benchmarks",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    iconColor: "text-blue-600",
    characteristics: [
      "100% of projected revenue",
      "100% of estimated costs",
      "Baseline risk factors",
      "Standard timelines",
    ],
    riskLevel: "Balanced Risk Profile",
    useCase: "Standard business planning, realistic projections",
  },
  wild: {
    label: "Wild",
    icon: Rocket,
    description: "Optimistic projections with aggressive assumptions",
    color: "bg-green-50 border-green-200 text-green-800",
    iconColor: "text-green-600",
    characteristics: [
      "140% of projected revenue",
      "85% of estimated costs",
      "Reduced risk factors",
      "Accelerated timelines",
    ],
    riskLevel: "Optimistic Scenario",
    useCase: "Growth investors, best-case planning",
  },
} as const;

export function ModeSelector({
  selectedMode,
  onModeChange,
  title = "Analysis Mode Selection",
}: ModeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          {title}
        </h3>
        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
          3 analysis modes
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(modeConfig) as FeasibilityMode[]).map((mode) => {
          const config = modeConfig[mode];
          const Icon = config.icon;
          const isSelected = selectedMode === mode;

          return (
            <Card
              key={mode}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                isSelected
                  ? "ring-2 ring-blue-500 shadow-md"
                  : "hover:shadow-md",
                config.color,
              )}
              onClick={() => onModeChange(mode)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 bg-white rounded-lg",
                          config.iconColor,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base">
                          {config.label}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-xs mt-1 border-current"
                        >
                          {config.riskLevel}
                        </Badge>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1 bg-blue-600 rounded-full">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed opacity-90">
                    {config.description}
                  </p>

                  {/* Characteristics */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium opacity-80">
                      Key Characteristics:
                    </div>
                    <ul className="space-y-1">
                      {config.characteristics.map((char, index) => (
                        <li
                          key={index}
                          className="text-xs flex items-start gap-2 opacity-80"
                        >
                          <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Use Case */}
                  <div className="border-t border-current/20 pt-3">
                    <div className="text-xs font-medium opacity-80 mb-1">
                      Best For:
                    </div>
                    <p className="text-xs opacity-70">{config.useCase}</p>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="flex items-center gap-2 text-xs font-medium pt-2 border-t border-blue-200">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      Currently Selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mode Comparison */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
              <h4 className="font-semibold text-gray-800">Mode Comparison</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="font-medium text-gray-700">Factor</div>
              <div className="font-medium text-red-700">Conservative</div>
              <div className="font-medium text-blue-700">Safe</div>
              <div className="font-medium text-green-700">Wild</div>

              <div className="text-gray-600">Revenue Assumptions</div>
              <div className="text-red-600">75% of projections</div>
              <div className="text-blue-600">100% of projections</div>
              <div className="text-green-600">140% of projections</div>

              <div className="text-gray-600">Cost Assumptions</div>
              <div className="text-red-600">125% of estimates</div>
              <div className="text-blue-600">100% of estimates</div>
              <div className="text-green-600">85% of estimates</div>

              <div className="text-gray-600">Risk Weighting</div>
              <div className="text-red-600">High (1.4x)</div>
              <div className="text-blue-600">Standard (1.0x)</div>
              <div className="text-green-600">Low (0.7x)</div>

              <div className="text-gray-600">Timeline Factor</div>
              <div className="text-red-600">Extended (1.2x)</div>
              <div className="text-blue-600">Standard (1.0x)</div>
              <div className="text-green-600">Accelerated (0.85x)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

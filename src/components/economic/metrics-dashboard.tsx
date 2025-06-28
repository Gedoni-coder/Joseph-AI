import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EconomicMetric } from "@/lib/economic-data";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface MetricsDashboardProps {
  metrics: EconomicMetric[];
}

export function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const itemsToShow = 4;
  const maxIndex = Math.max(0, metrics.length - itemsToShow);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / metrics.length;
      container.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };
  const getTrendIcon = (trend: EconomicMetric["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-economic-positive" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-economic-negative" />;
      default:
        return <Minus className="h-4 w-4 text-economic-neutral" />;
    }
  };

  const getTrendColor = (trend: EconomicMetric["trend"]) => {
    switch (trend) {
      case "up":
        return "text-economic-positive";
      case "down":
        return "text-economic-negative";
      default:
        return "text-economic-neutral";
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "%" || unit === "Index") {
      return `${value.toLocaleString()}${unit === "%" ? "%" : ""}`;
    }
    if (unit.includes("USD")) {
      return `$${value.toLocaleString()}`;
    }
    if (unit === "Points") {
      return value.toLocaleString();
    }
    if (unit.includes("B USD")) {
      return `$${value}B`;
    }
    return `${value.toLocaleString()} ${unit}`;
  };

  const formatChange = (
    change: number,
    changePercent: number,
    unit: string,
  ) => {
    const sign = change >= 0 ? "+" : "";
    const unitSymbol = unit === "%" ? "pp" : unit.replace(/^.*\//, "");
    return `${sign}${change.toFixed(1)}${unitSymbol === "%" ? "pp" : ""} (${sign}${changePercent.toFixed(1)}%)`;
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Showing {currentIndex + 1}-
          {Math.min(currentIndex + itemsToShow, metrics.length)} of{" "}
          {metrics.length} metrics
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            width: `${(metrics.length * 100) / itemsToShow}%`,
          }}
        >
          {metrics.map((metric) => (
            <Card
              key={metric.id}
              className="metric-card group flex-shrink-0"
              style={{ width: `${100 / metrics.length}%` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </CardTitle>
                {getTrendIcon(metric.trend)}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {formatValue(metric.value, metric.unit)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        getTrendColor(metric.trend),
                      )}
                    >
                      {formatChange(
                        metric.change,
                        metric.changePercent,
                        metric.unit,
                      )}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {metric.period}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: Math.ceil(metrics.length / itemsToShow) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                Math.floor(currentIndex / itemsToShow) === index
                  ? "bg-primary"
                  : "bg-muted",
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ),
        )}
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EconomicNews } from "@/lib/economic-data";
import {
  ExternalLink,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EconomicTableProps {
  news: EconomicNews[];
  title?: string;
}

export function EconomicTable({
  news,
  title = "Economic News & Headlines",
}: EconomicTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getImpactIcon = (impact: EconomicNews["impact"]) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-economic-positive" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-economic-negative" />;
      default:
        return <Minus className="h-4 w-4 text-economic-neutral" />;
    }
  };

  const getImpactBadgeVariant = (impact: EconomicNews["impact"]) => {
    switch (impact) {
      case "positive":
        return "default";
      case "negative":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="outline" className="text-xs">
          {news.length} articles
        </Badge>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/50">
              <TableHead className="w-16 text-center font-semibold">
                S/N
              </TableHead>
              <TableHead className="font-semibold">Headline</TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">
                Category
              </TableHead>
              <TableHead className="font-semibold hidden md:table-cell">
                Impact
              </TableHead>
              <TableHead className="font-semibold hidden sm:table-cell">
                Time
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <>
                <TableRow
                  key={item.id}
                  className={cn(
                    "data-table-row cursor-pointer transition-colors",
                    expandedRows.has(item.id) && "bg-muted/30",
                  )}
                  onClick={() => toggleRow(item.id)}
                >
                  <TableCell className="text-center font-mono text-sm">
                    {item.sn.toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="space-y-1">
                      <p className="line-clamp-2 text-sm leading-relaxed">
                        {item.headline}
                      </p>
                      <div className="flex items-center gap-2 md:hidden">
                        <Badge
                          variant={getImpactBadgeVariant(item.impact)}
                          className="text-xs"
                        >
                          {item.impact}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(item.timestamp)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {getImpactIcon(item.impact)}
                      <Badge
                        variant={getImpactBadgeVariant(item.impact)}
                        className="text-xs"
                      >
                        {item.impact}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimestamp(item.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.has(item.id) && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/20 border-b">
                      <div className="py-4 space-y-3">
                        <div className="text-sm leading-relaxed text-foreground">
                          {item.news}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>Source: {item.source}</span>
                            <span>Category: {item.category}</span>
                          </div>
                          <span>{item.timestamp.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

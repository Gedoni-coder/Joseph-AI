import { useState, useEffect, useCallback, useRef } from "react";
//import {
  EconomicContext,
  EconomicMetric,
  EconomicNews,
  EconomicForecast,
  economicMetrics as mockMetrics,
  economicNews as mockNews,
  economicForecasts as mockForecasts,
} //from //"@/lib/economic-data";
import { upcomingEconomicEvents, EconomicEvent } from "@/lib/economic-events";

interface EconomicDataState {
  metrics: Record<EconomicContext, EconomicMetric[]>;
  news: Record<EconomicContext, EconomicNews[]>;
  forecasts: Record<EconomicContext, EconomicForecast[]>;
  events: Record<EconomicContext, EconomicEvent[]>;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

interface DataUpdate {
  type: "metrics" | "news" | "forecasts" | "events";
  context: EconomicContext;
  data: any;
  timestamp: Date;
}

export function useEconomicData() {
  const [state, setState] = useState<EconomicDataState>({
    metrics: mockMetrics,
    news: mockNews,
    forecasts: mockForecasts,
    events: upcomingEconomicEvents,
    lastUpdated: new Date(),
    isLoading: false,
    error: null,
    isConnected: false,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const pollingIntervalRef = useRef<NodeJS.Timeout>();

  // Simulate API data fetching
  const fetchEconomicData = useCallback(async (context?: EconomicContext) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      // Simulate data variations
      const simulateDataUpdate = (baseData: any[]) => {
        return baseData.map((item) => ({
          ...item,
          value:
            typeof item.value === "number"
              ? item.value * (0.95 + Math.random() * 0.1)
              : item.value,
          change:
            typeof item.change === "number"
              ? item.change * (0.8 + Math.random() * 0.4)
              : item.change,
          timestamp: item.timestamp ? new Date() : undefined,
        }));
      };

      const updatedMetrics = context
        ? {
            ...mockMetrics,
            [context]: simulateDataUpdate(mockMetrics[context]),
          }
        : Object.fromEntries(
            Object.entries(mockMetrics).map(([ctx, data]) => [
              ctx,
              simulateDataUpdate(data),
            ]),
          );

      setState((prev) => ({
        ...prev,
        metrics: updatedMetrics,
        lastUpdated: new Date(),
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to fetch data",
        isLoading: false,
      }));
    }
  }, []);

  // WebSocket connection for real-time updates
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      // In real implementation, use your WebSocket endpoint
      // wsRef.current = new WebSocket('wss://your-api.com/economic-data');

      // Simulate WebSocket with EventSource for demo
      const mockWebSocket = {
        readyState: WebSocket.OPEN,
        close: () => {},
        send: () => {},
      } as WebSocket;

      wsRef.current = mockWebSocket;

      setState((prev) => ({ ...prev, isConnected: true }));

      // Simulate real-time updates
      const simulateUpdates = () => {
        const contexts: EconomicContext[] = [
          "local",
          "national",
          "state",
          "international",
        ];
        const randomContext =
          contexts[Math.floor(Math.random() * contexts.length)];

        const update: DataUpdate = {
          type: "metrics",
          context: randomContext,
          data: mockMetrics[randomContext].map((metric) => ({
            ...metric,
            value: metric.value * (0.98 + Math.random() * 0.04),
            change: metric.change * (0.9 + Math.random() * 0.2),
          })),
          timestamp: new Date(),
        };

        setState((prev) => ({
          ...prev,
          metrics: {
            ...prev.metrics,
            [randomContext]: update.data,
          },
          lastUpdated: update.timestamp,
        }));
      };

      // Simulate updates every 5-15 seconds
      const updateInterval = setInterval(
        simulateUpdates,
        5000 + Math.random() * 10000,
      );

      return () => {
        clearInterval(updateInterval);
        mockWebSocket.close();
      };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to connect to real-time updates",
        isConnected: false,
      }));

      // Retry connection after delay
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
    }
  }, []);

  // Polling fallback for when WebSocket is not available
  const startPolling = useCallback(() => {
    const poll = () => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        fetchEconomicData();
      }
    };

    pollingIntervalRef.current = setInterval(poll, 30000); // Poll every 30 seconds
  }, [fetchEconomicData]);

  // Manual refresh function
  const refreshData = useCallback(
    async (context?: EconomicContext) => {
      await fetchEconomicData(context);
    },
    [fetchEconomicData],
  );

  // Initialize connections
  useEffect(() => {
    connectWebSocket();
    startPolling();
    fetchEconomicData();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [connectWebSocket, startPolling, fetchEconomicData]);

  return {
    ...state,
    refreshData,
    reconnect: connectWebSocket,
  };
}

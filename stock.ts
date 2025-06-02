// Basic stock information
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  exchange?: string;
}

// Detailed stock information
export interface StockDetail extends Stock {
  open: number;
  high: number;
  low: number;
  previousClose: number;
  pe: number;
  eps: number;
  dividend?: number;
  dividendYield?: number;
  avgVolume: number;
  week52High: number;
  week52Low: number;
  recommendation?: AIRecommendation;
  historicalData: HistoricalDataPoint[];
}

// Market summary information
export interface MarketSummary {
  indexes: {
    sp500: IndexData;
    nasdaq: IndexData;
    dowJones: IndexData;
  };
  timestamp: number;
}

// Index data
export interface IndexData {
  value: number;
  change: number;
  changePercent: number;
}

// Historical data point for charts
export interface HistoricalDataPoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// AI recommendation
export interface AIRecommendation {
  action: 'buy' | 'sell' | 'hold';
  confidence: number; // 0-100
  reason: string;
  timeFrame: 'short' | 'medium' | 'long';
}

// News item
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  relatedSymbols?: string[];
}
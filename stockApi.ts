import axios from 'axios';
import { format } from 'date-fns';
import { Stock, StockDetail, MarketSummary, HistoricalDataPoint, AIRecommendation, NewsItem } from '../types/stock';

// Mock data functions for development purposes
// In a real app, these would be replaced with actual API calls

// Mock market indexes
const mockIndexes = {
  sp500: { value: 5218.12, change: 27.35, changePercent: 0.53 },
  nasdaq: { value: 16828.57, change: 152.11, changePercent: 0.91 },
  dowJones: { value: 38686.32, change: -42.39, changePercent: -0.11 }
};

// Generate realistic stock data
const generateStockPrice = () => {
  return Math.floor(Math.random() * 500) + 10 + Math.random();
};

const generateChange = () => {
  return (Math.random() * 10 - 5).toFixed(2) * 1;
};

const generateChangePercent = (change: number, price: number) => {
  return (change / (price - change) * 100).toFixed(2) * 1;
};

const generateVolume = () => {
  return Math.floor(Math.random() * 10000000) + 100000;
};

const generateMarketCap = (price: number) => {
  return price * (Math.floor(Math.random() * 1000000000) + 1000000);
};

// Popular stock symbols
const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'PG', name: 'Procter & Gamble Co.' },
  { symbol: 'MA', name: 'Mastercard Incorporated' },
  { symbol: 'HD', name: 'Home Depot Inc.' },
  { symbol: 'BAC', name: 'Bank of America Corp.' },
  { symbol: 'DIS', name: 'Walt Disney Co.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'CRM', name: 'Salesforce Inc.' }
];

// Create mock stocks with realistic data
const createMockStocks = () => {
  return popularStocks.map(stock => {
    const price = parseFloat(generateStockPrice().toFixed(2));
    const change = parseFloat(generateChange().toFixed(2));
    const changePercent = parseFloat(generateChangePercent(change, price).toFixed(2));
    
    return {
      ...stock,
      price,
      change,
      changePercent,
      volume: generateVolume(),
      marketCap: generateMarketCap(price),
      exchange: Math.random() > 0.5 ? 'NASDAQ' : 'NYSE'
    };
  });
};

// Generate mock historical data
const generateHistoricalData = (days: number, basePrice: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let price = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simulate daily volatility
    const volatility = Math.random() * 0.06 - 0.03; // -3% to +3%
    const change = price * volatility;
    
    const open = price;
    const close = parseFloat((price + change).toFixed(2));
    const high = parseFloat((Math.max(open, close) * (1 + Math.random() * 0.01)).toFixed(2));
    const low = parseFloat((Math.min(open, close) * (1 - Math.random() * 0.01)).toFixed(2));
    const volume = generateVolume();
    
    data.push({
      timestamp: date.getTime(),
      open,
      high,
      low,
      close,
      volume
    });
    
    price = close; // Next day opens at previous close
  }
  
  return data;
};

// Generate AI recommendation
const generateRecommendation = (stock: Stock): AIRecommendation => {
  const actions = ['buy', 'sell', 'hold'] as const;
  const timeFrames = ['short', 'medium', 'long'] as const;
  const action = actions[Math.floor(Math.random() * actions.length)];
  const confidence = Math.floor(Math.random() * 40) + 60; // 60-100
  const timeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
  
  let reason = '';
  if (action === 'buy') {
    reason = `Strong ${timeFrame}-term growth potential based on positive technical indicators and market trends.`;
    if (stock.changePercent > 0) {
      reason += ' Recent positive momentum suggests continued upward trajectory.';
    }
  } else if (action === 'sell') {
    reason = `Concerning ${timeFrame}-term outlook based on weakening fundamentals and technical analysis.`;
    if (stock.changePercent < 0) {
      reason += ' Recent negative momentum suggests further downside risk.';
    }
  } else {
    reason = `Stable ${timeFrame}-term outlook with balanced risk-reward profile.`;
    reason += ' Monitor closely for changes in market conditions before making significant position changes.';
  }
  
  return {
    action,
    confidence,
    reason,
    timeFrame
  };
};

// Mock API functions
export const fetchMarketSummary = async (): Promise<MarketSummary> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Add some random movement to the indexes
  const sp500Change = mockIndexes.sp500.change + (Math.random() * 4 - 2);
  const nasdaqChange = mockIndexes.nasdaq.change + (Math.random() * 6 - 3);
  const dowJonesChange = mockIndexes.dowJones.change + (Math.random() * 5 - 2.5);
  
  mockIndexes.sp500 = {
    value: parseFloat((mockIndexes.sp500.value + sp500Change).toFixed(2)),
    change: parseFloat(sp500Change.toFixed(2)),
    changePercent: parseFloat((sp500Change / (mockIndexes.sp500.value - sp500Change) * 100).toFixed(2))
  };
  
  mockIndexes.nasdaq = {
    value: parseFloat((mockIndexes.nasdaq.value + nasdaqChange).toFixed(2)),
    change: parseFloat(nasdaqChange.toFixed(2)),
    changePercent: parseFloat((nasdaqChange / (mockIndexes.nasdaq.value - nasdaqChange) * 100).toFixed(2))
  };
  
  mockIndexes.dowJones = {
    value: parseFloat((mockIndexes.dowJones.value + dowJonesChange).toFixed(2)),
    change: parseFloat(dowJonesChange.toFixed(2)),
    changePercent: parseFloat((dowJonesChange / (mockIndexes.dowJones.value - dowJonesChange) * 100).toFixed(2))
  };
  
  return {
    indexes: { ...mockIndexes },
    timestamp: Date.now()
  };
};

export const fetchTopGainers = async (): Promise<Stock[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create mock stocks and sort by change percent descending
  const stocks = createMockStocks();
  return stocks
    .filter(stock => stock.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);
};

export const fetchTopLosers = async (): Promise<Stock[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create mock stocks and sort by change percent ascending
  const stocks = createMockStocks();
  return stocks
    .filter(stock => stock.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);
};

export const fetchStockData = async (symbol: string): Promise<StockDetail> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find the stock or create a new one if not found
  const allStocks = createMockStocks();
  const stock = allStocks.find(s => s.symbol === symbol) || {
    symbol,
    name: symbol,
    price: generateStockPrice(),
    change: generateChange(),
    changePercent: 0,
    volume: generateVolume(),
    marketCap: 0,
    exchange: Math.random() > 0.5 ? 'NASDAQ' : 'NYSE'
  };
  
  // Calculate change percent if not already set
  if (stock.changePercent === 0) {
    stock.changePercent = generateChangePercent(stock.change, stock.price);
  }
  
  // Generate historical data
  const historicalData = generateHistoricalData(30, stock.price - stock.change);
  
  // Create detailed stock information
  const detail: StockDetail = {
    ...stock,
    open: parseFloat((stock.price - stock.change * Math.random()).toFixed(2)),
    high: parseFloat((stock.price * 1.02).toFixed(2)),
    low: parseFloat((stock.price * 0.98).toFixed(2)),
    previousClose: parseFloat((stock.price - stock.change).toFixed(2)),
    pe: parseFloat((Math.random() * 30 + 10).toFixed(2)),
    eps: parseFloat((stock.price / (Math.random() * 20 + 10)).toFixed(2)),
    dividend: Math.random() > 0.3 ? parseFloat((stock.price * 0.02 * Math.random()).toFixed(2)) : undefined,
    dividendYield: Math.random() > 0.3 ? parseFloat((Math.random() * 4).toFixed(2)) : undefined,
    avgVolume: Math.floor(stock.volume * (0.8 + Math.random() * 0.4)),
    week52High: parseFloat((stock.price * (1.1 + Math.random() * 0.2)).toFixed(2)),
    week52Low: parseFloat((stock.price * (0.7 - Math.random() * 0.2)).toFixed(2)),
    recommendation: generateRecommendation(stock),
    historicalData
  };
  
  return detail;
};

// Mock news data
const newsTopics = [
  'Earnings Report',
  'Product Launch',
  'Merger Announcement',
  'CEO Change',
  'Market Analysis',
  'Industry Trends',
  'Regulatory Update',
  'Economic Outlook',
  'Dividend Announcement',
  'Stock Split'
];

const newsSources = [
  'Bloomberg',
  'CNBC',
  'Reuters',
  'Wall Street Journal',
  'Financial Times',
  'MarketWatch',
  'Barron\'s',
  'Seeking Alpha',
  'The Motley Fool',
  'Yahoo Finance'
];

export const fetchMarketNews = async (): Promise<NewsItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const stocks = createMockStocks();
  const news: NewsItem[] = [];
  
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    
    const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
    const randomTopic = newsTopics[Math.floor(Math.random() * newsTopics.length)];
    const randomSource = newsSources[Math.floor(Math.random() * newsSources.length)];
    const sentiments = ['positive', 'negative', 'neutral'] as const;
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    let title = '';
    let summary = '';
    
    if (randomTopic === 'Earnings Report') {
      const beat = Math.random() > 0.5;
      title = `${randomStock.name} ${beat ? 'Beats' : 'Misses'} Q2 Earnings Expectations`;
      summary = `${randomStock.name} reported quarterly earnings of $${(Math.random() * 2 + 0.5).toFixed(2)} per share, ${beat ? 'exceeding' : 'falling short of'} analyst estimates of $${(Math.random() * 2 + 0.5).toFixed(2)}.`;
    } else if (randomTopic === 'Product Launch') {
      title = `${randomStock.name} Unveils New Product Line to Boost Market Share`;
      summary = `${randomStock.name} today announced the launch of its latest product innovation, aiming to strengthen its position in an increasingly competitive market.`;
    } else {
      title = `${randomTopic}: ${randomStock.name} ${Math.random() > 0.5 ? 'Surges' : 'Drops'} on ${randomTopic} News`;
      summary = `Investors react to ${randomStock.name}'s recent ${randomTopic.toLowerCase()} announcement, with analysts projecting significant implications for the company's future growth prospects.`;
    }
    
    news.push({
      id: `news-${i}`,
      title,
      summary,
      url: '#',
      source: randomSource,
      publishedAt: format(date, 'yyyy-MM-dd HH:mm:ss'),
      sentiment,
      relatedSymbols: [randomStock.symbol]
    });
  }
  
  return news;
};

// Search stocks
export const searchStocks = async (query: string): Promise<Stock[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!query.trim()) return [];
  
  const allStocks = createMockStocks();
  return allStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 7);
};
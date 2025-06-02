import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMarketSummary, fetchStockData, fetchTopGainers, fetchTopLosers } from '../services/stockApi';
import { Stock, MarketSummary, StockDetail } from '../types/stock';

interface StockDataContextType {
  loading: boolean;
  marketSummary: MarketSummary | null;
  topGainers: Stock[];
  topLosers: Stock[];
  watchlist: Stock[];
  portfolio: Stock[];
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  getStockDetails: (symbol: string) => Promise<StockDetail | null>;
  updateStockData: () => Promise<void>;
}

const StockDataContext = createContext<StockDataContextType | undefined>(undefined);

export const StockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null);
  const [topGainers, setTopGainers] = useState<Stock[]>([]);
  const [topLosers, setTopLosers] = useState<Stock[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [portfolio, setPortfolio] = useState<Stock[]>(() => {
    const saved = localStorage.getItem('portfolio');
    return saved ? JSON.parse(saved) : [];
  });

  // Function to fetch all stock data
  const updateStockData = async () => {
    try {
      setLoading(true);
      const [summaryData, gainersData, losersData] = await Promise.all([
        fetchMarketSummary(),
        fetchTopGainers(),
        fetchTopLosers()
      ]);
      
      setMarketSummary(summaryData);
      setTopGainers(gainersData);
      setTopLosers(losersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    updateStockData();
    
    // Set up interval to update data every 30 seconds
    const intervalId = setInterval(() => {
      updateStockData();
    }, 30000); // 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Save portfolio to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const addToWatchlist = (stock: Stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
      setWatchlist(prev => [...prev, stock]);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const getStockDetails = async (symbol: string): Promise<StockDetail | null> => {
    try {
      return await fetchStockData(symbol);
    } catch (error) {
      console.error(`Error fetching details for ${symbol}:`, error);
      return null;
    }
  };

  return (
    <StockDataContext.Provider 
      value={{
        loading,
        marketSummary,
        topGainers,
        topLosers,
        watchlist,
        portfolio,
        addToWatchlist,
        removeFromWatchlist,
        getStockDetails,
        updateStockData
      }}
    >
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error('useStockData must be used within a StockDataProvider');
  }
  return context;
};
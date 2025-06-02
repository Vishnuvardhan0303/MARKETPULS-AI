import React, { useState } from 'react';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';
import { useStockData } from '../context/StockDataContext';
import StockCard from '../components/StockCard';
import { Stock } from '../types/stock';
import { motion } from 'framer-motion';

type MarketRegion = 'us' | 'europe' | 'asia';
type SortOption = 'name' | 'price' | 'change' | 'volume';
type SortDirection = 'asc' | 'desc';

const Markets: React.FC = () => {
  const { loading, topGainers, topLosers } = useStockData();
  const [activeRegion, setActiveRegion] = useState<MarketRegion>('us');
  const [sortBy, setSortBy] = useState<SortOption>('change');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Combine and deduplicate stocks
  const allStocks: Stock[] = React.useMemo(() => {
    const combined = [...topGainers, ...topLosers];
    // Remove duplicates
    return combined.filter((stock, index, self) => 
      index === self.findIndex(s => s.symbol === stock.symbol)
    );
  }, [topGainers, topLosers]);
  
  const sortedStocks = React.useMemo(() => {
    return [...allStocks].sort((a, b) => {
      let compareResult = 0;
      
      switch (sortBy) {
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'price':
          compareResult = a.price - b.price;
          break;
        case 'change':
          compareResult = a.changePercent - b.changePercent;
          break;
        case 'volume':
          compareResult = a.volume - b.volume;
          break;
      }
      
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [allStocks, sortBy, sortDirection]);
  
  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      // Toggle direction if clicking the same option
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort option with default direction
      setSortBy(option);
      setSortDirection('desc');
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Globe size={24} className="text-sky-500 mr-2" />
        <h1 className="text-2xl font-bold">Global Markets</h1>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeRegion === 'us'
              ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveRegion('us')}
        >
          US Markets
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeRegion === 'europe'
              ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveRegion('europe')}
        >
          European Markets
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeRegion === 'asia'
              ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          onClick={() => setActiveRegion('asia')}
        >
          Asian Markets
        </button>
      </div>
      
      <div className="card overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                className={`text-sm font-medium flex items-center ${
                  sortBy === 'name' ? 'text-sky-600 dark:text-sky-400' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => handleSort('name')}
              >
                Company
                {sortBy === 'name' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button 
                className={`text-sm font-medium flex items-center ${
                  sortBy === 'price' ? 'text-sky-600 dark:text-sky-400' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => handleSort('price')}
              >
                Price
                {sortBy === 'price' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button 
                className={`text-sm font-medium flex items-center ${
                  sortBy === 'change' ? 'text-sky-600 dark:text-sky-400' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => handleSort('change')}
              >
                Change
                {sortBy === 'change' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button 
                className={`text-sm font-medium flex items-center ${
                  sortBy === 'volume' ? 'text-sky-600 dark:text-sky-400' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => handleSort('volume')}
              >
                Volume
                {sortBy === 'volume' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="p-4 animate-pulse">
                <div className="flex justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                  </div>
                  <div className="flex space-x-12">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="divide-y divide-gray-100 dark:divide-gray-800"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedStocks.map((stock) => (
              <motion.div 
                key={stock.symbol}
                variants={itemVariants}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/stock/${stock.symbol}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{stock.name}</div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-12 space-y-2 sm:space-y-0">
                    <div className="text-right sm:text-left font-medium">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className={`text-right sm:text-left font-medium flex items-center ${
                      stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp size={16} className="mr-1 hidden sm:inline" />
                      ) : (
                        <TrendingDown size={16} className="mr-1 hidden sm:inline" />
                      )}
                      {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                    <div className="text-right sm:text-left text-gray-600 dark:text-gray-400">
                      {stock.volume.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Markets;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Star, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Activity, 
  Award
} from 'lucide-react';
import { useStockData } from '../context/StockDataContext';
import { StockDetail as StockDetailType } from '../types/stock';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// Components
import StockChart from '../components/StockChart';
import AIRecommendationCard from '../components/AIRecommendationCard';

const StockDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const { getStockDetails, addToWatchlist, watchlist } = useStockData();
  const [stockDetails, setStockDetails] = useState<StockDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const isInWatchlist = watchlist.some(item => item.symbol === symbol);
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Fetch stock details
  useEffect(() => {
    const fetchDetails = async () => {
      if (!symbol) return;
      
      try {
        setLoading(true);
        const details = await getStockDetails(symbol);
        if (details) {
          setStockDetails(details);
        }
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching details for ${symbol}:`, error);
        setLoading(false);
      }
    };
    
    fetchDetails();
    
    // Refresh data every 30 seconds
    const intervalId = setInterval(() => {
      fetchDetails();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [symbol, getStockDetails]);
  
  const handleAddToWatchlist = () => {
    if (stockDetails) {
      addToWatchlist(stockDetails);
    }
  };
  
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!stockDetails) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Stock details not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-1">
            <h1 className="text-2xl font-bold">{stockDetails.symbol}</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-3">{stockDetails.exchange}</span>
            {!isInWatchlist ? (
              <button
                onClick={handleAddToWatchlist}
                className="ml-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Add to Watchlist"
              >
                <Star size={18} className="text-gray-400 hover:text-yellow-500" />
              </button>
            ) : (
              <div className="ml-3 p-1.5">
                <Star size={18} className="text-yellow-500" />
              </div>
            )}
          </div>
          <h2 className="text-lg text-gray-700 dark:text-gray-300">{stockDetails.name}</h2>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold">${stockDetails.price.toFixed(2)}</div>
          <div className={`flex items-center ${stockDetails.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
            {stockDetails.change >= 0 ? (
              <ArrowUpRight size={18} className="mr-1" />
            ) : (
              <ArrowDownRight size={18} className="mr-1" />
            )}
            <span>
              {stockDetails.change >= 0 ? '+' : ''}{stockDetails.change.toFixed(2)} ({stockDetails.changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
            <Clock size={12} className="mr-1" />
            {format(currentTime, 'MMM d, yyyy h:mm:ss a')}
          </div>
        </div>
      </div>
      
      <div className="card p-4">
        <StockChart 
          data={stockDetails.historicalData} 
          symbol={stockDetails.symbol}
          height={400}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <DollarSign size={16} className="mr-1" />
            <span className="text-sm">Open</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.open.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <DollarSign size={16} className="mr-1" />
            <span className="text-sm">Previous Close</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.previousClose.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <ArrowUpRight size={16} className="mr-1" />
            <span className="text-sm">Day High</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.high.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <ArrowDownRight size={16} className="mr-1" />
            <span className="text-sm">Day Low</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.low.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <Award size={16} className="mr-1" />
            <span className="text-sm">52w High</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.week52High.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <Award size={16} className="mr-1" />
            <span className="text-sm">52w Low</span>
          </div>
          <div className="text-lg font-medium">${stockDetails.week52Low.toFixed(2)}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <Activity size={16} className="mr-1" />
            <span className="text-sm">Volume</span>
          </div>
          <div className="text-lg font-medium">{stockDetails.volume.toLocaleString()}</div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
            <Activity size={16} className="mr-1" />
            <span className="text-sm">Avg Volume</span>
          </div>
          <div className="text-lg font-medium">{stockDetails.avgVolume.toLocaleString()}</div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Fundamentals</h3>
          
          <div className="card divide-y divide-gray-100 dark:divide-gray-800">
            <div className="p-4 flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-400">Market Cap</div>
              <div className="font-medium">{stockDetails.marketCap ? formatLargeNumber(stockDetails.marketCap) : 'N/A'}</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-400">P/E Ratio</div>
              <div className="font-medium">{stockDetails.pe.toFixed(2)}</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div className="text-gray-600 dark:text-gray-400">EPS</div>
              <div className="font-medium">${stockDetails.eps.toFixed(2)}</div>
            </div>
            {stockDetails.dividend !== undefined && (
              <div className="p-4 flex justify-between items-center">
                <div className="text-gray-600 dark:text-gray-400">Dividend</div>
                <div className="font-medium">${stockDetails.dividend.toFixed(2)}</div>
              </div>
            )}
            {stockDetails.dividendYield !== undefined && (
              <div className="p-4 flex justify-between items-center">
                <div className="text-gray-600 dark:text-gray-400">Dividend Yield</div>
                <div className="font-medium">{stockDetails.dividendYield.toFixed(2)}%</div>
              </div>
            )}
          </div>
        </div>
        
        {stockDetails.recommendation && (
          <AIRecommendationCard 
            recommendation={stockDetails.recommendation} 
            symbol={stockDetails.symbol} 
          />
        )}
      </div>
    </div>
  );
};

export default StockDetail;
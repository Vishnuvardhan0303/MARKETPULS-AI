import React, { useEffect, useState } from 'react';
import { Clock, TrendingUp, TrendingDown, Newspaper } from 'lucide-react';
import { useStockData } from '../context/StockDataContext';
import { fetchMarketNews } from '../services/stockApi';
import { NewsItem } from '../types/stock';
import { format } from 'date-fns';

// Components
import MarketIndexCard from '../components/MarketIndexCard';
import StockCard from '../components/StockCard';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { loading, marketSummary, topGainers, topLosers, updateStockData } = useStockData();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Fetch news
  useEffect(() => {
    const getNews = async () => {
      try {
        setNewsLoading(true);
        const newsData = await fetchMarketNews();
        setNews(newsData.slice(0, 3));
        setNewsLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsLoading(false);
      }
    };
    
    getNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Market Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} className="mr-1.5" />
          <span>{format(currentTime, 'EEEE, MMMM d, yyyy h:mm:ss a')}</span>
          <button 
            onClick={updateStockData}
            className="ml-4 text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : marketSummary ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <MarketIndexCard name="S&P 500" data={marketSummary.indexes.sp500} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MarketIndexCard name="NASDAQ" data={marketSummary.indexes.nasdaq} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MarketIndexCard name="DOW JONES" data={marketSummary.indexes.dowJones} />
          </motion.div>
        </motion.div>
      ) : (
        <div className="card p-4">
          <p className="text-gray-500 dark:text-gray-400">Market data unavailable</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center">
            <TrendingUp size={20} className="text-green-500 mr-2" />
            <h2 className="text-xl font-bold">Top Gainers</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                  </div>
                </div>
              ))
            ) : (
              topGainers.map((stock, index) => (
                <motion.div key={stock.symbol} variants={itemVariants}>
                  <StockCard stock={stock} />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
        
        {/* Top Losers */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center">
            <TrendingDown size={20} className="text-red-500 mr-2" />
            <h2 className="text-xl font-bold">Top Losers</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                  </div>
                </div>
              ))
            ) : (
              topLosers.map((stock, index) => (
                <motion.div key={stock.symbol} variants={itemVariants}>
                  <StockCard stock={stock} />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Latest News */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center">
            <Newspaper size={20} className="text-sky-500 mr-2" />
            <h2 className="text-xl font-bold">Latest Market News</h2>
          </div>
          <a href="/news" className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300">
            View all
          </a>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                </div>
              </div>
            ))
          ) : (
            news.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <NewsCard news={item} />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
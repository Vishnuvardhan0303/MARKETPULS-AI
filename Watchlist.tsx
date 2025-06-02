import React from 'react';
import { useStockData } from '../context/StockDataContext';
import { Star, AlertCircle } from 'lucide-react';
import StockCard from '../components/StockCard';
import { motion } from 'framer-motion';

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useStockData();
  
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
      <div className="flex items-center">
        <Star size={24} className="text-yellow-500 mr-2" />
        <h1 className="text-2xl font-bold">Your Watchlist</h1>
      </div>
      
      {watchlist.length === 0 ? (
        <motion.div 
          className="card p-6 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle size={48} className="text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Add stocks to your watchlist to keep track of your favorite investments and get quick access to their performance.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {watchlist.map((stock) => (
            <motion.div key={stock.symbol} variants={itemVariants}>
              <div className="relative group">
                <StockCard stock={stock} showAddToWatchlist={false} />
                <button
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWatchlist(stock.symbol);
                  }}
                  title="Remove from Watchlist"
                >
                  <Star size={16} className="text-yellow-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Watchlist;
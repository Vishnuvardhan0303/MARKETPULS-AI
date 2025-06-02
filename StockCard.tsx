import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Star, BarChart3 } from 'lucide-react';
import { Stock } from '../types/stock';
import { useStockData } from '../context/StockDataContext';
import { motion } from 'framer-motion';

interface StockCardProps {
  stock: Stock;
  showAddToWatchlist?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ stock, showAddToWatchlist = true }) => {
  const navigate = useNavigate();
  const { addToWatchlist, watchlist } = useStockData();
  const isInWatchlist = watchlist.some(item => item.symbol === stock.symbol);
  
  const handleClick = () => {
    navigate(`/stock/${stock.symbol}`);
  };
  
  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWatchlist(stock);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card p-4 cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{stock.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{stock.name}</p>
        </div>
        <div className="flex space-x-2">
          {showAddToWatchlist && !isInWatchlist && (
            <button
              onClick={handleAddToWatchlist}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Add to Watchlist"
            >
              <Star size={16} className="text-gray-400 hover:text-yellow-500" />
            </button>
          )}
          {isInWatchlist && (
            <div className="p-1.5">
              <Star size={16} className="text-yellow-500" />
            </div>
          )}
          <div className="p-1.5">
            <BarChart3 size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-end">
        <div>
          <span className="text-xl font-bold">${stock.price.toFixed(2)}</span>
        </div>
        <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          {stock.change >= 0 ? (
            <ArrowUpRight size={16} className="mr-1" />
          ) : (
            <ArrowDownRight size={16} className="mr-1" />
          )}
          <span className="font-medium">
            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StockCard;
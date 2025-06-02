import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { IndexData } from '../types/stock';
import { motion } from 'framer-motion';

interface MarketIndexCardProps {
  name: string;
  data: IndexData;
}

const MarketIndexCard: React.FC<MarketIndexCardProps> = ({ name, data }) => {
  return (
    <motion.div 
      className="card p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold">{name}</h3>
      
      <div className="mt-2 flex justify-between items-end">
        <div>
          <span className="text-xl font-bold">{data.value.toFixed(2)}</span>
        </div>
        <div className={`flex items-center ${data.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
          {data.change >= 0 ? (
            <ArrowUpRight size={16} className="mr-1" />
          ) : (
            <ArrowDownRight size={16} className="mr-1" />
          )}
          <span className="font-medium">
            {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketIndexCard;
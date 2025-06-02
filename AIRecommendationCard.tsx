import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, Pause } from 'lucide-react';
import { AIRecommendation } from '../types/stock';
import { motion } from 'framer-motion';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  symbol: string;
}

const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ recommendation, symbol }) => {
  const { action, confidence, reason, timeFrame } = recommendation;
  
  const getActionColor = () => {
    switch (action) {
      case 'buy': return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'sell': return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'hold': return 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }
  };
  
  const getActionIcon = () => {
    switch (action) {
      case 'buy': return <TrendingUp className="h-5 w-5 mr-1.5" />;
      case 'sell': return <TrendingDown className="h-5 w-5 mr-1.5" />;
      case 'hold': return <Pause className="h-5 w-5 mr-1.5" />;
    }
  };
  
  const getConfidenceColor = () => {
    if (confidence >= 80) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getTimeFrameLabel = () => {
    switch (timeFrame) {
      case 'short': return 'Short-term (Days to Weeks)';
      case 'medium': return 'Medium-term (1-3 Months)';
      case 'long': return 'Long-term (3+ Months)';
    }
  };

  return (
    <motion.div 
      className="card p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Sparkles className="h-5 w-5 text-sky-500 mr-2" />
          AI Recommendation
        </h3>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {symbol}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
        <div className="mb-3 sm:mb-0">
          <div className={`inline-flex items-center px-3 py-1.5 rounded-lg font-medium capitalize text-sm ${getActionColor()}`}>
            {getActionIcon()}
            {action}
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Confidence</div>
          <div className="flex items-center">
            <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
              <div 
                className={`h-2 rounded-full ${
                  confidence >= 80 ? 'bg-green-500' : 
                  confidence >= 60 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getConfidenceColor()}`}>{confidence}%</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time Frame: <span className="text-gray-600 dark:text-gray-400">{getTimeFrameLabel()}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{reason}</p>
      </div>
      
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic">
        This recommendation is based on technical analysis, market trends, and sentiment analysis.
      </div>
    </motion.div>
  );
};

export default AIRecommendationCard;
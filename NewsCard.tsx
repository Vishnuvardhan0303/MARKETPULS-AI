import React from 'react';
import { NewsItem } from '../types/stock';
import { ArrowUpRight, TrendingUp, TrendingDown, MinusCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getSentimentIcon = () => {
    switch (news.sentiment) {
      case 'positive':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'negative':
        return <TrendingDown size={16} className="text-red-500" />;
      case 'neutral':
      default:
        return <MinusCircle size={16} className="text-gray-400" />;
    }
  };
  
  const getSentimentText = () => {
    switch (news.sentiment) {
      case 'positive':
        return 'text-green-600 dark:text-green-500';
      case 'negative':
        return 'text-red-600 dark:text-red-500';
      case 'neutral':
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <motion.div 
      className="card hover:shadow-md transition-all duration-200"
      whileHover={{ y: -2 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold line-clamp-2">{news.title}</h3>
          {news.sentiment && (
            <div className="ml-2 mt-1 flex-shrink-0">{getSentimentIcon()}</div>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {news.summary}
        </p>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center">
            <span className="font-medium">{news.source}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400">
              {format(parseISO(news.publishedAt), 'MMM d, h:mm a')}
            </span>
          </div>
          
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
            onClick={(e) => e.stopPropagation()}
          >
            Read
            <ArrowUpRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
      
      {news.relatedSymbols && news.relatedSymbols.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Related:</span>
            <div className="flex flex-wrap gap-1">
              {news.relatedSymbols.map(symbol => (
                <span 
                  key={symbol} 
                  className={`text-xs px-2 py-0.5 rounded ${getSentimentText()} bg-gray-100 dark:bg-gray-700`}
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NewsCard;
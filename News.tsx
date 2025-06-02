import React, { useEffect, useState } from 'react';
import { Newspaper, Search } from 'lucide-react';
import { fetchMarketNews } from '../services/stockApi';
import { NewsItem } from '../types/stock';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  
  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchMarketNews();
        setNews(newsData);
        setFilteredNews(newsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
    
    getNews();
  }, []);
  
  useEffect(() => {
    let filtered = news;
    
    // Apply sentiment filter
    if (filter !== 'all') {
      filtered = filtered.filter(item => item.sentiment === filter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.summary.toLowerCase().includes(query) ||
          (item.relatedSymbols && item.relatedSymbols.some(symbol => symbol.toLowerCase().includes(query)))
      );
    }
    
    setFilteredNews(filtered);
  }, [news, searchQuery, filter]);
  
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
        <Newspaper size={24} className="text-sky-500 mr-2" />
        <h1 className="text-2xl font-bold">Market News</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-2 rounded-lg font-medium text-sm ${
              filter === 'all'
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-2 rounded-lg font-medium text-sm ${
              filter === 'positive'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setFilter('positive')}
          >
            Positive
          </button>
          <button
            className={`px-3 py-2 rounded-lg font-medium text-sm ${
              filter === 'negative'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setFilter('negative')}
          >
            Negative
          </button>
          <button
            className={`px-3 py-2 rounded-lg font-medium text-sm ${
              filter === 'neutral'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setFilter('neutral')}
          >
            Neutral
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9).fill(0).map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredNews.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredNews.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <NewsCard news={item} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="card p-6 flex flex-col items-center justify-center text-center">
          <Newspaper size={48} className="text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No news found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try changing your search criteria or filter settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default News;
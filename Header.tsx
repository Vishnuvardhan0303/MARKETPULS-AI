import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { searchStocks } from '../services/stockApi';
import { Stock } from '../types/stock';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const results = await searchStocks(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  
  const handleSelectStock = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20">
      <div className="px-4 py-3 sm:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-2 md:ml-0">
            MarketPulse AI
          </h1>
        </div>
        
        <div className="flex-1 max-w-xl mx-4 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search stocks, indices..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                        bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                        focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-600"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
          </div>
          
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <ul className="max-h-60 overflow-auto">
                  {searchResults.map((stock) => (
                    <li 
                      key={stock.symbol}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSelectStock(stock.symbol)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                        <div className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                          ${stock.price.toFixed(2)}
                          <span className="ml-2">
                            {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            type="button"
            className="rounded-full p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="View notifications"
            onClick={() => {}}
          >
            <Bell size={20} />
          </button>
          
          <div className="relative">
            <button
              type="button"
              className="rounded-full p-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              aria-label="User menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User size={20} />
            </button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="py-1">
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                    >
                      Your Profile
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                    >
                      Settings
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowUserMenu(false);
                        // Handle logout
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
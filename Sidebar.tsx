import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  Star, 
  Briefcase, 
  Globe, 
  Newspaper,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigation = [
    { name: 'Dashboard', to: '/', icon: Home },
    { name: 'Markets', to: '/markets', icon: Globe },
    { name: 'Watchlist', to: '/watchlist', icon: Star },
    { name: 'Portfolio', to: '/portfolio', icon: Briefcase },
    { name: 'Charts', to: '/charts', icon: LineChart },
    { name: 'News', to: '/news', icon: Newspaper },
  ];

  const secondaryNavigation = [
    { name: 'Settings', to: '/settings', icon: Settings },
    { name: 'Help', to: '/help', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <LineChart className="h-8 w-8 text-sky-500" />
          <span className="ml-2 font-bold text-xl text-gray-900 dark:text-white">MarketPulse</span>
        </div>
        <button 
          onClick={onClose}
          className="md:hidden rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
              }
              onClick={() => window.innerWidth < 768 && onClose()}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Support
          </h3>
          <nav className="mt-2 px-3 space-y-1">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      <motion.div 
        className="p-4 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-sky-400 to-blue-600 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium">
            MP
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Pro Account</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Market data in real-time</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
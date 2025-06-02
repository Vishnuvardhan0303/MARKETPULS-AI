import React, { useState } from 'react';
import { Briefcase, PlusCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Briefcase size={24} className="text-sky-500 mr-2" />
        <h1 className="text-2xl font-bold">Your Portfolio</h1>
      </div>
      
      {showPlaceholder ? (
        <motion.div 
          className="card p-6 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle size={48} className="text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Portfolio tracking coming soon</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
            In the next update, you'll be able to track your investments, monitor performance, and receive AI-powered recommendations for your portfolio.
          </p>
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => setShowPlaceholder(false)}
          >
            <PlusCircle size={18} className="mr-2" />
            Preview Portfolio View
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Value</h3>
              <div className="text-2xl font-bold">$24,351.67</div>
              <div className="text-green-600 dark:text-green-500 text-sm font-medium">
                +$432.19 (1.8%) today
              </div>
            </motion.div>
            
            <motion.div 
              className="card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Gain/Loss</h3>
              <div className="text-2xl font-bold">+$3,842.50</div>
              <div className="text-green-600 dark:text-green-500 text-sm font-medium">
                +18.7% all time
              </div>
            </motion.div>
            
            <motion.div 
              className="card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Cash Balance</h3>
              <div className="text-2xl font-bold">$5,421.93</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                22.3% of portfolio
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="card overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Your Holdings</h3>
                <button className="btn btn-outline text-sm flex items-center">
                  <PlusCircle size={16} className="mr-1.5" />
                  Add Position
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">AAPL</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Apple Inc.</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$5,834.25</div>
                    <div className="text-green-600 dark:text-green-500 text-sm">+$142.50 (2.5%)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500 dark:text-gray-400">32 shares @ $174.25</div>
                  <div className="text-gray-500 dark:text-gray-400">24.0% of portfolio</div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">MSFT</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Microsoft Corporation</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$4,526.75</div>
                    <div className="text-green-600 dark:text-green-500 text-sm">+$97.50 (2.2%)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500 dark:text-gray-400">12 shares @ $372.50</div>
                  <div className="text-gray-500 dark:text-gray-400">18.6% of portfolio</div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">GOOGL</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Alphabet Inc.</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$3,587.25</div>
                    <div className="text-red-600 dark:text-red-500 text-sm">-$42.75 (-1.2%)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500 dark:text-gray-400">25 shares @ $145.20</div>
                  <div className="text-gray-500 dark:text-gray-400">14.7% of portfolio</div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">AMZN</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Amazon.com Inc.</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$2,845.44</div>
                    <div className="text-green-600 dark:text-green-500 text-sm">+$65.44 (2.4%)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500 dark:text-gray-400">18 shares @ $156.32</div>
                  <div className="text-gray-500 dark:text-gray-400">11.7% of portfolio</div>
                </div>
              </div>
              
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">TSLA</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tesla, Inc.</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$2,136.05</div>
                    <div className="text-red-600 dark:text-red-500 text-sm">-$87.50 (-3.9%)</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500 dark:text-gray-400">10 shares @ $221.35</div>
                  <div className="text-gray-500 dark:text-gray-400">8.8% of portfolio</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
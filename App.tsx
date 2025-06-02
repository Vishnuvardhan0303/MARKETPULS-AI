import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Watchlist from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Markets from './pages/Markets';
import News from './pages/News';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// Context
import { ThemeProvider } from './context/ThemeContext';
import { StockDataProvider } from './context/StockDataContext';

function App() {
  return (
    <ThemeProvider>
      <StockDataProvider>
        <Router>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="stock/:symbol" element={<StockDetail />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="markets" element={<Markets />} />
                <Route path="news" element={<News />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </motion.div>
        </Router>
      </StockDataProvider>
    </ThemeProvider>
  );
}

export default App;
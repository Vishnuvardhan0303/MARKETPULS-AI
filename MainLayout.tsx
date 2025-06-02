import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for mobile - overlay */}
      <div className={`md:hidden ${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-30 bg-gray-600 bg-opacity-75 transition-opacity`} 
           onClick={closeSidebar}
      />
      
      {/* Sidebar */}
      <motion.div 
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform 
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        initial={false}
        animate={{ 
          x: sidebarOpen || window.innerWidth >= 768 ? 0 : -256,
          opacity: 1 
        }}
      >
        <Sidebar onClose={closeSidebar} />
      </motion.div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
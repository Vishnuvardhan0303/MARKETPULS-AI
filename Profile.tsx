import React from 'react';
import { User, Mail, Phone, MapPin, Building, Calendar, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <User size={24} className="text-sky-500 mr-2" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card p-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Edit size={14} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">Premium Member</p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center text-sm">
                <Mail size={16} className="text-gray-400 mr-2" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center justify-center text-sm">
                <Phone size={16} className="text-gray-400 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center text-sm">
                <MapPin size={16} className="text-gray-400 mr-2" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Account Details */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value="John"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value="Doe"
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value="john.doe@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value="+1 (555) 123-4567"
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <div className="flex items-center">
                    <Building size={16} className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      value="Acme Corp"
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member Since
                  </label>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      value="January 2024"
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Subscription */}
      <motion.div 
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">Premium Subscription</h3>
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-xl font-bold">Premium Plan</h4>
              <p className="text-sky-100">Next billing date: March 1, 2024</p>
            </div>
            <button className="px-4 py-2 bg-white text-sky-600 rounded-lg hover:bg-sky-50">
              Manage Plan
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm text-sky-100">Real-time Data</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Pro</div>
              <div className="text-sm text-sky-100">AI Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-sky-100">Support</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
'use client';

import { motion } from 'framer-motion';
import { AdjustmentsHorizontalIcon, XMarkIcon, SparklesIcon, FireIcon, TagIcon } from '@heroicons/react/24/outline';

export default function UserSidebar({ 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  priceRange,
  setPriceRange,
  onClose 
}) {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg h-[calc(100vh-4rem)] p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800"
    >
      <div className="space-y-8">
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end">
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <XMarkIcon className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <SparklesIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory(category);
                  onClose?.();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <TagIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 dark:accent-blue-400"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>$0</span>
                <span>$2000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <FireIcon className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
            Quick Filters
          </h3>
          <div className="space-y-2">
            {['Best Sellers', 'New Arrivals', 'Special Offers'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-left px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import UserSidebar from '@/components/UserSidebar';
import ProductGrid from '@/components/user/ProductGrid';
import { motion } from 'framer-motion';
import { products, categories } from '@/data/products';
import { FunnelIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("popular");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    redirect('/login');
  }

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.price >= priceRange[0] && 
    product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FunnelIcon className="h-6 w-6" />
        </button>

        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out z-30
        `}>
          <UserSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user.name}!
                </h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products count */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Showing {filteredProducts.length} products
              </p>

              {/* Products Grid */}
              <ProductGrid products={filteredProducts} sortBy={sortBy} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/features/cartSlice';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProductGrid({ products, sortBy }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return b.reviews - a.reviews; // popular
    }
  });

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    toast.success('Added to cart!');
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
    >
      {sortedProducts.map((product) => (
        <motion.div
          key={product.id}
          variants={item}
          onHoverStart={() => setHoveredId(product.id)}
          onHoverEnd={() => setHoveredId(null)}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 border border-gray-200/50 dark:border-gray-700/50"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${
                hoveredId === product.id ? 'scale-110' : 'scale-100'
              } ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))}
            />
            {!loadedImages[product.id] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: hoveredId === product.id ? 1 : 0, y: hoveredId === product.id ? 0 : -10 }}
              className="absolute top-2 right-2 space-y-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
              >
                <HeartIcon className="h-4 w-4 text-red-500" />
              </motion.button>
            </motion.div>

            {/* Category Tag */}
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-1 text-xs rounded-full bg-black/20 dark:bg-white/20 backdrop-blur-sm text-white">
                {product.category}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            {/* Title and Price */}
            <div className="flex justify-between items-start mb-2">
              <motion.h3 
                className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1"
                layout
              >
                {product.name}
              </motion.h3>
              <motion.span 
                className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                layout
              >
                ${product.price.toFixed(2)}
              </motion.span>
            </div>
            
            {/* Description */}
            <motion.p 
              className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 min-h-[2.5rem]"
              layout
            >
              {product.description}
            </motion.p>
            
            {/* Rating and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(product)}
                disabled={cart.some(item => item.id === product.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  cart.some(item => item.id === product.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                <ShoppingCartIcon className="h-3 w-3" />
                <span>
                  {cart.some(item => item.id === product.id) ? 'Added' : 'Add'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 
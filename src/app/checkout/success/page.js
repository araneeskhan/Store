'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto" />
          </motion.div>
          
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Order Successful!
          </h1>
          
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="mt-8 space-x-4">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
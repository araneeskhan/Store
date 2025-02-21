'use client';

import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { removeItem, updateQuantity, clearCart } from '@/store/features/cartSlice';
import { TrashIcon, MinusIcon, PlusIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addOrder } from '@/store/features/orderSlice';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  // Calculate subtotal, tax, and shipping
  const subtotal = total;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const finalTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Create order from cart items
    const order = {
      items: items,
      total: finalTotal,
      tax,
      shipping,
      subtotal
    };

    // Simulate checkout process
    setTimeout(() => {
      dispatch(addOrder(order));
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      router.push('/checkout/success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="p-6 flex items-center"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>

                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => dispatch(updateQuantity({ 
                            id: item.id, 
                            quantity: Math.max(1, item.quantity - 1)
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5" />
                    <span>Checkout</span>
                  </>
                )}
              </button>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                Free shipping on orders over $100
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 
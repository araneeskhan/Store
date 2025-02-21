'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AdminSidebar from '@/components/AdminSidebar';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';

export default function AdminPage() {
  const { user, isAdmin } = useSelector(state => state.auth);
  const [activeView, setActiveView] = useState('products');

  if (!user || !isAdmin) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Admin Dashboard
              </h1>

              {activeView === 'products' && (
                <div className="space-y-8">
                  <ProductForm />
                  <ProductList />
                </div>
              )}
              
              {/* Add other admin views here */}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 
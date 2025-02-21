'use client';

import { motion } from 'framer-motion';
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { id: 'products', label: 'Products', icon: ShoppingBagIcon },
  { id: 'categories', label: 'Categories', icon: TagIcon },
  { id: 'orders', label: 'Orders', icon: ChartBarIcon },
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'settings', label: 'Settings', icon: CogIcon },
];

export default function AdminSidebar({ activeView, setActiveView }) {
  return (
    <div className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)] p-4">
      <div className="space-y-4">
        <div className="px-4 py-2">
          <h2 className="text-xs uppercase font-semibold text-gray-500">
            Admin Menu
          </h2>
        </div>

        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeView === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 
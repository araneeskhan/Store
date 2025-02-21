'use client'

import { motion } from 'framer-motion'
import { RocketLaunchIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: SparklesIcon,
    title: "AI-Powered Recommendations",
    description: "Get personalized product suggestions based on your preferences and browsing history."
  },
  {
    icon: RocketLaunchIcon,
    title: "Lightning Fast Checkout",
    description: "Experience seamless one-click purchasing with our optimized checkout process."
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Transactions",
    description: "Shop with confidence knowing your data is protected by state-of-the-art security."
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose AI Store?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with user-friendly design to create 
            the ultimate shopping experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-6 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 
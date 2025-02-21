"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import heroBg from "../../public/images/hero-bg.jpg";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay and Gradient */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="AI Store Background"
          fill
          className="object-cover scale-[1.02] transform transition-transform duration-[20s] hover:scale-110"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Animated Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-blue-500 mx-auto mb-8"
          />

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              AI-Powered
            </span>{" "}
            Shopping Revolution
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of e-commerce with our{" "}
            <span className="text-blue-400">intelligent</span> shopping platform.
            Personalized recommendations and seamless transactions await you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,153,225,0.5)] hover:scale-105"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            <Link
              href="/login"
              className="group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg relative overflow-hidden transition-all duration-300 hover:border-blue-400"
            >
              <span className="relative z-10 group-hover:text-blue-400 transition-colors duration-300">
                Login
              </span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements - Adjust positions */}
        <motion.div
          className="absolute left-[5%] top-1/4 w-20 h-20 border border-blue-500/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute right-[5%] bottom-1/4 w-32 h-32 border-2 border-purple-500/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            rotate: -360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              className="w-2 h-3 bg-white/70 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

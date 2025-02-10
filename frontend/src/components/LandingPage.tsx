import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const LandingPage: React.FC<{ onStartChat: () => void }> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2f] via-[#1e1e2f] to-[#1e2330] opacity-80" />

      {/* Content container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center"
      >
        {/* Main branding */}
        <div className="text-center mb-6">
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-4"
          >
            <motion.img 
              src="/icon.png" 
              alt="PEST-AI Logo" 
              className="w-20 h-20 lg:w-32 lg:h-32"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 mb-3"
          >
            PEST-AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto"
          >
            Your intelligent documentation chat assistant
          </motion.p>
        </div>

        {/* Feature box with glass effect */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Academic chat icon */}
            <motion.div
              className="w-16 h-16 text-purple-400"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-full h-full"
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 7v14" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              </svg>
            </motion.div>

            {/* Feature title */}
            <h2 className="text-xl font-semibold text-white">
              Interactive Documentation Chat
            </h2>

            {/* Feature description */}
            <p className="text-gray-300 max-w-2xl text-sm lg:text-base">
              <strong>AI-powered search</strong> through PEST manuals using semantic understanding and BM25 technology.
              Get accurate, technically-grounded answers leveraging chapter metadata and summaries.
            </p>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartChat}
              className="mt-4 px-6 py-3 bg-purple-600 rounded-full text-base lg:text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Start Exploring PEST
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Background decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Top right glow */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-purple-500/30 rounded-full blur-3xl" />
        </div>

        {/* Bottom left glow */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-purple-500/30 rounded-full blur-3xl" />
        </div>

        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}; 
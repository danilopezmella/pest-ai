import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/pest-ai/chat');
  };

  return (
    <div className="min-h-screen bg-[#0f1518] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background gradient overlay - Más oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0f] via-[#0f1518] to-[#162024] opacity-95" />

      {/* Content container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center"
      >
        {/* Main branding */}
        <div className="text-center mb-6">
          {/* Logo con brillo más intenso */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-4"
          >
            <motion.img 
              src="/pest-ai/icon.png"
              alt="PEST-AI Logo" 
              className="w-20 h-20 lg:w-32 lg:h-32 drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]"
            />
          </motion.div>

          {/* Title - Blanco más puro */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-teal-400 mb-3"
          >
            PEST-AI
          </motion.h1>

          {/* Subtitle más brillante */}
          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-2xl text-white mb-6 max-w-2xl mx-auto"
          >
            Your intelligent documentation chat assistant
          </motion.p>
        </div>

        {/* Feature box - Más oscuro con bordes más brillantes */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl bg-gradient-to-b from-black/40 to-[#0f1518]/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10 shadow-black/50"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon con más contraste */}
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-teal-300 to-teal-800 text-white p-3 rounded-2xl shadow-lg shadow-black/50"
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-full h-full drop-shadow-2xl"
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <path d="M8 10h8" />
                <path d="M8 14h6" />
              </svg>
            </motion.div>

            {/* Feature title blanco puro */}
            <h2 className="text-xl font-semibold text-white">
              Interactive Documentation Chat
            </h2>

            {/* Feature description con mayor contraste */}
            <p className="text-white/90 max-w-2xl text-sm lg:text-base">
              <strong className="text-teal-200">AI-powered search</strong> through PEST manuals using semantic understanding and BM25 technology.
              Get accurate, technically-grounded answers leveraging chapter metadata and summaries.
            </p>

            {/* CTA Button con más contraste */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartChat}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-teal-300 to-teal-600 rounded-full text-base lg:text-lg font-semibold hover:from-teal-400 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-300/50 border border-white/20 text-white"
            >
              Start Exploring PEST
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Background decorations con más contraste */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        {/* Top right glow */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-teal-700/30 rounded-full blur-3xl" />
        </div>

        {/* Bottom left glow */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2">
          <div className="w-full h-full bg-gradient-to-tr from-teal-800/40 to-white/20 rounded-full blur-3xl" />
        </div>

        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="w-full h-full bg-gradient-to-r from-teal-700/20 via-white/10 to-teal-700/20 rounded-full blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}; 
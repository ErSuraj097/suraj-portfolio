'use client';

import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient opacity-30"></div>
      
      <div className="relative z-10 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-semibold gradient-text-primary">Loading</h2>
          <p className="text-white/70">Preparing your experience...</p>
        </motion.div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: '50%',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.h1 
          className="text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          ICONIC
        </motion.h1>
        <motion.p 
          className="text-2xl text-gray-400 tracking-widest mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          A JOURNEY THROUGH SNEAKER HISTORY
        </motion.p>
        <motion.div
          className="text-white/50 text-sm flex items-center justify-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span>↓</span>
        </motion.div>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
};
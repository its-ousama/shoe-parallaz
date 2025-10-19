import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Shoe } from '../types';




interface ShoeSectionProps {
  shoe: Shoe;
  index: number;
  totalShoes: number;
}

export const ShoeSection = ({ shoe, index, totalShoes }: ShoeSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll within THIS section specifically
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Track from when section enters to when it leaves
  });
  
  // Scale grows as you scroll through the section
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.7, 1, 1.5]
  );
  
  // Rotation
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-20, 0, 15]
  );
  
  // Shoe moves up as it scales
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [200, 0, -150]
  );
  
  // Text fades out in the middle of scrolling
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7],
    [0, 1, 1, 0]
  );
  
  const textY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7],
    [50, 0, -100]
  );

  // Smooth animations
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center sticky top-0 overflow-hidden bg-gradient-to-br ${shoe.colorScheme.bg}`}
    >
      <div className="container mx-auto px-8 h-screen flex items-center justify-between gap-16 relative">
        
        {/* Text Content - Fades in then out */}
        <motion.div 
          className="flex-1 z-20"
          style={{ 
            opacity: textOpacity,
            y: textY
          }}
        >
          <motion.div 
            className={`text-sm tracking-widest mb-4 ${shoe.colorScheme.accent} font-semibold`}
          >
            {shoe.brand.toUpperCase()}
          </motion.div>
          
          <h2 className="text-7xl font-black mb-6 text-white leading-tight">
            {shoe.name}
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            {shoe.description}
          </p>
          
          <div className={`${shoe.colorScheme.card} backdrop-blur-sm p-6 rounded-2xl border border-white/10 max-w-lg`}>
            <div className="text-sm text-gray-400 mb-4 font-semibold">KEY FEATURES</div>
            <div className="flex gap-3 flex-wrap">
              {shoe.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-white"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className={`mt-6 text-4xl font-bold ${shoe.colorScheme.accent}`}>
              EST. {shoe.year}
            </div>
          </div>
        </motion.div>

        {/* Shoe Image - GROWS as you scroll through section */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          style={{ 
            scale: smoothScale,
            y: smoothY,
            rotate: smoothRotate
          }}
        >
          <div className="relative w-[700px] h-[700px]">
            {/* Glow effect */}
            <motion.div 
              className={`absolute inset-0 blur-3xl ${
                shoe.brand === 'Nike' ? 'bg-red-500/40' : 'bg-green-500/40'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            {/* SHOE IMAGE */}
            <motion.img
              src={shoe.image}
              alt={shoe.name}
              className="relative w-full h-full object-contain drop-shadow-2xl z-10"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  shoe.brand === 'Nike' ? 'bg-red-400/30' : 'bg-green-400/30'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -60, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Section number */}
      <motion.div 
        className="absolute bottom-8 right-8 text-white/10 text-9xl font-black pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        {String(index).padStart(2, '0')}
      </motion.div>
    </section>
  );
};
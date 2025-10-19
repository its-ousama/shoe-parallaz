import { motion } from 'framer-motion';
import type { Shoe } from '../types';

interface NavbarProps {
  currentSection: number;
  shoes: Shoe[];
}

export const Navbar = ({ currentSection, shoes }: NavbarProps) => {
  const currentShoe = shoes[currentSection - 1];
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center">
        <motion.div 
          className="text-2xl font-bold tracking-wider"
          animate={{ 
            color: currentSection === 0 ? '#ffffff' : 
                   currentShoe?.brand === 'Nike' ? '#ff0000' : '#00ff00'
          }}
        >
          LEGACY
        </motion.div>
        <div className="flex gap-8 text-sm">
          {shoes.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                currentSection === idx + 1 ? 'bg-white w-12' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
};
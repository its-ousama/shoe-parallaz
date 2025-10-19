import { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShoeSection } from './components/ShoeSection';
import { Footer } from './components/Footer';
import { shoes } from './data/shoes';
import { ContactSection } from './components/ContactSection';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const section = Math.floor(latest * (shoes.length + 2));
      setCurrentSection(section);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="bg-black text-white">
      <Navbar currentSection={currentSection} shoes={shoes} />
      
      <HeroSection />
      
      {/* All shoe sections stacked - they'll blend together */}
      <div className="relative">
        {shoes.map((shoe, index) => (
          <ShoeSection 
            key={shoe.id} 
            shoe={shoe} 
            index={index + 1} 
            totalShoes={shoes.length}
          />
        ))}
      </div>

      <ContactSection />

      <Footer />
    </div>
  );
}

export default App;
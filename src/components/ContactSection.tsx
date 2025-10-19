import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import contactShoe from '../assets/contact-img.png';

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the shoe
  const shoeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.2]);
  const shoeRotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);
  const shoeY = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const smoothScale = useSpring(shoeScale, { stiffness: 100, damping: 30 });
  const smoothRotate = useSpring(shoeRotate, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(shoeY, { stiffness: 100, damping: 30 });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    // Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);

    // If no errors, "submit" (just show success message)
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Contact Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <motion.h2 
              className="text-6xl font-black text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              GET IN TOUCH
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Have a question or want to collaborate? Drop us a message!
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  ✓
                </motion.div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-gray-300">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-6 py-4 bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all backdrop-blur-sm`}
                  />
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full px-6 py-4 bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all backdrop-blur-sm`}
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    className={`w-full px-6 py-4 bg-white/5 border ${
                      errors.message ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all resize-none backdrop-blur-sm`}
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Giant Shoe - Right Side */}
          <motion.div
            className="relative order-1 lg:order-2 flex items-center justify-center"
            style={{
              scale: smoothScale,
              rotate: smoothRotate,
              y: smoothY
            }}
          >
            <div className="relative w-full h-[600px]">
              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 bg-purple-500/30 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                
                <img 
                      src={contactShoe} 
                      alt="Contact Shoe" 
                      className="w-full h-full object-contain drop-shadow-2xl" 
                />
              </motion.div>

              {/* Floating rings around shoe */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-purple-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"></div>
    </section>
  );
};
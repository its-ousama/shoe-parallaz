import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-6xl font-black mb-4 text-white">THE LEGACY CONTINUES</h2>
        <p className="text-gray-400 text-xl">More stories. More icons. More history.</p>
      </motion.div>
    </section>
  );
};
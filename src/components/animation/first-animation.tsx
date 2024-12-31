'use client';

import { motion } from 'framer-motion';

import { ClapIcon } from '@/components/ui/clap';

export default function FirstAnimation() {
  return (
    <motion.div
      className="relative flex h-screen w-screen flex-col items-center justify-center bg-[#0A0A0A]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="scale-150"
        animate={{ scale: [1.5, 1.8, 1.5] }}
        transition={{
          duration: 1,
          times: [0, 0.5, 1],
          repeat: 0,
          ease: 'easeInOut',
        }}
      >
        <ClapIcon size={60} />
      </motion.div>
      <motion.h1
        className="absolute bottom-8 text-3xl font-bold tracking-wider"
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        REELHYPE
      </motion.h1>
    </motion.div>
  );
}

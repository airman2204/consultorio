'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1.5 bg-primary-pink origin-left z-50"
    />
  );
}

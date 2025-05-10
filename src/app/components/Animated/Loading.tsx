"use client"

import React from 'react'
import { motion } from "motion/react"

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
    },
  },
};

const dotVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function LoadingDots() {
  return (
    <motion.div
      className="flex gap-2 justify-center items-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="w-3 h-3 rounded-full bg-blue-500"
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
}
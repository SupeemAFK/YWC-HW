"use client"

import React from 'react'
import { motion } from "motion/react"

interface Props {
  className?: string
  children: React.ReactNode
}

function UpDown(props: Props) {
  return (
    <motion.div
        className={props.className}
        animate={{ y: [0, -20, 0] }}
        transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
        }}
    >
        {props.children}
    </motion.div>
  )
}

export default UpDown
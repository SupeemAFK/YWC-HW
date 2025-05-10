"use client"

import React from 'react'
import { motion } from "motion/react"

interface Props {
  className?: string
  children: React.ReactNode
  isHover: boolean
}

function UpDownHover(props: Props) {
  return (
    <motion.div
        className={props.className}
        animate={
            props.isHover ? { 
                y: [0, -20, 0], 
                transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                } 
            } : { y: 0 }
        }
    >
        {props.children}
    </motion.div>
  )
}

export default UpDownHover
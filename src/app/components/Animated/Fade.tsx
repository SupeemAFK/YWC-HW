"use client"

import React from 'react'
import { motion } from "motion/react"

interface Props {
  className?: string
  children: React.ReactNode
  animKey: string
}

function Fade(props: Props) {
  return (
    <motion.div
        key={props.animKey}
        className={props.className}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
    >
        {props.children}
    </motion.div>
  )
}

export default Fade
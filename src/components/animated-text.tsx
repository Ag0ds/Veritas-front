"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  highlightWords?: string[]
  className?: string
  delay?: number
}

export default function AnimatedText({ text, highlightWords = [], className = "", delay = 0.2 }: AnimatedTextProps) {
  // Divide o texto em palavras
  const words = text.split(" ")

  // Configuração da animação para cada palavra
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word)

        return (
          <motion.span
            variants={child}
            style={{ marginRight: "0.25em", marginBottom: "0.15em" }}
            key={index}
            className={isHighlighted ? "text-gradient-shimmer font-bold" : ""}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Marriage-related emojis
const weddingEmojis = [
  "💍",
  "💒",
  "👰",
  "🤵",
  "💐",
  "🎊",
  "🕊️",
  "💝",
  "💞",
  "💑",
  "🥂",
  "🍰",
  "💌",
  "🔔",
  "❤️",
];

const FloatingEmoji = ({
  x,
  y,
  size,
  emoji,
}: {
  x: number;
  y: number;
  size: number;
  emoji: string;
}) => {
  return (
    <motion.text
      x={x}
      y={y}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.9, 0.6, 0.8],
        scale: [1.1, 1.3, 1, 0.8, 1.5],
        x: x + Math.random() * 100 - 50,
        y: y + Math.random() * 100 - 50,
      }}
      transition={{
        duration: 5 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {emoji}
    </motion.text>
  );
};

function FloatingEmojis() {
  const [emojis, setEmojis] = useState<
    Array<{ id: number; x: number; y: number; size: number; emoji: string }>
  >([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 15, // Slightly larger to make emojis more visible
      emoji: weddingEmojis[Math.floor(Math.random() * weddingEmojis.length)],
    }));
    setEmojis(newEmojis);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <title>Wedding Emojis</title>
        {emojis.map((emojiObj) => (
          <FloatingEmoji key={emojiObj.id} {...emojiObj} />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingWeddingEmojisBackground({
  slogan = "O jeito fácil de planejar o seu casamento.",
  title = "casarnos.com.br",
}: {
  slogan?: string;
  title?: string;
}) {
  const words = slogan.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-100 ">
      <FloatingEmojis />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className=" text-5xl sm:text-7xl md:text-8xl font-bold mb-2 tracking-tighter">
            <span className="">
              <motion.span
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 200, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  type: "spring",
                  stiffness: 75,
                  damping: 25,
                  velocity: 2,
                }}
                className="bg-gradient-to-r from-indigo-300 to-rose-300 text-transparent bg-clip-text decoration-4"
              >
                {title}
              </motion.span>
            </span>
          </h1>
          <h2 className="block text-2xl sm:text-3xl md:text-4xl mb-4">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-1 sm:mr-2 md:mr-3 font-bold"
              >
                <motion.span
                  key={`${wordIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: wordIndex * 0.1 + Math.random() * 100 * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block text-transparent bg-clip-text 
                               bg-gradient-to-r from-indigo-300 to-pink-300"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <div
            className="inline-block group relative bg-gradient-to-b from-pink-300 to-indigo-300 
                       p-px rounded-2xl backdrop-blur-lg 
                       overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Link href="/services">
              <Button
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                         bg-white/80 hover:bg-white
                         text-indigo-400 hover:text-indigo-500 transition-all duration-300 
                         group-hover:-translate-y-0.5 border border-pink-200/50
                         hover:shadow-md"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Comece Já
                </span>
                <span
                  className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                           transition-all duration-300"
                >
                  →
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import React from "react";
import { useRef } from "react";

// Generic animation variants
const variantsMap = {
  "fade-in-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-down": {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-left": {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in-right": {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
};

interface AnimateProps {
  children: React.ReactNode;
  type?: keyof typeof variantsMap;
  duration?: number;
  delay?: number;
  index?: number;
  className?: string;
}

export default function Animate({
  children,
  type = "fade-in-up",
  duration = 0.6,
  delay = 0,
  index,
  className = "",
}: AnimateProps) {
  const variants = variantsMap[type] || variantsMap["fade-in-up"];
  const calcDelay = index ? delay + index * 0.1 : delay;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          initial="hidden"
          variants={variants}
          transition={{ duration, delay: delay + i * 0.2 }}
          className={className}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

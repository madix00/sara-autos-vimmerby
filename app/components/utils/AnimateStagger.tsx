"use client";

import React, { JSX, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * StaggerList
 * Automatically animates and staggers ANY list of children.
 *
 * Usage:
 * <StaggerList>
 *   {stats.map(stat => <Card key={stat.label} />)}
 * </StaggerList>
 */

interface AnimateStaggerProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  stagger?: number;
  type?: "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right";
  className?: string;
}

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

export default function AnimateStagger({
  as = "div",
  children,
  duration = 0.6,
  delay = 0,
  stagger = 0.2,
  type = "fade-in-up",
  className = "",
}: AnimateStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = variantsMap[type] || variantsMap["fade-in-up"];

  const childArray = React.Children.toArray(children);

  const Component = as as any;

  return (
    <Component ref={ref} className={className}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration, delay: delay + i * stagger }}
        >
          {child}
        </motion.div>
      ))}
    </Component>
  );
}

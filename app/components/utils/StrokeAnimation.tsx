"use client";

import { motion } from "framer-motion";

export default function StrokeAnimation({
  children,
  radius,
}: {
  children: React.ReactNode;
  radius: string;
}) {
  const rotatingBg = (rotate: number) =>
    `conic-gradient(from ${rotate}deg, var(--animated-stroke), var(--animated-stroke), var(--animated-stroke-highlight), var(--animated-stroke), var(--animated-stroke), var(--animated-stroke))`;

  const rotationVariant = {
    animate: {
      background: [rotatingBg(0), rotatingBg(360)],
      transition: {
        duration: 8,
        ease: "linear" as any,
        repeat: Infinity,
      },
    },
  };

  return (
    <>
      {/* Rotating gradient */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={rotationVariant}
        className={`absolute -inset-px z-0 ${radius}`}
      ></motion.div>

      {/* Glow */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={rotationVariant}
        style={{ filter: "blur(30px)", opacity: 0.2 }}
        className={`absolute -inset-2 z-0 ${radius}`}
      ></motion.div>

      <div className="relative z-10 overflow-visible">{children}</div>
    </>
  );
}

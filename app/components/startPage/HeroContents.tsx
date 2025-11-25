"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroContents = () => {
  return (
    <>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl text-white font-semibold tracking-tighter mb-6 text-primary-foreground drop-shadow-lg"
        >
          Ditt självklara val av bilhandlare
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto drop-shadow-md"
        >
          Låt oss ta hand om din fordonsförmedling!
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center md:gap-4 justify-center">
          <motion.div
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 1, delay: 0.3 }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <Link
              href="/bilar"
              className="bg-amber-200 px-6 py-3 rounded-md mt-4 text-sm w-fit flex items-center justify-center"
            >
              Köp en ny bil
            </Link>
          </motion.div>

          <motion.div
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6, delay: 0.25 }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
          >
            <Link
              href="/salj-bil"
              className="bg-neutral-800 text-white px-6 py-3 rounded-md mt-4 text-sm w-fit flex items-center justify-center"
            >
              Sälj din bil till oss
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroContents;

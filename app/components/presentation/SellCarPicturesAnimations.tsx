"use client";

import { motion } from "framer-motion";

export default function SellCarPicturesAnimations() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 1.2, ease: "easeOut" }}
        className=" text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
      >
        <div className="w-full grid grid-cols-2 gap-4 sm:gap-8">
          <img
            alt=""
            src="	https://wallpaper.forfun.com/fetch/72/72ac9c910eb88cb2701ab7d39fb8117a.jpeg?h=900&r=0.5"
            className="translate-y-12 sm:translate-y-24 aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg "
          />
          <img
            alt=""
            src="	https://wallpaper.forfun.com/fetch/38/3872b7bd7c52033ce7ef1f1184440803.jpeg?h=900&r=0.5"
            className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg "
          />
          <img
            alt=""
            src="https://wallpaper.forfun.com/fetch/f2/f2cb7d9e8d0cb015328f3da510b4603c.jpeg?h=900&r=0.5"
            className="translate-y-12 sm:translate-y-24 aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
          <img
            alt=""
            src="https://wallpaper.forfun.com/fetch/a9/a9b77c9d17fcd84d2a29e91fa6130c56.jpeg?h=900&r=0.5"
            className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          />
        </div>
      </motion.p>
    </>
  );
}

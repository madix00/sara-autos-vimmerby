"use client";

import { MapPinCheckInside } from "lucide-react";
import { motion } from "framer-motion";
import { companyStatic } from "@/app/service/companyStatic";

const GoogleMaps = () => {
  const googleMapsIframeLink = companyStatic.getGoogleMapsIframeLink();
  return (
    <div className="mx-auto max-w-6xl border-t border-neutral-300 px-8 pt-20! xl:p-0 dark:border-neutral-800">
      <MapPinCheckInside className="text-text-default mx-auto mb-4 size-10" />
      <div className="mb-20">
        <h2 className="text-text-default mb-2 text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Välkommen in till vår butik!
        </h2>
        <p className="text-text-muted text-center">
          Vi ser till att hjälpa dig att köpa eller sälja bil till rätt pris!
        </p>
      </div>
      <motion.div
        initial={{ opacity: 1, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          id="karta"
          className="mt-2 flex justify-center overflow-hidden rounded-2xl"
        >
          <iframe
            src={googleMapsIframeLink}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleMaps;

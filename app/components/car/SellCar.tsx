"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import EmailPhone from "@/app/kontakt/EmailPhone";
import AnimatedCheckboxIcon from "../AnimatedIcons/AnimatedCheckboxIcon";
import MovingCarIcon from "../AnimatedIcons/MovingCarIcon";
import SellCarForm from "../forms/SellCarForm";
import PageHeader from "../presentation/PageHeader";

export default function SellCar() {
  return (
    <>
      <PageHeader
        header="Sälj din bil enkelt och tryggt"
        desc="Fyll i formuläret nedan så kontaktar vi dig för en kostnadsfri värdering av din bil. Vi köper bilar i alla skick och modeller."
      />

      <div className="flex flex-col items-center justify-center gap-16 sm:gap-y-20 lg:flex-row">
        {/* <SellCarForm /> */}
        {/* <SellCarPicturesAnimations /> */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
        >
          <div className="mx-auto mb-12 grid grid-cols-1 gap-4 sm:gap-8">
            <img
              alt=""
              src="	https://wallpaper.forfun.com/fetch/72/72ac9c910eb88cb2701ab7d39fb8117a.jpeg?h=900&r=0.5"
              className="animate-fadeIn aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover opacity-0 shadow-lg"
            />
            <img
              alt=""
              src="https://wallpaper.forfun.com/fetch/f2/f2cb7d9e8d0cb015328f3da510b4603c.jpeg?h=900&r=0.5"
              className="animate-fadeIn aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover opacity-0 shadow-lg"
            />
          </div>
        </motion.div>
        <SellCarForm />
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
        >
          <div className="mx-auto mb-12 grid grid-cols-1 gap-4 sm:gap-8">
            <img
              alt=""
              src="	https://wallpaper.forfun.com/fetch/38/3872b7bd7c52033ce7ef1f1184440803.jpeg?h=900&r=0.5"
              className="animate-fadeIn aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover opacity-0 shadow-lg"
            />
            <img
              alt=""
              src="https://wallpaper.forfun.com/fetch/a9/a9b77c9d17fcd84d2a29e91fa6130c56.jpeg?h=900&r=0.5"
              className="animate-fadeIn aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover opacity-0 shadow-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Trygghet section */}
      <section className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
        {/* Right Content - Image */}
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }} // triggers when 30% of element is visible
            >
              <img
                src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Modern luxury car showroom interior with premium vehicles on display"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.span>
          </div>
        </div>

        {/* Left Content */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }} // triggers when 30% of element is visible
            >
              <h2 className="text-text-default text-2xl font-semibold tracking-tight md:text-4xl/12">
                Enkel och trygg bilaffär
              </h2>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }} // triggers when 30% of element is visible
            >
              <p className="text-text-muted text-lg">
                Att sälja bilen ska vara enkelt och tryggt. Därför hjälper vi
                dig med hela bilförsäljningen.
                <br /> <br />
                Vi på VIP Bilar hjälper både privatpersoner och företag att
                sälja bil. Det är både <b>&nbsp;enklare&nbsp;</b> och
                <b>&nbsp;tryggare&nbsp;</b> att sälja bilen genom oss på VIP
                Bilar än att sälja bilen privat.
              </p>
            </motion.span>
          </div>
          <div className="flex items-center gap-6 dark:fill-white dark:stroke-white">
            <MovingCarIcon />
            <AnimatedCheckboxIcon />
          </div>
        </div>
      </section>

      <EmailPhone />

      {/* <CarWithEngineSound></CarWithEngineSound> */}
    </>
  );
}

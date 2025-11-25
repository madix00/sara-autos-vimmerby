"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { carService } from "../service/carService";
import { companyStatic } from "../service/companyStatic";

export default function EmailPhone() {
  const company_number = carService.getCompanyPhone();
  const email = companyStatic.getEmail();

  return (
    <>
      <div className="mx-auto flex flex-col gap-20 sm:flex-row lg:gap-48">
        {/* Phone info */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }} // triggers when 30% of element is visible
          className="flex max-w-2xl flex-col gap-1"
        >
          <div className="flex max-w-2xl flex-col gap-1">
            <Link
              href={`tel:${company_number}`}
              className="text-text-default text-xl font-bold lg:text-xl"
            >
              {/* +4670 58 68 122 */}
              {company_number}
            </Link>
            <p className="text-text-muted text-sm sm:text-base">
              Telefontider är vardagar mellan 08:00 - 17:00
            </p>
          </div>
        </motion.div>
        {/* Mail info */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }} // triggers when 30% of element is visible
          className="flex max-w-2xl flex-col gap-1"
        >
          <div className="flex max-w-2xl flex-col gap-1">
            <Link
              href={"mailto:info@pmcentreprenad.com"}
              className="text-text-default text-xl font-bold lg:text-xl"
            >
              {/* info@rattbil.com */}
              {email}
            </Link>
            <p className="text-text-muted text-sm sm:text-base">
              Vi svarar vanligtvis inom 24 timmar på vardagar
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

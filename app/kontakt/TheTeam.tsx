"use client";

import { Mail, PhoneCallIcon } from "lucide-react";
import { motion } from "framer-motion";
import { companyStatic } from "../service/companyStatic";
import AnimateStagger from "../components/utils/AnimateStagger";
import StrokeAnimation from "../components/utils/StrokeAnimation";

export default function TheTeam() {
  const teamMembers = companyStatic.getMembers();
  return (
    <div>
      <div className="mx-auto max-w-7xl text-center">
        <AnimateStagger className="mx-auto max-w-2xl">
          <h2 className="text-text-default text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Möt teamet
          </h2>

          <p className="text-text-muted mt-6 text-lg/8">
            Vi är en dynamisk grupp av individer som brinner för det vi gör och
            är engagerade i att leverera de bästa resultaten för våra kunder.
          </p>
        </AnimateStagger>
        <AnimateStagger
          as="ul"
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {teamMembers.map((person, i) => (
            <div className="relative overflow-visible" key={i}>
              <StrokeAnimation radius="rounded-2xl">
                <li
                  key={person.name}
                  className="bg-card-background border-card-border relative z-10 overflow-visible rounded-2xl border px-8 py-10"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }} // triggers when 30% of element is visible
                  >
                    <img
                      alt=""
                      src={person.imageUrl}
                      className="mx-auto size-48 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5 md:size-56"
                    />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.7 }} // triggers when 30% of element is visible
                  >
                    <h3 className="text-text-default mt-6 text-base/7 font-semibold tracking-tight">
                      {person.name}
                    </h3>

                    <p className="text-text-muted text-sm/6">{person.role}</p>
                    <ul
                      role="list"
                      className="mt-6 flex justify-center gap-x-6"
                    >
                      <li>
                        <a
                          href={`mailto:${person.email}`}
                          className="text-text-default"
                        >
                          <span className="sr-only">Email</span>
                          <Mail className="w-4" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`tel:${person.phone}`}
                          className="text-text-default"
                        >
                          <span className="sr-only">Phone call</span>
                          <PhoneCallIcon className="w-4" />
                        </a>
                      </li>
                    </ul>
                  </motion.span>
                </li>
              </StrokeAnimation>
            </div>
          ))}
        </AnimateStagger>
      </div>
    </div>
  );
}

"use client";
import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";
import AnimateStagger from "../utils/AnimateStagger";

export default function FeatureCardList({
  title,
  desc,
  cardList,
}: {
  title: string;
  desc: string;
  cardList: { title: string; desc: string; icon: React.ReactNode }[];
}) {
  return (
    <div>
      <div className="mb-16">
        <AnimateStagger className="flex flex-col gap-4">
          <h2 className="text-text-default text-2xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>

          <p className="text-text-muted sm:text-lg">{desc}</p>
        </AnimateStagger>
      </div>
      <AnimateStagger
        as="ul"
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-24"
      >
        {cardList.map((card, index) => (
          <FeatureCard key={card.title} index={index} {...card} />
        ))}
      </AnimateStagger>
    </div>
  );
}

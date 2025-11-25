import { motion } from "framer-motion";

export default function FeatureCard({
  title,
  desc,
  index,
  icon,
  controls,
}: {
  title: string;
  desc: string;
  index?: number;
  icon: React.ReactNode;
  controls?: any;
}) {
  return (
    <div key={index} className="flex flex-col gap-4">
      <div className="text-text-default flex h-8 w-8 items-center sm:mb-2 sm:h-8 sm:w-8">
        {icon}
      </div>
      <div className="relative">
        <h3 className="text-text-default relative z-20 text-lg sm:text-2xl">
          <span className="bg-background pr-4 font-semibold tracking-tight">
            {title}
          </span>
          <span className="bg-primary absolute top-1/2 left-0 -z-10 h-[3px] w-full -translate-y-1/2 transform"></span>
        </h3>
      </div>

      <p className="text-text-muted text-xs sm:text-sm">{desc}</p>
    </div>
  );
}

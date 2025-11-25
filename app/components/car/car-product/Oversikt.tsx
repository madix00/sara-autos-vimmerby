import { iconMap } from "@/app/service/carService";
import { Fact } from "@/app/types/carservice/Fact";
import { Car } from "lucide-react";

export default function Oversikt({ data }: { data: Fact[] }) {
  return (
    <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3">
      {data.map((fact, index) => {
        const Icon = iconMap[fact.header] || Car;
        return (
          <li key={index} className="flex flex-row gap-2">
            <Icon className="text-primary h-6 w-6" />

            <div className="flex flex-col gap-1">
              <h3 className="text-text-muted text-xs font-normal">
                {fact.header}
              </h3>

              <p className="text-text-default text-sm font-semibold tracking-tight">
                {fact.description}
                {/* {fact.header === "Miltal" && " mil"} */}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

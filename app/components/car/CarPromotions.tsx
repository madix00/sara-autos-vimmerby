import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { carService } from "@/app/service/carService";
import VehicleCard from "./VehicleCard";

export default function CarPromotions({
  currentCarName,
  noOfCars,
  header,
}: {
  currentCarName: string;
  noOfCars: number;
  header?: string;
}) {
  const cars = carService.getCarsSorted();

  const filteredCars = cars
    .filter((car) => car.name !== currentCarName)
    .slice(0, noOfCars);

  return (
    <div className="flex flex-col gap-8">
      {header && (
        <div className="flex flex-wrap items-end justify-between gap-1 sm:items-center">
          <h2 className="text-text-default text-lg font-semibold tracking-tight sm:text-2xl">
            {header}
          </h2>
          <Link
            href={"/bilar"}
            className="text-text-default flex w-fit items-center justify-center rounded-md text-sm font-semibold whitespace-nowrap hover:underline"
          >
            Till alla bilar ({cars.length})
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      )}
      <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3`}>
        {filteredCars.map((car, i) => (
          <VehicleCard key={i + car.name} car={car} swipeAvailable />
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { carService } from "../../service/carService";
import VehicleCard from "../car/VehicleCard";
import StrokeAnimation from "../utils/StrokeAnimation";
import { div } from "framer-motion/client";

export default function SuperAd() {
  const superCar = carService.getMostExpensiveCar();
  const base_url = "https://carbusiness-template.vercel.app";

  const carLink = `${base_url}/bilar/${superCar?.blocket_link
    .split("/")
    .at(5)}`;

  return (
    <>
      {superCar && (
        <div className="flex flex-col gap-16 md:flex-col">
          <div className="glow-border relative overflow-visible">
            <StrokeAnimation radius="rounded-2xl">
              <div className="relative mx-auto overflow-hidden rounded-2xl select-none">
                <Link href={`${carLink}`}>
                  <img
                    src={`${superCar.images[0]}`}
                    alt=""
                    className={`w-full cursor-pointer object-cover transition-transform duration-700 hover:scale-105`}
                  />
                  {/* <PriceBadge
              price={superCar.price}
              priceActive={true}
              position="bottom right"
            /> */}
                </Link>
              </div>
            </StrokeAnimation>
          </div>
          <div className="flex flex-col items-center justify-center text-center font-semibold tracking-wide drop-shadow-xl">
            <span className="block text-2xl leading-snug text-gray-900 italic md:text-4xl dark:text-white">
              “What’s behind you doesn’t matter.”
            </span>

            <span className="mt-3 block bg-gradient-to-r from-red-700 to-yellow-500 bg-clip-text text-lg font-bold text-transparent drop-shadow-md md:text-2xl">
              — Enzo Ferrari
            </span>

            <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-red-700 via-yellow-500 to-red-700 opacity-80"></div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { Calendar, Fuel, Gauge, MapPin, Settings } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { carService } from "../../service/carService";
import Link from "next/link";
import Image from "next/image";
import { Car, CarOld } from "../../types/carservice/Car";
import PriceBadge from "./car-product/PriceBadge";

interface CarProps {
  car: Car;
  swipeAvailable?: boolean;
  priceActive?: boolean;
  position?: string;
}

export const VehicleCard = ({
  car,
  swipeAvailable,
  priceActive,
  position,
}: CarProps) => {
  // const { facts, images, name, price, upload_time } = car;
  const { facts, images, name, price, uploaded_time } = car;
  const city = carService.getCity();
  const mileage = facts.find((f) => f.header === "Miltal")?.description;
  const fuelType = facts.find((f) => f.header === "Drivmedel")?.description;
  const gearbox = facts.find((f) => f.header === "Växellåda")?.description;
  const year = facts.find((f) => f.header === "Modellår")?.description;
  const nav_link = `/bilar/${car.blocket_link.split("/").at(5)}`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const superCar = carService.getMostExpensiveCar();

  return (
    <Link
      href={nav_link}
      className={`${
        car.price === superCar?.price ? "glow-border" : ""
      } glow-bordergroup bg-card-background border-card-border h-fit cursor-pointer overflow-hidden rounded-xl border transition-transform hover:shadow-lg`}
    >
      {swipeAvailable ? (
        <div className="relative h-56">
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className="h-full w-full"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={200}
                  height={100}
                  src={url}
                  alt={`${name} i ${city}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}

            {/* Price badge */}
            <PriceBadge
              price={price}
              priceActive={priceActive}
              position="bottom right"
            />

            {/* Custom "1 / n" counter */}
            <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs text-white sm:text-sm">
              {currentSlide + 1} / {images.length}
            </div>
          </Swiper>
        </div>
      ) : (
        <div className="relative h-62">
          <Image
            width={200}
            height={100}
            src={images[0]}
            alt={`${name} i ${city}`}
            className="h-full w-full object-cover object-center"
            // className="h-full w-full object-scale-down object-top"
            loading="lazy"
          />
          {/* Custom "1 / n" counter */}
          <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs text-white sm:text-sm">
            {images.length} bilder
          </div>
          <PriceBadge
            price={price}
            priceActive={priceActive}
            position="bottom right"
          />
        </div>
      )}

      {/* --- Card Body --- */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-text-default text-sm font-semibold tracking-tight">
            {name}
          </h3>
        </div>

        <div className="text-text-muted mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Calendar size={16} className="text-muted-foreground" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Fuel size={16} className="text-muted-foreground" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Settings size={16} className="text-muted-foreground" />
            <span>{gearbox}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Gauge size={16} className="text-muted-foreground" />
            {/* <span>{mileage} mil</span> */}
            <span>{mileage}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <div className="text-text-muted flex items-center gap-2 text-xs">
            <MapPin size={16} aria-hidden="true" />
            <span>{city}</span>
          </div>
          <span className="text-text-muted rounded-full bg-neutral-200 px-4 py-1 text-xs dark:bg-slate-800/75">
            {uploaded_time}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

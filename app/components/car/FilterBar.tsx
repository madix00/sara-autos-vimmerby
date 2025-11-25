"use client";

import { useState, useMemo } from "react";
import { carService } from "../../service/carService";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import VehicleCard from "./VehicleCard";
import { ChevronDown, Cross, X } from "lucide-react";
import { Car, CarOld } from "../../types/carservice/Car";
import Toggle from "../utils/Toggle";

interface Filter {
  key: string;
  value: string;
  type?: "fuel" | "transmission"; // optional to identify multi-select
}

interface Props {
  cars?: Car[];
}

interface MappedCar extends Car {
  factMap: Record<string, string>;
  miltalNumber?: number;
}

export default function FilterBar({ cars }: Props) {
  if (!cars) return null;

  // --- Map facts to key-value and parse Miltal ---
  const mappedCars: MappedCar[] = useMemo(() => {
    return cars.map((car) => {
      const factMap: Record<string, string> = Object.fromEntries(
        car.facts.map((f) => [f.header, f.description])
      );
      const miltalRaw = factMap["Miltal"]?.replace(/\s/g, "");
      const miltalNumber = miltalRaw ? parseInt(miltalRaw, 10) : undefined;
      return { ...car, factMap, miltalNumber };
    });
  }, [cars]);

  // --- Slider min/max ---
  const minPrice = Math.min(...mappedCars.map((c) => c.price));
  const maxPrice = Math.max(...mappedCars.map((c) => c.price));

  const minMiltal = Math.min(...mappedCars.map((c) => c.miltalNumber ?? 0));
  const maxMiltal = Math.max(...mappedCars.map((c) => c.miltalNumber ?? 0));

  // --- States ---
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [miltalRange, setMiltalRange] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [priceActive, setPriceActive] = useState(true);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [showMiltalSlider, setShowMiltalSlider] = useState(false);
  const [showFuelFilters, setShowFuelFilters] = useState(false);
  const [showTransmissionFilters, setShowTransmissionFilters] = useState(false);

  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const superCar = carService.getMostExpensiveCar();

  // --- Handlers ---
  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) setPriceRange({ min: value[0], max: value[1] });
  };
  const handleMiltalChange = (value: number | number[]) => {
    if (Array.isArray(value)) setMiltalRange({ min: value[0], max: value[1] });
  };

  // Remove a single filter
  const removeFilter = (filter: Filter) => {
    switch (filter.key) {
      case "price":
        setPriceRange(null);
        break;
      case "miltal":
        setMiltalRange(null);
        break;
      case "fuelType":
        setFuelTypes(fuelTypes.filter((f) => f !== filter.value));
        break;
      case "transmission":
        setTransmissions(transmissions.filter((t) => t !== filter.value));
        break;
    }
  };

  const clearAll = () => {
    setPriceRange(null);
    setMiltalRange(null);
    setFuelTypes([]);
    setTransmissions([]);
    setActiveFilters([]);
  };

  // --- Active filters ---
  useMemo(() => {
    const filters: Filter[] = [];

    if (
      priceRange &&
      (priceRange.min !== minPrice || priceRange.max !== maxPrice)
    ) {
      filters.push({
        key: "price",
        value: `${priceRange.min.toLocaleString(
          "sv-SE"
        )} - ${priceRange.max.toLocaleString("sv-SE")} kr`,
      });
    }
    if (
      miltalRange &&
      (miltalRange.min !== minMiltal || miltalRange.max !== maxMiltal)
    ) {
      filters.push({
        key: "miltal",
        value: `${miltalRange.min.toLocaleString(
          "sv-SE"
          // )} - ${miltalRange.max.toLocaleString("sv-SE")}`,
        )} - ${miltalRange.max.toLocaleString("sv-SE")} mil`,
      });
    }
    fuelTypes.forEach((fuel) =>
      filters.push({ key: "fuelType", value: fuel, type: "fuel" })
    );
    transmissions.forEach((trans) =>
      filters.push({ key: "transmission", value: trans, type: "transmission" })
    );

    setActiveFilters(filters);
  }, [
    priceRange,
    miltalRange,
    fuelTypes,
    transmissions,
    minPrice,
    maxPrice,
    minMiltal,
    maxMiltal,
  ]);

  // --- Filtered cars ---
  const filteredCars = useMemo(() => {
    return mappedCars
      .filter((car) => {
        if (
          priceRange &&
          (car.price < priceRange.min || car.price > priceRange.max)
        )
          return false;
        if (miltalRange && car.miltalNumber !== undefined) {
          if (
            car.miltalNumber < miltalRange.min ||
            car.miltalNumber > miltalRange.max
          )
            return false;
        }
        if (
          fuelTypes.length > 0 &&
          !fuelTypes.includes(car.factMap["Drivmedel"])
        )
          return false;
        if (
          transmissions.length > 0 &&
          !transmissions.includes(car.factMap["Växellåda"])
        )
          return false;
        if (car.name == superCar.name) return false;

        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "miltal-asc":
            return (a.miltalNumber ?? 0) - (b.miltalNumber ?? 0);
          default:
            return 0;
        }
      });
  }, [
    mappedCars,
    priceRange,
    miltalRange,
    fuelTypes,
    transmissions,
    sortOption,
  ]);

  // --- Unique options ---
  const fuelOptions = Array.from(
    new Set(mappedCars.map((c) => c.factMap["Drivmedel"]).filter(Boolean))
  ) as string[];
  const transmissionOptions = Array.from(
    new Set(mappedCars.map((c) => c.factMap["Växellåda"]).filter(Boolean))
  ) as string[];

  return (
    <div className="w-full font-sans">
      <div className="flex justify-between">
        <Toggle
          title="Visa priser"
          checked={priceActive}
          onChange={setPriceActive}
        />
        <p className="mt-auto mr-4 mb-1 hidden text-right text-xs md:block">
          Sortering
        </p>
      </div>

      {/* Top filter buttons */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex w-full gap-2 overflow-x-scroll p-1 md:overflow-x-hidden">
          <button
            onClick={() => {
              setShowPriceSlider((prev) => !prev);
              if (!priceRange) setPriceRange({ min: minPrice, max: maxPrice });
            }}
            className={`bg-card-background text-text-default flex cursor-pointer items-center gap-1 rounded-full py-2 pr-4 pl-5 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${showPriceSlider && "dark:outline-primary outline-1 outline-neutral-800"}`}
          >
            Pris
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showPriceSlider ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={() => {
              setShowMiltalSlider((prev) => !prev);
              if (!miltalRange)
                setMiltalRange({ min: minMiltal, max: maxMiltal });
            }}
            className={`bg-card-background text-text-default flex cursor-pointer items-center gap-1 rounded-full py-2 pr-4 pl-5 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
              showMiltalSlider &&
              "dark:outline-primary outline-1 outline-neutral-800"
            }`}
          >
            Miltal
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showMiltalSlider ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={() => setShowFuelFilters((prev) => !prev)}
            className={`bg-card-background text-text-default flex cursor-pointer items-center gap-1 rounded-full py-2 pr-4 pl-5 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${showFuelFilters && "dark:outline-primary outline-1 outline-neutral-800"}`}
          >
            Drivmedel
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showFuelFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={() => setShowTransmissionFilters((prev) => !prev)}
            className={`bg-card-background text-text-default flex cursor-pointer items-center gap-1 rounded-full py-2 pr-4 pl-5 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800 ${
              showTransmissionFilters &&
              "dark:outline-primary outline-1 outline-neutral-800"
            }`}
          >
            Växellåda
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showTransmissionFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="relative ml-auto w-full max-w-[200px]">
            <select
              value={sortOption ?? ""}
              onChange={(e) => setSortOption(e.target.value || null)}
              className="bg-card-background text-text-default w-fit cursor-pointer appearance-none rounded-full py-2 pr-10 pl-5 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              <option value="">Senast upplagt</option>
              <option value="price-desc">Pris - Högt till lågt</option>
              <option value="price-asc">Pris - Lågt till högt</option>
              <option value="miltal-asc">Miltal - Lågt till högt</option>
            </select>

            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>
        {/* Sort */}
      </div>

      {/* Filter choices */}
      <div className="flex flex-col dark:text-neutral-300">
        {/* Sliders */}
        {showPriceSlider && (
          <>
            <div className="w-72 px-2 py-4">
              <p className="text-text-default mb-2 text-sm">
                Pris: {(priceRange?.min ?? minPrice).toLocaleString("sv-SE")} -{" "}
                {(priceRange?.max ?? maxPrice).toLocaleString("sv-SE")} kr
              </p>
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={[
                  priceRange?.min ?? minPrice,
                  priceRange?.max ?? maxPrice,
                ]}
                onChange={handlePriceChange}
                allowCross={false}
                step={1000}
                className="price-slider"
              />
            </div>
            <div className="h-0.5 w-full bg-neutral-50 dark:bg-neutral-900"></div>
          </>
        )}
        {showMiltalSlider && (
          <>
            <div className="w-72 px-2 py-4">
              <p className="text-text-default mb-2 text-sm">
                Miltal:{" "}
                {(miltalRange?.min ?? minMiltal).toLocaleString("sv-SE")} -{" "}
                {(miltalRange?.max ?? maxMiltal).toLocaleString("sv-SE")}
              </p>
              <Slider
                range
                min={minMiltal}
                max={maxMiltal}
                value={[
                  miltalRange?.min ?? minMiltal,
                  miltalRange?.max ?? maxMiltal,
                ]}
                step={100}
                onChange={handleMiltalChange}
                allowCross={false}
                className="miltal-slider"
              />
            </div>
            <div className="h-0.5 w-full bg-neutral-50 dark:bg-neutral-900"></div>
          </>
        )}

        {/* Fuel checkboxes */}
        {showFuelFilters && (
          <>
            <div className="flex flex-wrap gap-10 px-2 py-4">
              {fuelOptions.map((fuel) => (
                <label
                  key={fuel}
                  className="text-text-default inline-flex cursor-pointer items-center text-sm"
                >
                  <input
                    type="checkbox"
                    checked={fuelTypes.includes(fuel)}
                    onChange={(e) => {
                      if (e.target.checked) setFuelTypes([...fuelTypes, fuel]);
                      else setFuelTypes(fuelTypes.filter((f) => f !== fuel));
                    }}
                    className="mr-2 h-4 w-4 cursor-pointer"
                  />
                  {fuel}
                </label>
              ))}
            </div>
            <div className="h-0.5 w-full bg-neutral-50 dark:bg-neutral-900"></div>
          </>
        )}

        {/* Transmission checkboxes */}
        {showTransmissionFilters && (
          <>
            <div className="flex flex-wrap gap-10 px-2 py-4">
              {transmissionOptions.map((gear) => (
                <label
                  key={gear}
                  className="text-text-default inline-flex cursor-pointer items-center text-sm"
                >
                  <input
                    type="checkbox"
                    checked={transmissions.includes(gear)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setTransmissions([...transmissions, gear]);
                      else
                        setTransmissions(
                          transmissions.filter((g) => g !== gear)
                        );
                    }}
                    className="mr-2 h-4 w-4 cursor-pointer"
                  />
                  {gear}
                </label>
              ))}
            </div>
            <div className="h-0.5 w-full bg-neutral-50 dark:bg-neutral-900"></div>
          </>
        )}
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mt-2">
          <p className="text-text-default ml-1 text-xs font-semibold">
            Aktiva filter:
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <div
                key={`${f.key}-${f.value}`}
                onClick={() => removeFilter(f)}
                className="bg-card-background text-text-default flex cursor-pointer items-center gap-1 rounded-full py-2 pr-4 pl-5 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
              >
                {f.value}
                <X className="h-3.5 w-3.5" />
              </div>
            ))}
            <button
              onClick={clearAll}
              className="bg-card-background text-text-default flex cursor-pointer items-center rounded-full px-5 py-1 text-sm transition hover:bg-neutral-200 dark:hover:bg-neutral-800"
            >
              Rensa alla
            </button>
          </div>
        </div>
      )}

      {/* Filtered cars */}
      <p className="mt-4 text-sm font-semibold text-gray-600 dark:text-white">
        Antal träffar: {filteredCars.length + 1}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <VehicleCard
          car={superCar}
          priceActive={priceActive}
          position="bottom right"
        />
        {filteredCars.map((car, i) => (
          <VehicleCard
            key={i + car.name}
            car={car}
            priceActive={priceActive}
            position="bottom right"
          />
        ))}
      </div>
    </div>
  );
}

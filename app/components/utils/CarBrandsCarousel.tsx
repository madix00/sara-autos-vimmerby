import { CarBrand } from "../../types";

type CarBrandsCarouselProps = {
  title?: string;
  brands: CarBrand[];
  reversed?: boolean;
};

export default function CarBrandsCarousel({
  title,
  brands,
  reversed,
}: CarBrandsCarouselProps) {
  const brandsToInvert = [
    "Volvo",
    "Audi",
    "Volkswagen",
    "Kia",
    "Nissan",
    "Renault",
    "Maserati",
    "Skoda",
    "Jaguar",
    "McLaren",
    "Dacia",
    "Chevrolet",
    "Opel",
    "Lexus",
  ];
  const brandsX2 = reversed
    ? [...brands]
        .slice()
        .reverse()
        .concat([...brands].slice().reverse())
    : [...brands, ...brands];

  const animationClass = reversed
    ? "animate-scroll-slow-reverse"
    : "animate-scroll-slow";

  return (
    <section className="border-border overflow-hidden" aria-label="carusel">
      {title && (
        <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold md:text-2xl">
            {title}
          </h2>
        </div>
      )}

      <div className="relative">
        {/* Left Fade */}
        <div className="from-background to-background/0 pointer-events-none absolute top-0 left-0 z-20 h-full w-24 bg-linear-to-r sm:w-xs" />

        {/* Right Fade */}
        <div className="from-background to-background/0 pointer-events-none absolute top-0 right-0 z-20 h-full w-24 bg-linear-to-l sm:w-xs" />

        <div className="overflow-hidden">
          <div
            className={`flex min-w-max gap-10 px-4 pb-4 sm:gap-30 ${animationClass}`}
          >
            {brandsX2.map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="group bg-card flex h-20 w-26 shrink-0 items-center justify-center rounded-lg p-4 transition-all duration-500 sm:h-24 sm:w-42"
              >
                <img
                  src={`/car_logos/${brand}.svg`}
                  alt={`${brand} logo`}
                  className={`h-full w-full object-contain mix-blend-darken filter transition-all duration-500 ${
                    brandsToInvert.includes(brand) &&
                    "dark:grayscale dark:invert"
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Review } from "@/app/types/Review";
import ReviewCard from "./ReviewCard";
import AnimateStagger from "../utils/AnimateStagger";
import SecondaryButton from "../utils/SecondaryButton";

type ReviewsCarouselProps = {
  title?: string;
  desc?: string;
  reviews: Review[];
};

export default function ReviewsCarousel({
  title,
  desc,
  reviews,
}: ReviewsCarouselProps) {
  // duplicate arrays for infinite scroll
  const reviewsX2 = [...reviews, ...reviews];
  const reviewsX2Reversed = [...reviews]
    .slice()
    .reverse()
    .concat([...reviews].slice().reverse());

  return (
    <section
      className="border-border overflow-hidden py-8"
      aria-label="reviews-carousel"
    >
      {title && (
        <AnimateStagger className="mx-auto mb-6 flex max-w-3xl flex-col gap-4 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-text-default text-2xl font-semibold tracking-tight md:text-4xl/12">
            {title}
          </h2>
          {desc && <p className="text-text-muted sm:text-lg">{desc}</p>}
          <SecondaryButton
            title={"Lämna ett omdöme"}
            href={
              "https://search.google.com/local/writereview?placeid=ChIJlYGp5pSsEyQRuMtLR3aackM&source=g.page.m.ia._&laa=nmx-review-solicitation-ia2"
            }
            className="mx-auto mt-4 mb-18"
          />
        </AnimateStagger>
      )}

      <div className="relative space-y-6">
        {/* Top Carousel: reversed */}
        <div className="scroll-container relative">
          <div className="from-background to-background/0 pointer-events-none absolute top-0 left-0 z-20 h-full w-6 bg-linear-to-r sm:w-16" />
          <div className="from-background to-background/0 pointer-events-none absolute top-0 right-0 z-20 h-full w-6 bg-linear-to-l sm:w-16" />

          <div className="overflow-hidden">
            <div className="animate-scroll-slow-reverse flex min-w-max gap-6">
              {reviewsX2Reversed.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Carousel: normal */}
        <div className="scroll-container relative">
          <div className="from-background to-background/0 pointer-events-none absolute top-0 left-0 z-20 h-full w-6 bg-linear-to-r sm:w-16" />
          <div className="from-background to-background/0 pointer-events-none absolute top-0 right-0 z-20 h-full w-6 bg-linear-to-l sm:w-16" />

          <div className="overflow-hidden">
            <div className="animate-scroll-slow flex min-w-max gap-6">
              {reviewsX2.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

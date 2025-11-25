import {
  Camera,
  CheckIcon,
  Handshake,
  Megaphone,
  NotepadText,
  Sparkles,
} from "lucide-react";
import About from "./om-oss/About";
import CarBrandsCarousel from "./components/utils/CarBrandsCarousel";
import CarWithEngineSound from "./components/cool-to-have/CarWithEngineSound";
import FeatureCardList from "./components/presentation/FeatureCardList";
import PageContainer from "./components/utils/PageContainer";
import LogoCloud from "./components/presentation/LogoCloud";
import OpeningHours from "./kontakt/OpeningHours";
import SuperAd from "./components/presentation/SuperAd";
import { Review } from "./types/Review";
import { companyStatic } from "./service/companyStatic";
import Hero from "./components/startPage/Hero";
import CarPromotions from "./components/car/CarPromotions";
import ReviewsCarousel from "./components/presentation/ReviewsCarousel";
import CompanyVideo from "./components/presentation/CompanyVideo";

export default function Home() {
  const featureCards = [
    {
      title: "Intresseanmälan",
      desc: "Lämna in bilen hos oss och få en kostnadsfri värdering.",
      icon: <NotepadText className="h-full w-full" />,
    },
    {
      title: "Förberedelse",
      desc: "Bilen tvättas, fotograferas och förbereds inför annonsering.",
      icon: <Sparkles className="h-full w-full" />,
    },
    {
      title: "Annonsering",
      desc: "Vi skapar och publicerar en professionell annons.",
      icon: <Megaphone className="h-full w-full" />,
    },
    {
      title: "Försäljning",
      desc: "Vi sköter allt pappersarbete avseende försäljningen av ditt fordon.",
      icon: <Handshake className="h-full w-full" />,
    },
  ];

  const brands = companyStatic.getBrands();
  const reviews = companyStatic.getReviews();

  return (
    <>
      <Hero />
      <PageContainer>
        <CarPromotions
          header="Senaste bilarna till försäljning"
          currentCarName={""}
          noOfCars={3}
        />

        <div className="flex flex-col sm:gap-12">
          <CarBrandsCarousel brands={brands} reversed />
          <CarBrandsCarousel brands={brands} />
        </div>

        <FeatureCardList
          title="Ska du sälja bilen?"
          desc="Du slipper all krångel och mek som säljare. Vi sköter hela processen!"
          cardList={featureCards}
        />

        <ReviewsCarousel
          title="Vad våra kunder älskar med oss"
          desc="Inget gör oss gladare än nöjda kunder! Upptäck varför våra kunder väljer oss gång på gång. Deras ord talar för sig själva."
          reviews={reviews}
        />

        <About />
        {/* <LogoCloud title="Vi samarbetar med flera företag" /> */}

        {/* <CarWithEngineSound /> */}
        <SuperAd />
        <CompanyVideo />
        <span className="block md:hidden">
          <OpeningHours hours={companyStatic.getWeeklyHours()} />
        </span>
      </PageContainer>
    </>
  );
}

"use client";
import {
  CarIcon,
  HeartCrackIcon,
  MailPlus,
  PhoneCall,
  Search,
} from "lucide-react";
import Link from "next/link";
import PrimaryButton from "../utils/PrimaryButton";
import SecondaryButton from "../utils/SecondaryButton";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative mt-22 flex h-[450px] w-full items-center justify-center overflow-hidden md:mt-26 md:h-[550px]"
    >
      {/* Full width background */}
      <div className="absolute inset-0 right-1/2 left-1/2 w-screen -translate-x-1/2">
        <video
          playsInline
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          autoPlay
          loop
          muted
          className="h-full w-full object-cover"
          data-video="0"
        >
          <source src="/media/ferrari.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-900/10 to-neutral-900/90" />
      </div>

      {/* <div className="absolute inset-0 right-1/2 left-1/2 w-screen -translate-x-1/2">
        <div className="h-full w-full">
          <iframe
            className="h-full w-full object-cover"
            src="https://www.youtube.com/embed/g-DlIilkVfQ?autoplay=1&mute=1&loop=1&controls=0&playlist=g-DlIilkVfQ&playsinline=1
"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen={false}
          />
          </div> 

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-900/10 to-neutral-900/90" />
      </div>*/}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-primary-foreground mb-6 text-4xl font-semibold tracking-tighter text-white drop-shadow-lg md:text-5xl">
          Ditt självklara val av bilhandlare
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-white drop-shadow-md md:text-2xl">
          Låt oss ta hand om din fordonsförmedling!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <PrimaryButton
            title={"Köp en ny bil"}
            href={"/bilar"}
            icon={<HeartCrackIcon />}
          />
          <SecondaryButton
            title={"Sälj din bil"}
            href={"/salj-bil"}
            icon={<CarIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface CarImageSwiperProps {
	images: string[];
}

export default function CarImageSwiper({ images }: CarImageSwiperProps) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<div className="w-full max-w-3xl mr-auto rounded-2xl overflow-hidden relative">
			{/* Main Slider */}
			<Swiper
				modules={[Navigation, Thumbs]}
				navigation
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={10}
				slidesPerView={1}
				className="rounded-2xl "
				onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
			>
				{images.map((url, index) => (
					<SwiperSlide key={index}>
						<img
							src={url}
							alt={`Car image ${index + 1}`}
							className="w-full h-[250px] sm:h-[450px] object-contain bg-neutral-100 cursor-zoom-in z-0"
							loading="lazy"
							onClick={() => {
								setLightboxIndex(index);
								setLightboxOpen(true);
							}}
						/>
					</SwiperSlide>
				))}

				{/* Centered "1 / 10" counter */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs sm:text-sm px-3 py-1 rounded-full z-40">
					{currentSlide + 1} av {images.length}
				</div>
			</Swiper>

			{/* Thumbnails */}
			<Swiper
				onSwiper={setThumbsSwiper}
				modules={[Thumbs]}
				spaceBetween={10}
				slidesPerView={5}
				watchSlidesProgress
				slideToClickedSlide
				onClick={(swiper) => {
					if (typeof swiper.clickedIndex !== "undefined") {
						swiper.slideTo(swiper.clickedIndex);
					}
				}}
				centeredSlides
				centeredSlidesBounds
				className="mt-4"
			>
				{images.map((url, index) => (
					<SwiperSlide key={index}>
						<img
							src={url}
							alt={`Thumbnail ${index + 1}`}
							className="w-full h-10 sm:h-20 object-cover cursor-pointer rounded-md border border-gray-300 hover:opacity-80"
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Lightbox */}
			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				index={lightboxIndex}
				slides={images.map((url) => ({ src: url }))}
			/>
		</div>
	);
}

"use client";
import { useRef, useState } from "react";

export default function CarWithEngineSound() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPressed, setIsPressed] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	let longPressTimer: NodeJS.Timeout;

	const playSound = () => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = 0;
		audioRef.current.play().catch(() => {});
	};

	const stopSound = () => {
		if (!audioRef.current) return;
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
	};

	const handlePressStart = () => {
		setIsPressed(true);
		playSound();

		longPressTimer = setTimeout(() => {
			document.addEventListener("contextmenu", (e) => e.preventDefault(), {
				once: true,
			});
		}, 400);
	};

	const handlePressEnd = () => {
		setIsPressed(false);
		stopSound();
		clearTimeout(longPressTimer);
	};

	return (
		<div className="relative mx-auto overflow-hidden rounded-3xl select-none">
			<img
				src="https://images.unsplash.com/photo-1724391114112-c83ad59f1d5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000"
				alt=""
				className={`aspect-4/3 md:aspect-5/2 w-full object-cover transition-transform duration-700 cursor-pointer
					${isPressed || isHovered ? "scale-105 grayscale-0" : "scale-100 grayscale"}`}
				onMouseDown={handlePressStart}
				onMouseUp={handlePressEnd}
				onTouchStart={handlePressStart}
				onTouchEnd={handlePressEnd}
				onTouchCancel={handlePressEnd}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => (handlePressEnd(), setIsHovered(false))}
				onContextMenu={(e) => e.preventDefault()}
				style={{
					touchAction: "manipulation",
					WebkitTapHighlightColor: "transparent",
				}}
			/>

			<audio ref={audioRef} src="/media/loud_car_engine.mp3" preload="auto" />
		</div>
	);
}

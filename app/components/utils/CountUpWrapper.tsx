"use client";

import CountUp from "react-countup";

export default function CountUpWrapper({
	end,
	duration,
	separator,
	suffix,
}: {
	end: number;
	duration: number;
	separator?: string;
	suffix?: string;
}) {
	return (
		<CountUp
			end={end}
			duration={duration}
			separator={separator}
			suffix={suffix}
			enableScrollSpy
			scrollSpyOnce
		/>
	);
}

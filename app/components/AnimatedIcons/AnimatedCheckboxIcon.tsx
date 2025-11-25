"use client";

import dynamic from "next/dynamic";

// Dynamically import Player so it only loads on client
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function AnimatedCheckboxIcon() {
  return (
    <div className="dark:brightness-75 dark:invert">
      <Player
        src="/media/checkbox.json"
        // style={{ height: 280, width: 280 }}
        style={{ width: "100%" }}
        // style={{ width: 210 }}
        // autoplay={false}
        // loop={false}
        loop
        autoplay
      />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

// Dynamically import Player so it only loads on client
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function MovingCarIcon() {
  return (
    <div className="dark:brightness-75 dark:invert">
      <Player
        src="/media/carr.json"
        // style={{ width: 220 }}
        style={{ width: "100%" }}
        // style={{ width: 120, height: 120 }} // make smaller
        // autoplay={false}
        // loop={false}
        loop
        autoplay
      />
    </div>
  );
}

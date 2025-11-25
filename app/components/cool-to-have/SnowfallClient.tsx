"use client";

import dynamic from "next/dynamic";

const Snowfall = dynamic(() => import("react-snowfall"), { ssr: false });

export default function SnowfallClient() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Snowfall color="red" snowflakeCount={200} />
    </div>
  );
}

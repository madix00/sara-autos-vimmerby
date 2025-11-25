import { formatCurrencySEK } from "@/app/utils/formatters";

type CornerPosition = "top right" | "top left" | "bottom right" | "bottom left";

type PriceBadgeProps = {
  price: number;
  priceActive?: boolean;
  position?: CornerPosition;
};

export default function PriceBadge({
  price,
  priceActive,
  position,
}: PriceBadgeProps) {
  const pos = position ?? "top right";

  const positions = {
    "top right": { main: "top-4 right-4", old: "top-12 right-4" },
    "bottom right": { main: "bottom-4 right-4", old: "bottom-12 right-4" },
    "top left": { main: "top-4 left-4", old: "top-12 left-4" },
    "bottom left": { main: "bottom-4 left-4", old: "bottom-12 left-4" },
  } as const;

  const { main, old } = positions[pos];

  if (!priceActive) return null;

  return (
    <div className="flex flex-col">
      {price && (
        <div
          className={`${main} bg-primary text-secondary"} absolute z-10 rounded-lg px-4 py-2 text-xl font-bold tracking-tight shadow-lg`}
        >
          {formatCurrencySEK(price)}
        </div>
      )}
      {/* 
      {price && (
        <div
          className={`${old} absolute z-10 rounded-lg bg-red-800 px-3 py-1.5 text-xs font-bold tracking-tight text-white line-through shadow-lg`}
        >
          {formatCurrencySEK(price)}
        </div>
      )} */}
    </div>
  );
}

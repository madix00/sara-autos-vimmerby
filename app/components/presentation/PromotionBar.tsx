import Link from "next/link";

export default function PromotionBar() {
  return (
    <div className="flex w-full">
      <Link
        href={"/bilar"}
        className="orange-gradient-animated text-secondary w-full px-1 py-1.5 text-center text-sm font-semibold hover:cursor-pointer hover:brightness-110 sm:px-4"
      >
        🎉 Black Week Deal: <span>Just nu 20 rabatterade bilar 🔥</span>
      </Link>
    </div>
  );
}

// with z index
// export default function PromotionBar() {
//   return (
//     <div className="sticky top-[60px] z-50 w-full animate-pulse bg-amber-300 px-4 py-0 text-center font-semibold tracking-wide text-white md:top-[65px]">
//       🎉 Black Week Deal:{" "}
//       <span className="font-bold">Just nu 20 rabbaterade bilar 🔥</span>
//       {/* — Use code <span className="font-bold">BLACK20</span> 🔥 */}
//     </div>
//   );
// }

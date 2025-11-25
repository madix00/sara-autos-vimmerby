import { Pair } from "@/app/types/carservice/Pair";

export default function MotorPrestanda({ data }: { data: Pair[] | null }) {
  if (!data) {
    return null;
  }
  return (
    <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-3">
      {data.map((fact, index) => (
        <li key={index} className="flex flex-col gap-1">
          <h3 className="text-text-muted text-xs font-normal">
            {fact.header}
            {fact.subHeader && (
              <span className="block text-xs font-normal">
                {fact.subHeader}
              </span>
            )}
          </h3>

          <p className="text-text-default text-sm font-semibold tracking-tight">
            {fact.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

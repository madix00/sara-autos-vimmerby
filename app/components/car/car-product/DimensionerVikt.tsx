import { Pair } from "@/app/types/carservice/Pair";

export default function DimensionerVikt({ data }: { data: Pair[] | null }) {
  if (!data) {
    return null;
  }
  return (
    <ul className="flex flex-col gap-4">
      {data.map((fact, index) => (
        <li
          key={index}
          className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-4 text-xs dark:border-neutral-800"
        >
          <h3 className="text-xs font-normal text-neutral-800 dark:text-neutral-300">
            {fact.header}
            {fact.subHeader && (
              <span className="text-text-muted block text-xs font-normal">
                {fact.subHeader}
              </span>
            )}
          </h3>
          <p className="text-text-default text-xs font-semibold tracking-tight">
            {fact.value}
          </p>
        </li>
      ))}
    </ul>
  );
}

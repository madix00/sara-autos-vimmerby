import { TimeRange } from "./TimeRange";

export type WeeklyHours = {
  [day: string]: TimeRange | null;
};

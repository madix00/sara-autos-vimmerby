import { WeeklyHours } from "../types/WeeklyHours";

const weekdayMap: Record<string, string> = {
  Monday: "Måndag",
  Tuesday: "Tisdag",
  Wednesday: "Onsdag",
  Thursday: "Torsdag",
  Friday: "Fredag",
  Saturday: "Lördag",
  Sunday: "Söndag",
};

export function translateWeekdays(weeklyHours: WeeklyHours): WeeklyHours {
  const translated: WeeklyHours = {};

  for (const [day, hours] of Object.entries(weeklyHours)) {
    const swedishDay = weekdayMap[day] ?? day;
    translated[swedishDay] = hours;
  }

  return translated;
}

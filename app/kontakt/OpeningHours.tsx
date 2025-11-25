import React, { useMemo } from "react";
import { WeeklyHours } from "../types/WeeklyHours";

interface Status {
  dayName: string;
  label: "Öppet" | "Stängt" | "Öppnar snart" | "Stänger snart";
  isOpen: boolean;
}

interface DayInfo {
  day: string;
  displayTime: string;
  isToday: boolean;
  isClosed: boolean;
}

const OpeningHours = ({ hours }: { hours: WeeklyHours }) => {
  const days = Object.keys(hours);

  // Compute today's status once
  const todayStatus = useMemo<Status>(() => {
    const now = new Date();
    const todayIndex = now.getDay(); // Sunday=0, Monday=1...
    const dayName = days[(todayIndex + 6) % 7]; // shift so Monday=0
    const schedule = hours[dayName];

    if (!schedule) return { dayName, label: "Stängt", isOpen: false };

    const [openTime, closeTime] = schedule;
    const [openH, openM] = openTime.split(":").map(Number);
    const [closeH, closeM] = closeTime.split(":").map(Number);

    const open = new Date();
    open.setHours(openH, openM, 0, 0);
    const close = new Date();
    close.setHours(closeH, closeM, 0, 0);

    const nowMs = now.getTime();
    const buffer = 60 * 1000; // 1 min buffer

    if (nowMs >= open.getTime() - buffer && nowMs <= close.getTime() + buffer) {
      const diffToClose = (close.getTime() - nowMs) / (1000 * 60);
      return {
        dayName,
        label: diffToClose <= 60 ? "Stänger snart" : "Öppet",
        isOpen: true,
      };
    }

    const diffToOpen = (open.getTime() - nowMs) / (1000 * 60);
    if (diffToOpen > 0 && diffToOpen <= 60) {
      return { dayName, label: "Öppnar snart", isOpen: false };
    }

    return { dayName, label: "Stängt", isOpen: false };
  }, [hours, days]);

  // Precompute all days info
  const dayInfo = useMemo<DayInfo[]>(() => {
    return days.map((day) => {
      const schedule = hours[day];
      const isClosed = !schedule;
      const displayTime = isClosed
        ? "Stängt"
        : `${schedule[0]} – ${schedule[1]}`;
      const isToday = day === todayStatus.dayName;

      return {
        day,
        displayTime,
        isToday,
        isClosed,
      };
    });
  }, [days, hours, todayStatus]);

  const getBadgeColor = (label: Status["label"]) => {
    switch (label) {
      case "Öppet":
        return "bg-green-100 text-green-800";
      case "Stänger snart":
        return "bg-orange-100 text-orange-800";
      case "Öppnar snart":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 dark:bg-red-400 text-red-800";
    }
  };

  return (
    <div className="border-card-background bg-background pointer-events-none absolute right-0 z-50 mt-2 w-64 translate-y-1 rounded-md border p-3 opacity-0 shadow-lg transition-all duration-300 peer-hover:pointer-events-auto peer-hover:translate-y-0 peer-hover:opacity-100">
      <div className="flex max-w-xs flex-col gap-1">
        {dayInfo.map((day) => (
          <div
            key={day.day}
            className={`text-text-default flex items-center justify-between rounded-md p-2 text-xs ${
              day.isToday ? "bg-card-background font-semibold" : "text-gray-700"
            }`}
          >
            <span>{day.day}</span>
            <div className="flex items-center gap-2">
              {day.isToday && todayStatus.isOpen && (
                <span
                  className={`rounded-full px-3 py-1 text-[12px] ${getBadgeColor(
                    todayStatus.label
                  )}`}
                >
                  {todayStatus.label}
                </span>
              )}
              <span className="text-text-default">{day.displayTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;

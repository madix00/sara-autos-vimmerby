import React, { useMemo } from "react";

type TimeRange = [string, string];
type WeeklyHours = {
  [day: string]: [string, string] | string[] | null;
};

interface Status {
  dayName: string;
  label: "Öppet" | "Stängt" | "Öppnar snart" | "Stänger snart";
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

interface OpeningStatusIndicatorProps {
  hours: WeeklyHours;
}

const OpeningStatusIndicator: React.FC<OpeningStatusIndicatorProps> = ({
  hours,
}) => {
  const days = Object.keys(hours);

  const status = useMemo<Status>(() => {
    const now = new Date();
    const todayIndex = now.getDay(); // Sunday=0
    const dayName = days[(todayIndex + 6) % 7]; // shift to Monday=0
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
    const buffer = 60 * 1000; // 1 minute buffer

    if (nowMs >= open.getTime() - buffer && nowMs <= close.getTime() + buffer) {
      const diffToClose = (close.getTime() - nowMs) / (1000 * 60);
      return {
        dayName,
        label: diffToClose <= 45 ? "Stänger snart" : "Öppet",
        isOpen: true,
        openTime,
        closeTime,
      };
    }

    const diffToOpen = (open.getTime() - nowMs) / (1000 * 60);
    if (diffToOpen > 0 && diffToOpen <= 45) {
      return {
        dayName,
        label: "Öppnar snart",
        isOpen: false,
        openTime,
        closeTime,
      };
    }

    return {
      dayName,
      label: "Stängt",
      isOpen: false,
      openTime,
      closeTime,
    };
  }, [hours]);

  const getStatusColor = (label: Status["label"]) => {
    switch (label) {
      case "Öppet":
        return "text-green-600";
      case "Stänger snart":
        return "text-orange-600";
      case "Öppnar snart":
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className={`flex items-center gap-1 font-medium ${getStatusColor(
          status.label
        )}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            status.isOpen
              ? "bg-green-500"
              : status.label === "Öppnar snart"
                ? "bg-yellow-400"
                : "bg-red-500"
          }`}
        />
        <span>{status.label}</span>
      </div>

      {status.openTime && status.closeTime && (
        <span className="text-text-default">
          - {status.openTime}–{status.closeTime}
        </span>
      )}
    </div>
  );
};

export default OpeningStatusIndicator;

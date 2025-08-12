export function formatDateLocal(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper to convert "HH:mm" to minutes
export function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// Helper to convert minutes to "HH:mm"
export function minutesToTime(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

// Helper to format time as h:mm AM/PM
export function formatTimeAMPM(time: string) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m, 0, 0);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function toFullTimeWithOffset(timeHHMM: string) {
  // Split hours and minutes
  const [hours, minutes] = timeHHMM.split(":");
  
  // Get system timezone offset in minutes (negative if ahead of UTC)
  const offsetMinutes = -new Date().getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");

  return `${hours}:${minutes}:00${offsetSign}${offsetHours}`;
}
import type { TNotification } from "@/types";
import { Calendar } from "lucide-react";

const NotificationItem = ({
  options: { title, message },
}: {
  options: TNotification;
}) => {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
        <Calendar />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-400 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        March 25, 2025 at 9:00 AM
      </div>
    </div>
  );
};

export default NotificationItem;

import { TicketPercent } from "lucide-react";

export default function StatusCard({
  title,
  count,
  description,
}: {
  title: string;
  count: number;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-md border flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <h3 className="font-bold text-2xl">{count}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-md flex items-center justify-center">
        <TicketPercent className="w-5 h-5" />
      </div>
    </div>
  );
}

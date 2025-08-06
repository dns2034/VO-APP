import { FC } from "react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  onClick,
}) => {
  return (
    <Card
      className="p-4 md:p-6 relative cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="absolute right-4 md:right-6 top-4 md:top-6">{icon}</div>
      <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl font-extrabold">{value}</p>
      <p className="text-sm md:text-base text-gray-500">{description}</p>
    </Card>
  );
};

export default StatsCard;
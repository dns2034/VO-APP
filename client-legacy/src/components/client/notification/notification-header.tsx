import { FC } from "react";

const NotificationHeader: FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          See all your important updates in one place
        </p>
      </div>
    </div>
  );
};

export default NotificationHeader;

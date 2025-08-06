import type { TNotification } from "@/types";
import NotificationItem from "./notification-item";
import NotificationTable from "./notification.table";

const UnReadNotificationList = ({
  unReadNotifications,
}: {
  unReadNotifications: TNotification[];
}) => {
  return (
    <NotificationTable>
      {unReadNotifications.map((item) => (
        <NotificationItem key={item.id} options={item} />
      ))}
    </NotificationTable>
  );
};

export default UnReadNotificationList;

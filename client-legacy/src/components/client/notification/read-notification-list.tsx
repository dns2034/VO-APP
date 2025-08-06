import type { TNotification } from "@/types";
import NotificationItem from "./notification-item";
import NotificationTable from "./notification.table";

const unReadNotificationList = ({
  readNotifications,
}: {
  readNotifications: TNotification[];
}) => {
  return (
    <NotificationTable>
      {readNotifications.map((item) => (
        <NotificationItem key={item.id} options={item} />
      ))}
    </NotificationTable>
  );
};

export default unReadNotificationList;

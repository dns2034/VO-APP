import NotificationHeader from "@/components/client/notification/notification-header";
import NotificationNavbar from "@/components/client/notification/notification-navbar";
import NotificationTabs from "@/components/client/notification/notification-tabs";
import ReadNotificationList from "@/components/client/notification/read-notification-list";
import UnReadNotificationList from "@/components/client/notification/unread-notification-list";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import supabase from "@/config/supabase-client";
import { useAuth } from "@/contexts/auth-context";
import {
  getUserNotifications,
  notificationCount,
} from "@/services/notification";
import type { TNotification } from "@/types";

import { MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Notification() {
  const [searchParams, setSearchParam] = useSearchParams();
  const [count, setCount] = useState<number>(1);
  const [unReadNotifications, setUnReadNotifications] = useState<
    TNotification[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<TNotification[]>(
    []
  );
  const { user } = useAuth();

  useEffect(() => {
    if (!searchParams.get("variant")) {
      setSearchParam((prevParams) => {
        prevParams.set("variant", "unread");
        return prevParams;
      });
    }

    if (!searchParams.get("page")) {
      setSearchParam((prevParams) => {
        prevParams.set("page", "1");
        return prevParams;
      });
    }

    if (!searchParams.get("pageSize")) {
      setSearchParam((prevParams) => {
        prevParams.set("pageSize", "5");
        return prevParams;
      });
    }

    if (!searchParams.get("sort")) {
      setSearchParam((prevParams) => {
        prevParams.set("sort", "latest");
        return prevParams;
      });
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchParam((prev) => {
      prev.set("page", "1");
      return prev;
    });
  }, [searchParams.get("variant")]);

  useEffect(() => {
    getUserNotifications(user?.id!, searchParams.get("variant")! == "read", {
      page: Number(searchParams.get("page")!),
      pageSize: Number(searchParams.get("pageSize")!),
    }).then((data) => {
      if (searchParams.get("variant")! == "read") {
        setReadNotifications(data);
      } else {
        setUnReadNotifications(data);
      }
    });
    notificationCount(user?.id!, searchParams.get("variant")! == "read").then(
      (count) => {
        setCount(count as number);
      }
    );
  }, [searchParams]);

  useEffect(() => {
    const channel = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${user?.id}`,
        },
        (payload) => {
          console.log(payload);
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  // async function createNotification() {
  //   try {
  //     await sendNotification(
  //       "274999e6-7275-4eac-858f-26c9ec501350",
  //       user?.id!,
  //       {
  //         title: "Testing 1",
  //         message: "notification",
  //       }
  //     );
  //   } catch (error) {
  //     if (error instanceof PostgrestError) {
  //       console.log(error.message);
  //     }
  //   }
  // }

  return (
    <div className="w-full flex flex-col px-8 py-6 h-full">
      {/* <Button
        onClick={() => {
          createNotification();
        }}
      >
        New Notification
      </Button> */}
      <NotificationHeader />
      <NotificationNavbar />
      <Tabs
        className="w-full"
        value={searchParams.get("variant")!}
        onValueChange={(value) => {
          setSearchParam((prevParams) => {
            prevParams.set("variant", value);
            return prevParams;
          });
        }}
      >
        <div className="flex items-center justify-between w-full">
          <NotificationTabs
            count={count}
            variant={searchParams.get("variant")!}
          />
          <div className="flex items-center gap-2">
            <Select defaultValue="latest">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MailCheck />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Mark all as Read</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <TabsContent value="unread">
          <UnReadNotificationList unReadNotifications={unReadNotifications} />
        </TabsContent>
        <TabsContent value="read">
          <ReadNotificationList readNotifications={readNotifications} />
        </TabsContent>
      </Tabs>
      <div className="py-2">
        <PaginationWithLinks
          page={Number(searchParams.get("page"))}
          pageSize={Number(searchParams.get("pageSize"))}
          totalCount={count}
        />
      </div>
    </div>
  );
}

export default Notification;

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

const NotificationTabs = ({
  count,
  variant,
}: {
  count: number;
  variant: string;
}) => {
  const [_, setSearchParam] = useSearchParams();
  return (
    <TabsList>
      <TabsTrigger
        value="unread"
        className="flex gap-2 items-center data-[state=active]:text-white data-[state=active]:bg-purple-600 font-semibold"
        onClick={() => {
          setSearchParam((prevParams) => {
            prevParams.set("variant", "unread");
            return prevParams;
          });
        }}
      >
        Unread{" "}
        {variant == "unread" && count > 0 && (
          <span className={"rounded-full px-2 text-white bg-purple-500"}>
            {count}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger
        value="read"
        className="flex gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold"
        onClick={() => {
          setSearchParam((prevParams) => {
            prevParams.set("variant", "read");
            return prevParams;
          });
        }}
      >
        Read{" "}
        {variant == "read" && count > 0 && (
          <span className={"rounded-full px-2 text-white bg-purple-500"}>
            {count}
          </span>
        )}
      </TabsTrigger>
    </TabsList>
  );
};

export default NotificationTabs;

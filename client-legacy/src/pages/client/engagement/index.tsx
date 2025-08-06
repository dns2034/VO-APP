import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./components/header";
import ForumTab from "./components/tabs/forum";
import LeaderboardTab from "./components/tabs/leaderboard";

export default function EngagementPage() {
  return (
    <div className="flex items-start justify-start h-full pt-10 w-full flex-col space-y-10 md:w-5/6">
      <Header />

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
            value="leaderboard"
          >
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:bg-primary data-[state=active]:text-white"
            value="password"
          >
            Forum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <LeaderboardTab />
        </TabsContent>
        <TabsContent value="password">
          <ForumTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

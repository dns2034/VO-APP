import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistrationTab } from "./components/registration-tab";
import { SecurityTab } from "./components/security-tab";

const Settings = () => {
  const [allowRegistration, setAllowRegistration] = useState(true);

  return (
    <div className="flex flex-col h-screen container px-2 md:px-12 pt-5">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Configure System Settings</h1>
        <p className="text-gray-600 text-sm md:text-sm">
          Adjust system-wide settings and manage permissions
        </p>
      </div>
      
      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="mb-6 p-1.5 rounded-lg border">
          <TabsTrigger 
            value="registration" 
            className="px-6 data-[state=active]:bg-[#7844ec] data-[state=active]:text-white transition-colors"
          >
            Registration
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="px-6 data-[state=active]:bg-[#7844ec] data-[state=active]:text-white transition-colors"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="registration">
          <RegistrationTab 
            allowRegistration={allowRegistration} 
            setAllowRegistration={setAllowRegistration} 
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
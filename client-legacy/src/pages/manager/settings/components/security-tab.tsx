import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Figma } from "lucide-react";

export const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
        <CardDescription>
          Configure security options and access controls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 p-3 bg-blue-50 rounded-full">
            <Figma className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Security Settings in Progress</h3>
          <p className="text-gray-500 max-w-md">
            Our team is currently designing the security settings interface in Figma.
            This section will be implemented soon with comprehensive security controls.
          </p>
        </div>
      </CardContent>
      <CardContent className="border-t pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          <span>Last design update: Today at 2:30 PM</span>
        </div>
      </CardContent>
    </Card>
  );
};
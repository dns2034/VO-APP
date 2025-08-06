import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50/50 p-4 w-full">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon with subtle animation */}
        <div className="relative mx-auto w-24 h-24 mb-2">
          <div className="absolute inset-0 bg-purple-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
          404
        </h1>
        
        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Page not found</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            We couldn't find what you were looking for. The page might have been moved or deleted.
          </p>
        </div>
        
      
        <div className="pt-4">
          <Button 
            onClick={() => navigate('/')} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
      
        <button 
          onClick={() => navigate(-1)} 
          className="text-sm text-purple-600 hover:text-purple-700 hover:underline mt-2"
        >
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
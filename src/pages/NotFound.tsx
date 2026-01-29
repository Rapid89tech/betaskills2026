
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center max-w-md mx-auto px-6 animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
        </div>
        
        <div className="space-y-4 animate-slide-in-right delay-200">
          <h2 className="text-2xl font-bold text-gray-800">Oops! Page not found</h2>
          <p className="text-gray-600 leading-relaxed">
            Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-in-right delay-400">
          <Button 
            asChild 
            variant="outline" 
            className="flex items-center gap-2 hover-scale"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          
          <Button 
            asChild 
            className="bg-gradient-primary hover:opacity-90 text-white flex items-center gap-2 hover-scale"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 animate-fade-in delay-600">
          <p>If this is your site and you weren't expecting a 404 for this path, please check your routing configuration.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

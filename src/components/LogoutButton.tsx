
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const LogoutButton = ({ variant = "ghost", size = "sm", className }: LogoutButtonProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    // Show immediate feedback
    toast({
      title: "👋 Logging out...",
      description: "Thanks for using Beta Skill Training Solutions!",
    });
    
    // Set up emergency timeout (5 seconds max)
    const emergencyTimeout = setTimeout(() => {
      console.warn('🚨 Emergency logout timeout - forcing redirect...');
      window.location.replace('/auth');
    }, 5000);
    
    try {
      // Call signOut which handles everything
      await signOut();
      clearTimeout(emergencyTimeout);
    } catch (error) {
      console.error('Logout error in button:', error);
      clearTimeout(emergencyTimeout);
      
      toast({
        title: "❌ Logout Error",
        description: "Redirecting to login page anyway...",
        variant: "destructive",
      });
      
      // Force redirect as last resort
      setTimeout(() => {
        window.location.replace('/auth');
      }, 1000);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`flex items-center gap-2 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
};

export default LogoutButton;

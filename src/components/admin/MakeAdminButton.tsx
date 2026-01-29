import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MakeAdminButtonProps {
  userId: string;
  currentRole: string;
  onRoleUpdate: () => void;
}

const MakeAdminButton: React.FC<MakeAdminButtonProps> = ({ userId, currentRole, onRoleUpdate }) => {
  const { toast } = useToast();

  const handleMakeAdmin = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Role Updated",
        description: "User role has been updated to admin. Please refresh the page.",
      });
      
      onRoleUpdate();
      
      // Refresh the page to update the auth context
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (currentRole === 'admin') {
    return null;
  }

  return (
    <Button onClick={handleMakeAdmin} variant="outline" size="sm">
      Make Admin
    </Button>
  );
};

export default MakeAdminButton;
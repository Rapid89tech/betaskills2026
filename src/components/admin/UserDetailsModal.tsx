import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { Profile } from '@/types/auth';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Profile | null;
}

const UserDetailsModal = ({ isOpen, onClose, user }: UserDetailsModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {(user.first_name?.[0] || user.email[0]).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Badge>{user.role}</Badge>
          <div className="text-sm">
            <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
            <p>Updated: {new Date(user.updated_at).toLocaleDateString()}</p>
          </div>
          <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Receipt } from 'lucide-react';
import { Profile } from '@/types/auth';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: any) => void;
  user: Profile | null;
}

const InvoiceModal = ({ isOpen, onClose, onGenerate, user }: InvoiceModalProps) => {
  const [amount, setAmount] = useState('500');
  const [description, setDescription] = useState('Admin Fee');
  const [course, setCourse] = useState('Entrepreneurship Fundamentals');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onGenerate({
      userId: user.id,
      amount: parseFloat(amount),
      description,
      email: user.email,
      course,
      contactNumber,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
    });

    setAmount('500');
    setDescription('Admin Fee');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Generate Invoice
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {user && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ZAR)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course Selected</Label>
            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full p-2 border rounded"
            >
              <option>Entrepreneurship Fundamentals</option>
              <option>AI and Human Relations</option>
              <option>Sound Engineering Professional Certification</option>
              <option>Mastering Podcast Management</option>
              <option>Diesel Mechanic Professional Certification</option>
              <option>Motor Mechanic (Petrol) Professional Certification</option>
              <option>Computer & Laptop Repairs</option>
              <option>Cellphone Repairs and Maintenance</option>
              <option>Professional Hair Dressing Certification</option>
              <option>Professional Nail Technician Certification</option>
              <option>Professional Plumbing Training Program</option>
              <option>Professional Tiling Certification</option>
              <option>Professional Roofing Certification</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter contact number"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Generate Invoice
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
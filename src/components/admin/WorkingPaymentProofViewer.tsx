import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  CheckCircle, 
  XCircle, 
  User, 
  Calendar, 
  DollarSign,
  FileText,
  AlertCircle,
  X
} from 'lucide-react';

interface Enrollment {
  id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  proof_of_payment?: string;
  payment_ref?: string;
  payment_date?: string;
  payment_type?: 'card' | 'eft' | 'manual';
  user?: {
    first_name: string;
    last_name: string;
    role: string;
  };
}

interface WorkingPaymentProofViewerProps {
  enrollment: Enrollment | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (enrollmentId: string) => Promise<void>;
  onReject: (enrollmentId: string, reason?: string) => Promise<void>;
}

const WorkingPaymentProofViewer = ({ 
  enrollment, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}: WorkingPaymentProofViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const { toast } = useToast();

  if (!isOpen || !enrollment) return null;

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await onApprove(enrollment.id);
      toast({
        title: 'Enrollment Approved',
        description: 'The enrollment has been approved successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve enrollment.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: 'Rejection Reason Required',
        description: 'Please provide a reason for rejection.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await onReject(enrollment.id, rejectReason);
      toast({
        title: 'Enrollment Rejected',
        description: 'The enrollment has been rejected.',
      });
      onClose();
      setShowRejectForm(false);
      setRejectReason('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject enrollment.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadProof = () => {
    if (enrollment.proof_of_payment) {
      const link = document.createElement('a');
      link.href = enrollment.proof_of_payment;
      link.download = `payment-proof-${enrollment.id}.jpg`;
      link.click();
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Payment Proof Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Details Panel */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Name:</span> {enrollment.user?.first_name} {enrollment.user?.last_name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {enrollment.user_email}
                  </div>
                  <div>
                    <span className="font-medium">Course:</span> {enrollment.course_title}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Type:</span>
                    <Badge variant={enrollment.payment_type === 'card' ? 'default' : 'secondary'}>
                      {enrollment.payment_type?.toUpperCase() || 'MANUAL'}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Reference:</span> {enrollment.payment_ref || 'Not provided'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">Date:</span> 
                    {enrollment.payment_date ? formatDate(enrollment.payment_date) : 'Not specified'}
                  </div>
                  <div>
                    <span className="font-medium">Enrolled:</span> {formatDate(enrollment.enrolled_at)}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Status Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Current Status:</span>
                    <Badge variant={
                      enrollment.status === 'approved' ? 'default' :
                      enrollment.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {enrollment.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {enrollment.status === 'pending' && (
                <div className="space-y-3">
                  {!showRejectForm ? (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleApprove}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Enrollment
                      </Button>
                      <Button 
                        onClick={() => setShowRejectForm(true)}
                        disabled={isLoading}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800">Rejection Reason</h4>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Please provide a reason for rejection..."
                        className="w-full p-2 border rounded-md resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleReject}
                          disabled={isLoading || !rejectReason.trim()}
                          variant="destructive"
                          size="sm"
                        >
                          Confirm Rejection
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowRejectForm(false);
                            setRejectReason('');
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Proof Image Panel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Proof of Payment</h3>
                {enrollment.proof_of_payment && (
                  <div className="flex gap-2">
                    <Button onClick={handleZoomOut} variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleZoomIn} variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleDownloadProof} variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
                {enrollment.proof_of_payment ? (
                  <div className="overflow-auto max-h-[500px] w-full">
                    {!imageError ? (
                      <img
                        src={enrollment.proof_of_payment}
                        alt="Proof of Payment"
                        style={{ 
                          transform: `scale(${zoom})`,
                          transformOrigin: 'top left',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                        onError={() => setImageError(true)}
                        className="rounded border"
                      />
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                        <p className="text-red-600 font-medium">Failed to load image</p>
                        <p className="text-sm text-gray-600 mt-2">
                          The payment proof image could not be displayed.
                        </p>
                        <Button 
                          onClick={() => setImageError(false)}
                          variant="outline"
                          size="sm"
                          className="mt-3"
                        >
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 font-medium">No proof of payment attached</p>
                    <p className="text-sm text-gray-500 mt-2">
                      This enrollment does not have a payment proof image.
                    </p>
                  </div>
                )}
              </div>

              {enrollment.proof_of_payment && (
                <div className="text-xs text-gray-500 text-center">
                  Zoom: {Math.round(zoom * 100)}% • Click and drag to pan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingPaymentProofViewer;
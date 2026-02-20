import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentNotificationService } from '@/services/enrollmentNotificationService';
import { logger } from '@/utils/logger';
import EnrollmentErrorBoundary from '@/components/error/EnrollmentErrorBoundary';
import { saveEnrollmentStatus } from '@/utils/enrollmentStatusSaver';
import { EnrollmentStatus } from '@/types/enrollment';

const getSupabaseConfig = () => {
  const supabaseUrl =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    'https://jpafcmixtchvtrkhltst.supabase.co';
  const supabaseAnonKey =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWZjbWl4dGNodnRya2hsdHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzIzODYsImV4cCI6MjA2OTEwODM4Nn0.dR0-DW8_ekftD9DZjGutGuyh4kiPG338NQ367tC8Pcw';
  return { supabaseUrl, supabaseAnonKey };
};

const readAccessTokenFromStorage = (): string | null => {
  const keys = ['SupabaseAuth', 'supabase-auth-session'];
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const accessToken = parsed?.access_token || parsed?.currentSession?.access_token;
      if (accessToken) return String(accessToken);
    } catch {
      continue;
    }
  }
  return null;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const compressImageFile = async (file: File, opts?: { maxWidth?: number; maxHeight?: number; quality?: number }): Promise<File> => {
  const maxWidth = opts?.maxWidth ?? 1600;
  const maxHeight = opts?.maxHeight ?? 1600;
  const quality = opts?.quality ?? 0.75;

  if (!file.type.startsWith('image/')) return file;

  const dataUrl = await fileToDataUrl(file);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image for compression'));
    image.src = dataUrl;
  });

  let { width, height } = img;
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  width = Math.max(1, Math.round(width * ratio));
  height = Math.max(1, Math.round(height * ratio));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to compress image'))),
      'image/jpeg',
      quality
    );
  });

  const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
  return new File([blob], name, { type: 'image/jpeg' });
};

const invokeSubmitEftEnrollment = async (payload: any) => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  console.log('🌐 submit-eft-enrollment: preparing request');

  // Prefer a fast local read to avoid any rare hangs in auth/session plumbing.
  let accessToken: string | null = readAccessTokenFromStorage();

  // Best-effort: try to read the session token, but never block the request on it.
  if (!accessToken) {
    try {
      const sessionResp = await withTimeout(
        supabase.auth.getSession(),
        1500,
        'Session read timed out'
      );
      accessToken = (sessionResp as any)?.data?.session?.access_token || null;
    } catch {
      accessToken = null;
    }
  }

  const url = `${supabaseUrl}/functions/v1/submit-eft-enrollment`;

  const attempts = [20000, 30000, 45000];
  let lastErr: any = null;
  for (let i = 0; i < attempts.length; i++) {
    const timeoutMs = attempts[i];
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      console.log(`🌐 submit-eft-enrollment attempt ${i + 1}/${attempts.length} (timeout ${timeoutMs}ms)`);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        apikey: supabaseAnonKey,
      };
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const json = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        const msg = json?.error || json?.message || `Request failed (${resp.status})`;
        throw new Error(String(msg));
      }

      return json;
    } catch (e: any) {
      lastErr = e;
      const msg = String(e?.message || e || '');
      console.error(`❌ submit-eft-enrollment attempt ${i + 1} failed:`, msg);
      const retryable = /aborted|abort|timed out|timeout|failed to fetch|network/i.test(msg);
      if (!retryable || i === attempts.length - 1) {
        break;
      }
      await sleep(800 * Math.pow(2, i));
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw lastErr || new Error('Enrollment submission failed');
};

const withTimeout = async <T,>(promise: Promise<T>, ms: number, message: string): Promise<T> => {
  let timeoutId: number | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) window.clearTimeout(timeoutId);
  }
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

interface ProofOfPaymentFormProps {
  courseId: string;
  reference: string;
  amount: number;
  onClose: () => void;
  onSuccess: (paymentData: any) => void;
}

const ProofOfPaymentForm: React.FC<ProofOfPaymentFormProps> = ({
  courseId,
  reference,
  amount,
  onClose,
  onSuccess
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    transactionId: '',
    transactionDate: '',
    notes: '',
    file: null as File | null
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setFormData({
        ...formData,
        file
      });
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file) {
      toast({
        title: "Missing proof of payment",
        description: "Please upload your proof of payment document before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.transactionId.trim()) {
      toast({
        title: "Missing transaction number",
        description: "Please enter your transaction/reference number.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please wait for authentication to complete or refresh the page.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    let didComplete = false;

    try {
      let proofUrl: string;

      try {
        console.log('📤 Uploading proof of payment file...');
        const uploadTimeouts = [45000, 90000];
        let lastUploadErr: any = null;
        let fileToUpload: File = formData.file;

        for (let attempt = 0; attempt < uploadTimeouts.length; attempt++) {
          try {
            const fileExt = fileToUpload.name.split('.').pop();
            const fileName = `${user.id}_${courseId}_${Date.now()}.${fileExt}`;
            const filePath = `payment-proofs/${fileName}`;

            const { error: uploadError } = await withTimeout(
              supabase.storage
                .from('payment-proofs')
                .upload(filePath, fileToUpload, {
                  cacheControl: '3600',
                  upsert: false
                }),
              uploadTimeouts[attempt],
              'Upload timed out. Please check your connection and try again.'
            );

            if (uploadError) {
              console.error('❌ File upload error:', uploadError);
              throw new Error(`Failed to upload file: ${uploadError.message}`);
            }

            const { data: { publicUrl } } = supabase.storage
              .from('payment-proofs')
              .getPublicUrl(filePath);

            proofUrl = publicUrl;
            console.log('✅ File uploaded successfully:', proofUrl);
            lastUploadErr = null;
            break;
          } catch (e: any) {
            lastUploadErr = e;
            const msg = String(e?.message || e || '');
            const retryable = /aborted|abort|timed out|timeout|failed to fetch|network/i.test(msg);
            if (!retryable || attempt === uploadTimeouts.length - 1) {
              break;
            }
            await sleep(700 * Math.pow(2, attempt));
          }
        }

        if (lastUploadErr) {
          throw lastUploadErr;
        }
      } catch (uploadErr) {
        let fileForFallback = formData.file;
        if (fileForFallback.type.startsWith('image/')) {
          try {
            fileForFallback = await withTimeout(
              compressImageFile(fileForFallback, { maxWidth: 1600, maxHeight: 1600, quality: 0.75 }),
              12000,
              'Failed to optimize image for upload.'
            );
          } catch {
            fileForFallback = formData.file;
          }
        }

        const maxFallbackBytes = 4.5 * 1024 * 1024;
        if (fileForFallback.size > maxFallbackBytes) {
          throw uploadErr;
        }

        console.warn('⚠️ Storage upload failed, falling back to embedded proof for this submission.');
        proofUrl = await withTimeout(
          fileToDataUrl(fileForFallback),
          15000,
          'Failed to read proof file for fallback upload.'
        );
      }

      // Submit to database (authoritative) - no background save
      console.log('🔄 Submitting EFT enrollment to database...');

      const enrollmentPayload = {
        userId: user.id,
        userEmail: user.email || formData.email,
        courseId: courseId,
        paymentRef: formData.transactionId,
        courseTitle: (window as any).__current_course_title__ || undefined,
        proofOfPayment: proofUrl,
        paymentDate: formData.transactionDate,
        notes: formData.notes,
        transactionId: formData.transactionId
      };

      const data = await withTimeout(
        invokeSubmitEftEnrollment(enrollmentPayload),
        160000,
        'Enrollment submission is taking too long. Please try again.'
      );
      const serverEnrollment = (data as any)?.enrollment;
      if (!serverEnrollment?.id) {
        throw new Error('Enrollment submission failed: missing enrollment id from server');
      }

      // Show success only after server confirms
      toast({
        title: "Proof of Payment Submitted!",
        description: "Your enrollment is now pending approval. Admin will review your payment proof.",
      });

      const enrollmentData = {
        ...serverEnrollment,
        id: serverEnrollment.id,
        user_id: serverEnrollment.user_id || user.id,
        user_email: serverEnrollment.user_email || user.email || formData.email,
        course_id: serverEnrollment.course_id || courseId,
        course_title: serverEnrollment.course_title || (window as any).__current_course_title__ || undefined,
        status: serverEnrollment.status || 'pending',
        enrolled_at: serverEnrollment.enrolled_at || new Date().toISOString(),
        payment_method: serverEnrollment.payment_method || 'eft',
        proof_of_payment: serverEnrollment.proof_of_payment || proofUrl,
        payment_date: serverEnrollment.payment_date || formData.transactionDate || new Date().toISOString().split('T')[0],
        notes: serverEnrollment.notes || formData.notes,
      };

      // Update UI after authoritative insert
      setIsSubmitting(false);
      didComplete = true;
      onSuccess(enrollmentData);

      // Save to local persistence for course card
      try {
        saveEnrollmentStatus({
          id: enrollmentData.id,
          user_id: enrollmentData.user_id,
          user_email: enrollmentData.user_email,
          course_id: enrollmentData.course_id,
          course_title: enrollmentData.course_title,
          status: 'pending',
          enrolled_at: enrollmentData.enrolled_at,
          progress: 0,
        });
        window.dispatchEvent(
          new CustomEvent('enrollment-status-updated', {
            detail: {
              enrollmentId: enrollmentData.id,
              userId: user.id,
              courseId,
              status: EnrollmentStatus.PENDING_APPROVAL,
            },
          })
        );
      } catch (e) {
        console.error('❌ local persistence save failed:', e);
      }

      // Force UI refresh
      window.dispatchEvent(new CustomEvent('force-course-card-refresh'));
      window.dispatchEvent(new CustomEvent('enrollment-success'));

      // Notify admin dashboard to refresh immediately
      try {
        const enrollmentId = enrollmentData.id;
        window.dispatchEvent(
          new CustomEvent('refresh-admin-dashboard', { detail: { source: 'eft-edge', enrollmentId } })
        );
        localStorage.setItem(
          'admin-dashboard-refresh',
          JSON.stringify({ ts: Date.now(), source: 'eft-edge', enrollmentId })
        );
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel('admin-dashboard');
          bc.postMessage({ type: 'refresh-enrollments', source: 'eft-edge', enrollmentId, ts: Date.now() });
          bc.close();
        }
      } catch {}

      // Send admin notifications for new EFT enrollment
      try {
        const { data: adminUsers, error: adminError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin');
        
        if (!adminError && adminUsers && adminUsers.length > 0) {
          const adminIds = adminUsers.map(admin => admin.id);
          await enrollmentNotificationService.notifyAdminNewEFTEnrollment(
            adminIds,
            user.email || formData.email,
            enrollmentData.course_title || 'Course',
            courseId,
            enrollmentData.id,
            reference,
            amount,
            'ZAR'
          );
          logger.info('✅ Admin notifications sent for new EFT enrollment');
        }
      } catch (notificationError) {
        logger.error('❌ Failed to send admin notifications:', notificationError);
      }
    } catch (error: any) {
      console.error('❌ Submission error:', error);
      setIsSubmitting(false);
      toast({
        title: "Submission failed",
        description: error?.message || "Failed to submit proof of payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      if (!didComplete) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <EnrollmentErrorBoundary
      enrollmentContext={{
        courseId: courseId,
        userId: user?.id || undefined,
        operation: 'payment'
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-lg w-full bg-white max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Submit Proof of Payment</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-8 w-8 text-white hover:bg-red-600 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form id="proof-of-payment-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Full Name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transactionId">
                  Transaction/Reference Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="transactionId"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                  placeholder="Transaction ID"
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transactionDate">
                  Transaction Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="transactionDate"
                  name="transactionDate"
                  type="date"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional information about your payment"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="proofFile" className="text-base font-semibold">
                Upload Proof of Payment <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-red-300 rounded-md p-4 text-center bg-red-50">
                <input
                  type="file"
                  id="proofFile"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                
                {!filePreview ? (
                  <label 
                    htmlFor="proofFile" 
                    className="flex flex-col items-center justify-center cursor-pointer py-4"
                  >
                    <Upload className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-sm font-bold text-red-700">Click to upload proof of payment (Required)</p>
                    <p className="text-xs text-gray-600 mt-1">PDF, JPG or PNG (max 5MB)</p>
                  </label>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center">
                          {formData.file?.name.endsWith('.pdf') ? (
                            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <img 
                              src={filePreview} 
                              alt="Preview" 
                              className="h-10 w-10 object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="ml-3 truncate">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {formData.file?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formData.file ? (formData.file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFormData({...formData, file: null});
                          setFilePreview(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-center text-gray-500">
                      Click the file to change it
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important:</strong> Please ensure your proof of payment clearly shows the transaction details, including the reference number: <strong className="text-yellow-900">{reference}</strong>. 
                    Admin will review this document before approving your enrollment.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between space-x-4 pt-2 sticky bottom-0 bg-white border-t">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="proof-of-payment-form"
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Proof
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
    </EnrollmentErrorBoundary>
  );
};

export default ProofOfPaymentForm;
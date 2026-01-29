import { supabase } from '@/integrations/supabase/client';

interface BackgroundEnrollmentData {
  user_id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'approved';
  payment_ref?: string;
  payment_id?: string;
}

class BackgroundEnrollmentService {
  private static instance: BackgroundEnrollmentService;
  private enrollmentQueue: BackgroundEnrollmentData[] = [];
  private isProcessing = false;

  static getInstance(): BackgroundEnrollmentService {
    if (!BackgroundEnrollmentService.instance) {
      BackgroundEnrollmentService.instance = new BackgroundEnrollmentService();
    }
    return BackgroundEnrollmentService.instance;
  }

  /**
   * Add enrollment to background processing queue
   */
  async queueEnrollment(enrollmentData: BackgroundEnrollmentData): Promise<void> {
    console.log('📋 BackgroundEnrollmentService: Queueing enrollment:', enrollmentData);
    
    // Check if enrollment already exists
    const existing = await this.checkExistingEnrollment(enrollmentData.user_id, enrollmentData.course_id);
    if (existing) {
      console.log('✅ BackgroundEnrollmentService: Enrollment already exists, skipping');
      return;
    }

    // Add to queue
    this.enrollmentQueue.push(enrollmentData);
    
    // Start processing if not already running
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  /**
   * Check if enrollment already exists
   */
  private async checkExistingEnrollment(userId: string, courseId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      return !error && !!data;
    } catch (error) {
      console.warn('⚠️ BackgroundEnrollmentService: Error checking existing enrollment:', error);
      return false;
    }
  }

  /**
   * Process the enrollment queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.enrollmentQueue.length === 0) {
      return;
    }

    this.isProcessing = true;
    console.log(`🔄 BackgroundEnrollmentService: Processing ${this.enrollmentQueue.length} enrollments`);

    while (this.enrollmentQueue.length > 0) {
      const enrollmentData = this.enrollmentQueue.shift();
      if (!enrollmentData) continue;

      try {
        await this.createEnrollmentWithRetry(enrollmentData);
      } catch (error) {
        console.error('❌ BackgroundEnrollmentService: Failed to create enrollment:', error);
        // Re-queue for retry later
        this.enrollmentQueue.push(enrollmentData);
      }

      // Small delay between enrollments
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.isProcessing = false;
    
    // If there are still items in queue, process again after delay
    if (this.enrollmentQueue.length > 0) {
      setTimeout(() => this.processQueue(), 5000);
    }
  }

  /**
   * Create enrollment with retry logic
   */
  private async createEnrollmentWithRetry(enrollmentData: BackgroundEnrollmentData, maxRetries = 3): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 BackgroundEnrollmentService: Attempt ${attempt}/${maxRetries} for enrollment:`, enrollmentData.course_id);

        const { data, error } = await supabase
          .from('enrollments')
          .insert([{
            user_id: enrollmentData.user_id,
            user_email: enrollmentData.user_email,
            course_id: enrollmentData.course_id,
            course_title: enrollmentData.course_title,
            status: enrollmentData.status,
            progress: 0,
            enrolled_at: new Date().toISOString(),
            payment_ref: enrollmentData.payment_ref || null,
            payment_date: new Date().toISOString()
          }])
          .select()
          .single();

        if (error) {
          throw error;
        }

        console.log('✅ BackgroundEnrollmentService: Enrollment created successfully:', data);
        return;

      } catch (error: any) {
        console.warn(`⚠️ BackgroundEnrollmentService: Attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          throw error;
        }

        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  /**
   * Get queue status
   */
  getQueueStatus(): { queueLength: number; isProcessing: boolean } {
    return {
      queueLength: this.enrollmentQueue.length,
      isProcessing: this.isProcessing
    };
  }
}

export const backgroundEnrollmentService = BackgroundEnrollmentService.getInstance();

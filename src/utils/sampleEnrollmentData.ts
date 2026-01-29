import { supabase } from '@/integrations/supabase/client';
import { logger } from './logger';

export const addSampleEnrollmentData = async () => {
  try {
    logger.info('Adding sample enrollment data to Supabase...');
    
    const sampleEnrollments = [
      {
        user_id: 'sample-user-1',
        user_email: 'student1@example.com',
        course_id: 'ai-human-relations',
        course_title: 'AI and Human Relations',
        proof_of_payment: 'sample_proof_1.pdf',
        payment_ref: 'PAY-001',
        payment_date: '2024-01-15',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        progress: 0
      },
      {
        user_id: 'sample-user-2',
        user_email: 'student2@example.com',
        course_id: 'cellphone-repairs',
        course_title: 'Cellphone Repairs and Maintenance',
        proof_of_payment: 'sample_proof_2.pdf',
        payment_ref: 'PAY-002',
        payment_date: '2024-01-16',
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        progress: 0
      },
      {
        user_id: 'sample-user-3',
        user_email: 'student3@example.com',
        course_id: 'entrepreneurship-final',
        course_title: 'Entrepreneurship Fundamentals',
        proof_of_payment: 'sample_proof_3.pdf',
        payment_ref: 'PAY-003',
        payment_date: '2024-01-17',
        status: 'approved',
        enrolled_at: new Date().toISOString(),
        approved_at: new Date().toISOString(),
        progress: 0
      },
      {
        user_id: 'sample-user-4',
        user_email: 'student4@example.com',
        course_id: 'hair-dressing',
        course_title: 'Hair Dressing and Styling',
        proof_of_payment: 'sample_proof_4.pdf',
        payment_ref: 'PAY-004',
        payment_date: '2024-01-18',
        status: 'rejected',
        enrolled_at: new Date().toISOString(),
        progress: 0
      }
    ];

    const { data, error } = await supabase
      .from('enrollments')
      .insert(sampleEnrollments)
      .select();

    if (error) {
      logger.error('Error adding sample data:', error);
      throw error;
    }

    logger.info('Sample enrollment data added successfully:', data);
    return data;
  } catch (error) {
    logger.error('Failed to add sample enrollment data:', error);
    throw error;
  }
};

export const clearSampleData = async () => {
  try {
    logger.info('Clearing sample enrollment data from Supabase...');
    
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .in('user_id', ['sample-user-1', 'sample-user-2', 'sample-user-3', 'sample-user-4']);

    if (error) {
      logger.error('Error clearing sample data:', error);
      throw error;
    }

    logger.info('Sample enrollment data cleared successfully');
  } catch (error) {
    logger.error('Failed to clear sample enrollment data:', error);
    throw error;
  }
};

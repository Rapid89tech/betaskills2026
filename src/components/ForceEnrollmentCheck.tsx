import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * This component forces a check of all enrollments for the current user
 * and manually updates all course cards on the page based on enrollment status.
 * It runs automatically on mount and doesn't render anything visible.
 */
const ForceEnrollmentCheck: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    const checkAllEnrollments = async () => {
      if (!user) return;

      try {
        console.log('🔄 ForceEnrollmentCheck: Checking all enrollments for user:', user.email);

        // Get all enrollments for the current user
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select('*')
          .or(`user_id.eq.${user.id},user_email.eq.${user.email}`)
          .eq('status', 'approved')
          .order('enrolled_at', { ascending: false });

        if (error) {
          console.error('❌ ForceEnrollmentCheck: Error fetching enrollments:', error);
          return;
        }

        console.log('✅ ForceEnrollmentCheck: Found enrollments:', enrollments);
        
        if (!enrollments || enrollments.length === 0) {
          console.log('ℹ️ ForceEnrollmentCheck: No enrollments found');
          return;
        }

        // For each enrollment, find the corresponding course card button and update it
        enrollments.forEach(enrollment => {
          const courseId = enrollment.course_id;
          
          // Find all enrollment buttons for this course
          setTimeout(() => {
            updateCourseButtons(courseId);
          }, 500);
        });

        // Also dispatch events for each enrollment
        enrollments.forEach(enrollment => {
          // Dispatch enrollment success event
          const enrollmentEvent = new CustomEvent('enrollment-success', {
            detail: {
              courseId: enrollment.course_id,
              course_id: enrollment.course_id,
              user_id: user.id,
              user_email: user.email,
              enrollment: enrollment
            }
          });
          window.dispatchEvent(enrollmentEvent);
        });

        // And finally, a general refresh
        const forceRefreshEvent = new CustomEvent('force-course-card-refresh', {
          detail: {
            timestamp: new Date().toISOString(),
            source: 'force-enrollment-check'
          }
        });
        window.dispatchEvent(forceRefreshEvent);
        
      } catch (err) {
        console.error('❌ ForceEnrollmentCheck: Unexpected error:', err);
      }
    };

    // Directly manipulate the DOM to update course buttons
    // This is a last-resort approach when the reactive updates aren't working
    const updateCourseButtons = (courseId: string) => {
      try {
        // Try to find the course card with this ID
        const cardElements = document.querySelectorAll(`[data-course-id="${courseId}"]`);
        const normalizedId = courseId
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        // Also try with the normalized ID
        const normalizedCardElements = document.querySelectorAll(`[data-course-id="${normalizedId}"]`);
        
        const allCards = [...Array.from(cardElements), ...Array.from(normalizedCardElements)];
        
        if (allCards.length === 0) {
          console.log(`❌ ForceEnrollmentCheck: No card found for course ID: ${courseId}`);
          
          // Try a broader approach - look for any elements containing this course ID
          const allButtons = document.querySelectorAll('button');
          let found = false;
          
          allButtons.forEach(button => {
            // Check if the button or any parent element contains the course ID
            const buttonText = button.textContent?.toLowerCase() || '';
            const hasEnrollNow = buttonText.includes('enroll') && buttonText.includes('now');
            
            if (hasEnrollNow) {
              const parentCard = button.closest('[class*="card"]');
              if (parentCard) {
                const cardText = parentCard.textContent?.toLowerCase() || '';
                
                // Check if this might be the right card based on content
                if (cardText.includes(courseId.toLowerCase()) || 
                    cardText.includes(courseId.replace('-', ' ').toLowerCase())) {
                  
                  console.log(`✅ ForceEnrollmentCheck: Found button for course via text content:`, button);
                  
                  // Replace the button with a Continue button
                  const continueButton = document.createElement('button');
                  continueButton.className = button.className;
                  continueButton.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
                  continueButton.textContent = '✅ Continue Course';
                  continueButton.onclick = () => window.location.href = `/course/${courseId}`;
                  
                  button.parentNode?.replaceChild(continueButton, button);
                  found = true;
                }
              }
            }
          });
          
          if (!found) {
            console.log(`❌ ForceEnrollmentCheck: Could not find any elements for course ID: ${courseId}`);
          }
          
          return;
        }
        
        console.log(`✅ ForceEnrollmentCheck: Found ${allCards.length} cards for course ID: ${courseId}`);
        
        // For each card, find the enrollment button
        allCards.forEach(card => {
          const buttons = card.querySelectorAll('button');
          buttons.forEach(button => {
            const buttonText = button.textContent?.toLowerCase() || '';
            if (buttonText.includes('enroll') && buttonText.includes('now')) {
              console.log('✅ ForceEnrollmentCheck: Found Enroll Now button:', button);
              
              // Replace the button with a Continue button
              const continueButton = document.createElement('button');
              continueButton.className = button.className;
              continueButton.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
              continueButton.textContent = '✅ Continue Course';
              continueButton.onclick = () => window.location.href = `/course/${courseId}`;
              
              button.parentNode?.replaceChild(continueButton, button);
            }
          });
        });
      } catch (err) {
        console.error('❌ ForceEnrollmentCheck: Error updating buttons:', err);
      }
    };
    
    // Run the check when the component mounts
    setTimeout(checkAllEnrollments, 1000);
    
    // Also run it again after a slight delay to ensure DOM is fully loaded
    setTimeout(checkAllEnrollments, 3000);
    
  }, [user]);

  return null; // This component doesn't render anything
};

export default ForceEnrollmentCheck;

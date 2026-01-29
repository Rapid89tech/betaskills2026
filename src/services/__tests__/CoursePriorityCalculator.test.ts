import { CoursePriorityCalculator } from '../CoursePriorityCalculator';

describe('CoursePriorityCalculator', () => {
  const mockCourseIds = ['course-1', 'course-2', 'course-3', 'course-4'];
  const mockEnrollments = {
    'course-1': 'enrolled',
    'course-2': 'pending',
    'course-3': 'unenrolled',
    'course-4': 'approved' // Test different status format
  };

  describe('calculatePriorities', () => {
    it('should calculate priorities based on enrollment status', () => {
      const result = CoursePriorityCalculator.calculatePriorities(
        mockCourseIds,
        mockEnrollments
      );

      expect(result).toHaveLength(4);
      
      // Enrolled course should have highest priority
      const enrolledCourse = result.find(p => p.courseId === 'course-1');
      expect(enrolledCourse?.enrollmentStatus).toBe('ENROLLED');
      expect(enrolledCourse?.priority).toBe(1);
      
      // Approved course should also be treated as enrolled
      const approvedCourse = result.find(p => p.courseId === 'course-4');
      expect(approvedCourse?.enrollmentStatus).toBe('ENROLLED');
      expect(approvedCourse?.priority).toBe(1);
      
      // Pending course should have second priority
      const pendingCourse = result.find(p => p.courseId === 'course-2');
      expect(pendingCourse?.enrollmentStatus).toBe('PENDING');
      expect(pendingCourse?.priority).toBe(2);
      
      // Unenrolled course should have lowest priority
      const unenrolledCourse = result.find(p => p.courseId === 'course-3');
      expect(unenrolledCourse?.enrollmentStatus).toBe('NOT_ENROLLED');
      expect(unenrolledCourse?.priority).toBe(999);
    });

    it('should sort courses by priority', () => {
      const result = CoursePriorityCalculator.calculatePriorities(
        mockCourseIds,
        mockEnrollments
      );

      // Should be sorted by priority (enrolled first, then pending, then others)
      expect(result[0].enrollmentStatus).toBe('ENROLLED');
      expect(result[1].enrollmentStatus).toBe('ENROLLED'); // course-4 (approved)
      expect(result[2].enrollmentStatus).toBe('PENDING');
      expect(result[3].enrollmentStatus).toBe('NOT_ENROLLED');
    });

    it('should handle empty enrollments', () => {
      const result = CoursePriorityCalculator.calculatePriorities(
        mockCourseIds,
        {}
      );

      expect(result).toHaveLength(4);
      result.forEach(priority => {
        expect(priority.enrollmentStatus).toBe('NOT_ENROLLED');
        expect(priority.priority).toBe(999);
      });
    });
  });

  describe('toCoursePriority', () => {
    it('should convert calculations to CoursePriority format', () => {
      const calculations = CoursePriorityCalculator.calculatePriorities(
        mockCourseIds,
        mockEnrollments
      );
      
      const result = CoursePriorityCalculator.toCoursePriority(
        calculations,
        'test-user'
      );

      expect(result).toHaveLength(4);
      result.forEach(priority => {
        expect(priority.userId).toBe('test-user');
        expect(priority.lastUpdated).toBeInstanceOf(Date);
      });

      // Check enrollment status conversion
      const enrolledPriority = result.find(p => p.courseId === 'course-1');
      expect(enrolledPriority?.enrollmentStatus).toBe('ENROLLED');
      
      const unenrolledPriority = result.find(p => p.courseId === 'course-3');
      expect(unenrolledPriority?.enrollmentStatus).toBe('NONE');
    });
  });

  describe('getEnrollmentStatusIndicator', () => {
    it('should return correct indicator for enrolled status', () => {
      const indicator = CoursePriorityCalculator.getEnrollmentStatusIndicator('ENROLLED');
      expect(indicator.label).toBe('Enrolled');
      expect(indicator.color).toBe('green');
      expect(indicator.priority).toBe(1);
      expect(indicator.icon).toBe('CheckCircle');
    });

    it('should return correct indicator for pending status', () => {
      const indicator = CoursePriorityCalculator.getEnrollmentStatusIndicator('PENDING');
      expect(indicator.label).toBe('Pending Approval');
      expect(indicator.color).toBe('yellow');
      expect(indicator.priority).toBe(2);
      expect(indicator.icon).toBe('Clock');
    });

    it('should return correct indicator for not enrolled status', () => {
      const indicator = CoursePriorityCalculator.getEnrollmentStatusIndicator('NOT_ENROLLED');
      expect(indicator.label).toBe('Available');
      expect(indicator.color).toBe('gray');
      expect(indicator.priority).toBe(999);
      expect(indicator.icon).toBe('BookOpen');
    });
  });

  describe('shouldHighlightCourse', () => {
    it('should highlight enrolled courses', () => {
      expect(CoursePriorityCalculator.shouldHighlightCourse('ENROLLED')).toBe(true);
    });

    it('should highlight pending courses', () => {
      expect(CoursePriorityCalculator.shouldHighlightCourse('PENDING')).toBe(true);
    });

    it('should not highlight not enrolled courses', () => {
      expect(CoursePriorityCalculator.shouldHighlightCourse('NOT_ENROLLED')).toBe(false);
    });
  });

  describe('groupCoursesByStatus', () => {
    it('should group courses by enrollment status', () => {
      const calculations = CoursePriorityCalculator.calculatePriorities(
        mockCourseIds,
        mockEnrollments
      );
      
      const groups = CoursePriorityCalculator.groupCoursesByStatus(calculations);
      
      expect(groups.enrolled).toHaveLength(2); // course-1 and course-4
      expect(groups.pending).toHaveLength(1); // course-2
      expect(groups.available).toHaveLength(1); // course-3
      
      expect(groups.hasEnrolled).toBe(true);
      expect(groups.hasPending).toBe(true);
      expect(groups.hasAvailable).toBe(true);
      
      expect(groups.totalEnrolled).toBe(2);
      expect(groups.totalPending).toBe(1);
      expect(groups.totalAvailable).toBe(1);
    });
  });
});
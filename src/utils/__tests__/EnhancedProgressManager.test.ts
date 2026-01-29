import { EnhancedProgressManager, ProgressData } from '../EnhancedProgressManager';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

// Mock supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      upsert: jest.fn(() => ({ error: null })),
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => ({ data: null, error: null }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({}))
        }))
      }))
    }))
  }
}));

describe('EnhancedProgressManager', () => {
  let progressManager: EnhancedProgressManager;
  
  beforeEach(() => {
    progressManager = EnhancedProgressManager.getInstance();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('conflict resolution', () => {
    it('should merge progress data when timestamps are close', async () => {
      const now = new Date();
      const localData: ProgressData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: 2,
        currentLesson: 5,
        completedLessons: [0, 1, 2],
        progress: 30,
        lastUpdated: now.toISOString(),
        sessionId: 'session1',
        version: 1
      };

      const remoteData: ProgressData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: 2,
        currentLesson: 3,
        completedLessons: [0, 1, 3, 4],
        progress: 40,
        lastUpdated: new Date(now.getTime() + 2000).toISOString(), // 2 seconds later
        sessionId: 'session2',
        version: 2
      };

      // Access private method for testing
      const resolveConflict = (progressManager as any).resolveConflict.bind(progressManager);
      const resolution = await resolveConflict(localData, remoteData);

      expect(resolution.strategy).toBe('merge');
      expect(resolution.resolvedData.completedLessons).toEqual([0, 1, 2, 3, 4]);
      expect(resolution.resolvedData.progress).toBe(40); // Max progress
      expect(resolution.resolvedData.currentLesson).toBe(5); // More advanced position
    });

    it('should use local data when significantly newer', async () => {
      const now = new Date();
      const localData: ProgressData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: 2,
        currentLesson: 5,
        completedLessons: [0, 1, 2],
        progress: 30,
        lastUpdated: new Date(now.getTime() + 10000).toISOString(), // 10 seconds later
        sessionId: 'session1',
        version: 2
      };

      const remoteData: ProgressData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: 1,
        currentLesson: 3,
        completedLessons: [0, 1],
        progress: 20,
        lastUpdated: now.toISOString(),
        sessionId: 'session2',
        version: 1
      };

      const resolveConflict = (progressManager as any).resolveConflict.bind(progressManager);
      const resolution = await resolveConflict(localData, remoteData);

      expect(resolution.strategy).toBe('local');
      expect(resolution.resolvedData.currentModule).toBe(2);
      expect(resolution.resolvedData.currentLesson).toBe(5);
    });
  });

  describe('progress recovery', () => {
    it('should recover progress from localStorage when available', async () => {
      const mockProgressData: ProgressData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: 2,
        currentLesson: 5,
        completedLessons: [0, 1, 2],
        progress: 30,
        lastUpdated: new Date().toISOString(),
        sessionId: 'session1',
        version: 1
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockProgressData));

      const recovered = await progressManager.recoverProgress('test-course', 'test-user');

      expect(recovered).toEqual(mockProgressData);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('progress_test-course_test-user');
    });

    it('should return null when no recovery sources are available', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const recovered = await progressManager.recoverProgress('test-course', 'test-user');

      expect(recovered).toBeNull();
    });
  });

  describe('backup functionality', () => {
    it('should create backup when saving progress', async () => {
      const success = await progressManager.saveProgressWithBackup(
        'test-course',
        'test-user',
        2,
        5,
        [0, 1, 2],
        30
      );

      expect(success).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('backup_progress_test-course_test-user'),
        expect.any(String)
      );
    });
  });

  describe('data validation', () => {
    it('should validate and sanitize progress data', () => {
      const invalidData = {
        courseId: 'test-course',
        userId: 'test-user',
        currentModule: -1, // Invalid
        currentLesson: -5, // Invalid
        completedLessons: [-1, 0, 1, -2], // Contains invalid values
        progress: 150, // Invalid (over 100)
        lastUpdated: new Date().toISOString(),
        sessionId: 'session1',
        version: 1
      };

      const validateProgressData = (progressManager as any).validateProgressData.bind(progressManager);
      const validated = validateProgressData(invalidData);

      expect(validated.currentModule).toBe(1); // Corrected to minimum
      expect(validated.currentLesson).toBe(0); // Corrected to minimum
      expect(validated.completedLessons).toEqual([0, 1]); // Filtered negatives
      expect(validated.progress).toBe(100); // Capped at maximum
    });
  });
});
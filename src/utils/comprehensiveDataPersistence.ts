// Comprehensive Data Persistence System
// This utility ensures ALL user data is tracked and persisted across devices

interface UserInteraction {
  timestamp: string;
  action: string;
  page: string;
  data?: any;
  sessionId: string;
}

interface UserProgress {
  courseId: string;
  lessonId: string;
  progress: number;
  completed: boolean;
  lastAccessed: string;
  timeSpent: number;
  quizScores: Record<string, number>;
}

interface UserState {
  currentPage: string;
  currentCourse: string;
  currentLesson: string;
  navigationHistory: string[];
  sessionStartTime: string;
  lastActivity: string;
}

class ComprehensiveDataPersistence {
  private userId: string | null = null;
  private userEmail: string | null = null;
  private sessionId: string;
  private isInitialized = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initialize() {
    if (this.isInitialized) return;
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackActivity('page_visibility_change', {
        visible: document.visibilityState === 'visible',
        timestamp: new Date().toISOString()
      });
    });

    // Track navigation
    window.addEventListener('popstate', () => {
      this.trackActivity('navigation_popstate', {
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.trackActivity('page_unload', {
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
      this.saveAllData();
    });

    this.isInitialized = true;
  }

  setUser(userId: string, userEmail: string) {
    this.userId = userId;
    this.userEmail = userEmail;
    
    // Load existing data for this user
    this.loadUserData();
    
    // Track login
    this.trackActivity('user_login', {
      userId,
      userEmail,
      timestamp: new Date().toISOString()
    });
  }

  private loadUserData() {
    if (!this.userId) return;

    try {
      // Load user history
      const history = this.getUserHistory();
      if (history.length > 0) {
        console.log('📦 Loaded user history:', history.length, 'entries');
      }

      // Load user progress
      const progress = this.getUserProgress();
      if (Object.keys(progress).length > 0) {
        console.log('📦 Loaded user progress for', Object.keys(progress).length, 'courses');
      }

      // Load user state
      const state = this.getUserState();
      if (state.currentPage) {
        console.log('📦 Loaded user state:', state.currentPage);
      }

    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }

  trackActivity(action: string, data?: any) {
    if (!this.userId) return;

    const interaction: UserInteraction = {
      timestamp: new Date().toISOString(),
      action,
      page: window.location.pathname,
      data,
      sessionId: this.sessionId
    };

    // Add to user history
    const history = this.getUserHistory();
    history.push(interaction);
    
    // Keep only last 1000 interactions to prevent localStorage bloat
    if (history.length > 1000) {
      history.splice(0, history.length - 1000);
    }
    
    localStorage.setItem(`user-history-${this.userId}`, JSON.stringify(history));

    // Update last activity
    this.updateLastActivity();
  }

  trackPageVisit(page: string) {
    this.trackActivity('page_visit', { page });
    
    // Update current page in state
    const state = this.getUserState();
    state.currentPage = page;
    state.navigationHistory.push(page);
    
    // Keep only last 50 pages in history
    if (state.navigationHistory.length > 50) {
      state.navigationHistory.splice(0, state.navigationHistory.length - 50);
    }
    
    this.saveUserState(state);
  }

  trackCourseProgress(courseId: string, lessonId: string, progress: number, completed: boolean = false) {
    if (!this.userId) return;

    const userProgress = this.getUserProgress();
    
    if (!userProgress[courseId]) {
      userProgress[courseId] = {
        courseId,
        lessonId,
        progress: 0,
        completed: false,
        lastAccessed: new Date().toISOString(),
        timeSpent: 0,
        quizScores: {}
      };
    }

    const courseProgress = userProgress[courseId];
    courseProgress.lessonId = lessonId;
    courseProgress.progress = Math.max(courseProgress.progress, progress);
    courseProgress.completed = courseProgress.completed || completed;
    courseProgress.lastAccessed = new Date().toISOString();

    this.saveUserProgress(userProgress);

    // Track the activity
    this.trackActivity('course_progress_update', {
      courseId,
      lessonId,
      progress,
      completed
    });
  }

  trackQuizScore(courseId: string, quizId: string, score: number) {
    if (!this.userId) return;

    const userProgress = this.getUserProgress();
    
    if (!userProgress[courseId]) {
      userProgress[courseId] = {
        courseId,
        lessonId: '',
        progress: 0,
        completed: false,
        lastAccessed: new Date().toISOString(),
        timeSpent: 0,
        quizScores: {}
      };
    }

    userProgress[courseId].quizScores[quizId] = score;
    this.saveUserProgress(userProgress);

    // Track the activity
    this.trackActivity('quiz_completed', {
      courseId,
      quizId,
      score
    });
  }

  trackEnrollment(courseId: string, courseTitle: string) {
    this.trackActivity('course_enrollment', {
      courseId,
      courseTitle,
      timestamp: new Date().toISOString()
    });
  }

  trackTimeSpent(courseId: string, timeSpent: number) {
    if (!this.userId) return;

    const userProgress = this.getUserProgress();
    
    if (!userProgress[courseId]) {
      userProgress[courseId] = {
        courseId,
        lessonId: '',
        progress: 0,
        completed: false,
        lastAccessed: new Date().toISOString(),
        timeSpent: 0,
        quizScores: {}
      };
    }

    userProgress[courseId].timeSpent += timeSpent;
    this.saveUserProgress(userProgress);
  }

  private updateLastActivity() {
    const state = this.getUserState();
    state.lastActivity = new Date().toISOString();
    this.saveUserState(state);
  }

  private getUserHistory(): UserInteraction[] {
    if (!this.userId) return [];
    
    try {
      return JSON.parse(localStorage.getItem(`user-history-${this.userId}`) || '[]');
    } catch {
      return [];
    }
  }

  private getUserProgress(): Record<string, UserProgress> {
    if (!this.userId) return {};
    
    try {
      return JSON.parse(localStorage.getItem(`user-progress-${this.userId}`) || '{}');
    } catch {
      return {};
    }
  }

  private getUserState(): UserState {
    if (!this.userId) {
      return {
        currentPage: '',
        currentCourse: '',
        currentLesson: '',
        navigationHistory: [],
        sessionStartTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
    }
    
    try {
      const state = JSON.parse(localStorage.getItem(`user-state-${this.userId}`) || '{}');
      return {
        currentPage: '',
        currentCourse: '',
        currentLesson: '',
        navigationHistory: [],
        sessionStartTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        ...state
      };
    } catch {
      return {
        currentPage: '',
        currentCourse: '',
        currentLesson: '',
        navigationHistory: [],
        sessionStartTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
    }
  }

  private saveUserProgress(progress: Record<string, UserProgress>) {
    if (!this.userId) return;
    localStorage.setItem(`user-progress-${this.userId}`, JSON.stringify(progress));
  }

  private saveUserState(state: UserState) {
    if (!this.userId) return;
    localStorage.setItem(`user-state-${this.userId}`, JSON.stringify(state));
  }

  saveAllData() {
    if (!this.userId) return;

    // Save current state
    const state = this.getUserState();
    state.lastActivity = new Date().toISOString();
    this.saveUserState(state);

    // Dispatch event for cloud sync
    window.dispatchEvent(new CustomEvent('data-persistence-save', {
      detail: {
        userId: this.userId,
        userEmail: this.userEmail,
        timestamp: new Date().toISOString()
      }
    }));
  }

  // Get comprehensive data for cloud sync
  getAllData() {
    if (!this.userId) return null;

    return {
      history: this.getUserHistory(),
      progress: this.getUserProgress(),
      state: this.getUserState(),
      sessionId: this.sessionId,
      lastSync: new Date().toISOString()
    };
  }

  // Restore data from cloud
  restoreData(data: any) {
    if (!this.userId || !data) return;

    try {
      if (data.history) {
        localStorage.setItem(`user-history-${this.userId}`, JSON.stringify(data.history));
      }
      
      if (data.progress) {
        localStorage.setItem(`user-progress-${this.userId}`, JSON.stringify(data.progress));
      }
      
      if (data.state) {
        localStorage.setItem(`user-state-${this.userId}`, JSON.stringify(data.state));
      }

      console.log('✅ Data restored from cloud');
    } catch (error) {
      console.error('❌ Error restoring data:', error);
    }
  }

  clearUserData() {
    if (!this.userId) return;

    localStorage.removeItem(`user-history-${this.userId}`);
    localStorage.removeItem(`user-progress-${this.userId}`);
    localStorage.removeItem(`user-state-${this.userId}`);
    
    console.log('🗑️ User data cleared');
  }
}

// Create singleton instance
export const comprehensiveDataPersistence = new ComprehensiveDataPersistence();

// Export utility functions
export const trackActivity = (action: string, data?: any) => {
  comprehensiveDataPersistence.trackActivity(action, data);
};

export const trackPageVisit = (page: string) => {
  comprehensiveDataPersistence.trackPageVisit(page);
};

export const trackCourseProgress = (courseId: string, lessonId: string, progress: number, completed: boolean = false) => {
  comprehensiveDataPersistence.trackCourseProgress(courseId, lessonId, progress, completed);
};

export const trackQuizScore = (courseId: string, quizId: string, score: number) => {
  comprehensiveDataPersistence.trackQuizScore(courseId, quizId, score);
};

export const trackEnrollment = (courseId: string, courseTitle: string) => {
  comprehensiveDataPersistence.trackEnrollment(courseId, courseTitle);
};

export const trackTimeSpent = (courseId: string, timeSpent: number) => {
  comprehensiveDataPersistence.trackTimeSpent(courseId, timeSpent);
};

export const setUser = (userId: string, userEmail: string) => {
  comprehensiveDataPersistence.setUser(userId, userEmail);
};

export const saveAllData = () => {
  comprehensiveDataPersistence.saveAllData();
};

export const getAllData = () => {
  return comprehensiveDataPersistence.getAllData();
};

export const restoreData = (data: any) => {
  comprehensiveDataPersistence.restoreData(data);
};

export const clearUserData = () => {
  comprehensiveDataPersistence.clearUserData();
};

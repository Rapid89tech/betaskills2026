import { supabase } from '@/integrations/supabase/client';

export interface ProgressData {
  courseId: string;
  userId: string;
  currentModule: number;
  currentLesson: number;
  completedLessons: number[];
  progress: number;
  lastUpdated: string;
  sessionId: string;
  version: number;
}

export interface ConflictResolution {
  strategy: 'local' | 'remote' | 'merge';
  resolvedData: ProgressData;
  conflictDetails: {
    localVersion: number;
    remoteVersion: number;
    localTimestamp: string;
    remoteTimestamp: string;
  };
}

export class EnhancedProgressManager {
  private static instance: EnhancedProgressManager;
  private progressCache = new Map<string, ProgressData>();
  private saveQueue = new Map<string, ProgressData>();
  private isOnline = navigator.onLine;
  private sessionId = this.generateSessionId();
  private saveTimeout: NodeJS.Timeout | null = null;
  private readonly SAVE_DEBOUNCE_MS = 2000;
  private readonly CONFLICT_RESOLUTION_TIMEOUT = 5000;

  private constructor() {
    this.setupEventListeners();
  }

  static getInstance(): EnhancedProgressManager {
    if (!EnhancedProgressManager.instance) {
      EnhancedProgressManager.instance = new EnhancedProgressManager();
    }
    return EnhancedProgressManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners(): void {
    // Online/offline detection
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processSaveQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Cross-tab synchronization
    window.addEventListener('storage', (event) => {
      if (event.key?.startsWith('progress_')) {
        this.handleCrossTabUpdate(event);
      }
    });

    // Periodic sync when online
    setInterval(() => {
      if (this.isOnline && this.saveQueue.size > 0) {
        this.processSaveQueue();
      }
    }, 10000); // Sync every 10 seconds
  }

  private handleCrossTabUpdate(event: StorageEvent): void {
    if (!event.key || !event.newValue) return;

    try {
      const progressData: ProgressData = JSON.parse(event.newValue);
      const cacheKey = this.getCacheKey(progressData.courseId, progressData.userId);
      
      // Update cache with cross-tab data
      this.progressCache.set(cacheKey, progressData);
      
      // Emit custom event for components to react
      window.dispatchEvent(new CustomEvent('progressUpdated', {
        detail: { progressData, source: 'cross-tab' }
      }));
    } catch (error) {
      console.error('Error handling cross-tab progress update:', error);
    }
  }

  private getCacheKey(courseId: string, userId: string): string {
    return `${courseId}_${userId}`;
  }

  private getStorageKey(courseId: string, userId: string): string {
    return `progress_${courseId}_${userId}`;
  }

  async saveProgress(
    courseId: string,
    userId: string,
    currentModule: number,
    currentLesson: number,
    completedLessons: number[],
    progress: number
  ): Promise<boolean> {
    const progressData: ProgressData = {
      courseId,
      userId,
      currentModule,
      currentLesson,
      completedLessons,
      progress,
      lastUpdated: new Date().toISOString(),
      sessionId: this.sessionId,
      version: this.getNextVersion(courseId, userId)
    };

    // Update cache immediately
    const cacheKey = this.getCacheKey(courseId, userId);
    this.progressCache.set(cacheKey, progressData);

    // Save to localStorage immediately
    this.saveToLocalStorage(progressData);

    // Add to save queue for remote sync
    this.saveQueue.set(cacheKey, progressData);

    // Debounced remote save
    this.debouncedRemoteSave();

    return true;
  }

  private getNextVersion(courseId: string, userId: string): number {
    const cacheKey = this.getCacheKey(courseId, userId);
    const cached = this.progressCache.get(cacheKey);
    return cached ? cached.version + 1 : 1;
  }

  private saveToLocalStorage(progressData: ProgressData): void {
    try {
      const storageKey = this.getStorageKey(progressData.courseId, progressData.userId);
      localStorage.setItem(storageKey, JSON.stringify(progressData));
      
      // Broadcast to other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: storageKey,
        newValue: JSON.stringify(progressData),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private debouncedRemoteSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      if (this.isOnline) {
        this.processSaveQueue();
      }
    }, this.SAVE_DEBOUNCE_MS);
  }

  private async processSaveQueue(): Promise<void> {
    if (this.saveQueue.size === 0) return;

    const savePromises = Array.from(this.saveQueue.entries()).map(
      ([cacheKey, progressData]) => this.saveToRemote(progressData)
    );

    try {
      await Promise.allSettled(savePromises);
      this.saveQueue.clear();
    } catch (error) {
      console.error('Error processing save queue:', error);
    }
  }

  private async saveToRemote(progressData: ProgressData): Promise<void> {
    try {
      // Check for conflicts before saving
      const remoteData = await this.getRemoteProgress(progressData.courseId, progressData.userId);
      
      if (remoteData && this.hasConflict(progressData, remoteData)) {
        const resolution = await this.resolveConflict(progressData, remoteData);
        progressData = resolution.resolvedData;
      }

      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: progressData.userId,
          course_id: progressData.courseId,
          current_module: progressData.currentModule,
          current_lesson: progressData.currentLesson,
          completed_lessons: progressData.completedLessons.map(String),
          progress_percentage: progressData.progress,
          last_visited: progressData.lastUpdated,
          session_id: progressData.sessionId,
          version: progressData.version
        }, {
          onConflict: 'user_id,course_id'
        });

      if (error) {
        throw error;
      }

      console.log('✅ Progress saved to remote:', progressData);
    } catch (error) {
      console.error('❌ Error saving progress to remote:', error);
      throw error;
    }
  }

  private async getRemoteProgress(courseId: string, userId: string): Promise<ProgressData | null> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) return null;

      return {
        courseId: data.course_id,
        userId: data.user_id,
        currentModule: data.current_module || 1,
        currentLesson: data.current_lesson || 1,
        completedLessons: (data.completed_lessons || []).map(Number),
        progress: data.progress_percentage || 0,
        lastUpdated: data.last_visited || new Date().toISOString(),
        sessionId: data.session_id || '',
        version: data.version || 1
      };
    } catch (error) {
      console.error('Error getting remote progress:', error);
      return null;
    }
  }

  private hasConflict(localData: ProgressData, remoteData: ProgressData): boolean {
    // Check if versions are different and timestamps indicate potential conflict
    if (localData.version <= remoteData.version) {
      const localTime = new Date(localData.lastUpdated).getTime();
      const remoteTime = new Date(remoteData.lastUpdated).getTime();
      
      // Consider it a conflict if remote is newer and has different data
      return remoteTime > localTime && (
        localData.currentModule !== remoteData.currentModule ||
        localData.currentLesson !== remoteData.currentLesson ||
        JSON.stringify(localData.completedLessons) !== JSON.stringify(remoteData.completedLessons)
      );
    }
    
    return false;
  }

  private async resolveConflict(localData: ProgressData, remoteData: ProgressData): Promise<ConflictResolution> {
    // Enhanced conflict resolution with intelligent merging
    const localTime = new Date(localData.lastUpdated).getTime();
    const remoteTime = new Date(remoteData.lastUpdated).getTime();
    const timeDiff = Math.abs(localTime - remoteTime);
    
    let resolvedData: ProgressData;
    let strategy: 'local' | 'remote' | 'merge';

    // If timestamps are very close (within 5 seconds), always merge
    if (timeDiff < 5000) {
      strategy = 'merge';
    } else if (localTime > remoteTime) {
      // Local is significantly newer
      strategy = 'local';
    } else {
      // Remote is significantly newer
      strategy = 'remote';
    }

    if (strategy === 'merge') {
      // Intelligent merge: preserve maximum progress while maintaining data integrity
      const mergedCompletedLessons = Array.from(new Set([
        ...localData.completedLessons,
        ...remoteData.completedLessons
      ])).sort((a, b) => a - b);

      // Use the position that represents more progress
      const localProgress = localData.currentModule * 100 + localData.currentLesson;
      const remoteProgress = remoteData.currentModule * 100 + remoteData.currentLesson;
      
      const useLocalPosition = localProgress >= remoteProgress;
      
      resolvedData = {
        courseId: localData.courseId,
        userId: localData.userId,
        currentModule: useLocalPosition ? localData.currentModule : remoteData.currentModule,
        currentLesson: useLocalPosition ? localData.currentLesson : remoteData.currentLesson,
        completedLessons: mergedCompletedLessons,
        progress: Math.max(localData.progress, remoteData.progress),
        lastUpdated: localTime > remoteTime ? localData.lastUpdated : remoteData.lastUpdated,
        sessionId: localData.sessionId, // Keep local session
        version: Math.max(localData.version, remoteData.version) + 1
      };
    } else if (strategy === 'local') {
      resolvedData = { ...localData, version: Math.max(localData.version, remoteData.version) + 1 };
    } else {
      resolvedData = { ...remoteData, version: Math.max(localData.version, remoteData.version) + 1 };
    }

    // Validate resolved data integrity
    resolvedData = this.validateProgressData(resolvedData);

    // Update cache with resolved data
    const cacheKey = this.getCacheKey(localData.courseId, localData.userId);
    this.progressCache.set(cacheKey, resolvedData);
    this.saveToLocalStorage(resolvedData);

    console.log('🔄 Enhanced conflict resolved:', { strategy, resolvedData, timeDiff });

    // Emit event for UI to react to conflict resolution
    window.dispatchEvent(new CustomEvent('progressConflictResolved', {
      detail: { strategy, resolvedData, conflictDetails: {
        localVersion: localData.version,
        remoteVersion: remoteData.version,
        localTimestamp: localData.lastUpdated,
        remoteTimestamp: remoteData.lastUpdated,
        timeDifference: timeDiff
      }}
    }));

    return {
      strategy,
      resolvedData,
      conflictDetails: {
        localVersion: localData.version,
        remoteVersion: remoteData.version,
        localTimestamp: localData.lastUpdated,
        remoteTimestamp: remoteData.lastUpdated
      }
    };
  }

  // Validate and sanitize progress data
  private validateProgressData(data: ProgressData): ProgressData {
    return {
      ...data,
      currentModule: Math.max(1, data.currentModule),
      currentLesson: Math.max(0, data.currentLesson),
      progress: Math.min(100, Math.max(0, data.progress)),
      completedLessons: data.completedLessons.filter(lesson => lesson >= 0).sort((a, b) => a - b)
    };
  }

  async loadProgress(courseId: string, userId: string): Promise<ProgressData | null> {
    const cacheKey = this.getCacheKey(courseId, userId);
    
    // Check cache first
    let cachedData = this.progressCache.get(cacheKey);
    
    // Load from localStorage if not in cache
    if (!cachedData) {
      cachedData = this.loadFromLocalStorage(courseId, userId);
      if (cachedData) {
        this.progressCache.set(cacheKey, cachedData);
      }
    }

    // Try to sync with remote if online
    if (this.isOnline) {
      try {
        const remoteData = await this.getRemoteProgress(courseId, userId);
        
        if (remoteData) {
          if (!cachedData || this.hasConflict(cachedData, remoteData)) {
            const resolution = cachedData 
              ? await this.resolveConflict(cachedData, remoteData)
              : { resolvedData: remoteData, strategy: 'remote' as const, conflictDetails: {} as any };
            
            cachedData = resolution.resolvedData;
            this.progressCache.set(cacheKey, cachedData);
            this.saveToLocalStorage(cachedData);
          }
        }
      } catch (error) {
        console.warn('Failed to sync with remote, using local data:', error);
      }
    }

    return cachedData || null;
  }

  private loadFromLocalStorage(courseId: string, userId: string): ProgressData | null {
    try {
      const storageKey = this.getStorageKey(courseId, userId);
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    return null;
  }

  async markLessonCompleted(
    courseId: string,
    userId: string,
    lessonIndex: number,
    totalLessons: number
  ): Promise<boolean> {
    const current = await this.loadProgress(courseId, userId);
    
    const completedLessons = current?.completedLessons || [];
    if (!completedLessons.includes(lessonIndex)) {
      completedLessons.push(lessonIndex);
      completedLessons.sort((a, b) => a - b);
    }

    const progress = Math.round((completedLessons.length / totalLessons) * 100);
    const currentModule = Math.floor(lessonIndex / 5) + 1; // Assuming 5 lessons per module
    const currentLesson = (lessonIndex % 5) + 1;

    return this.saveProgress(
      courseId,
      userId,
      currentModule,
      currentLesson,
      completedLessons,
      progress
    );
  }

  async updateCurrentPosition(
    courseId: string,
    userId: string,
    moduleId: number,
    lessonId: number
  ): Promise<boolean> {
    const current = await this.loadProgress(courseId, userId);
    
    return this.saveProgress(
      courseId,
      userId,
      moduleId,
      lessonId,
      current?.completedLessons || [],
      current?.progress || 0
    );
  }

  // Get progress for UI display
  getProgressSync(courseId: string, userId: string): ProgressData | null {
    const cacheKey = this.getCacheKey(courseId, userId);
    return this.progressCache.get(cacheKey) || this.loadFromLocalStorage(courseId, userId);
  }

  // Automatic progress recovery with backup restoration
  async recoverProgress(courseId: string, userId: string): Promise<ProgressData | null> {
    console.log('🔄 Attempting progress recovery...');
    
    try {
      // Try multiple recovery sources in order of preference
      const recoverySources = [
        () => this.loadFromLocalStorage(courseId, userId),
        () => this.getRemoteProgress(courseId, userId),
        () => this.loadFromBackup(courseId, userId)
      ];

      for (const source of recoverySources) {
        try {
          const recovered = await source();
          if (recovered && this.isValidProgressData(recovered)) {
            console.log('✅ Progress recovered successfully');
            
            // Update cache and storage
            const cacheKey = this.getCacheKey(courseId, userId);
            this.progressCache.set(cacheKey, recovered);
            this.saveToLocalStorage(recovered);
            
            // Emit recovery event
            window.dispatchEvent(new CustomEvent('progressRecovered', {
              detail: { progressData: recovered }
            }));
            
            return recovered;
          }
        } catch (error) {
          console.warn('Recovery source failed, trying next...', error);
        }
      }

      console.warn('❌ All recovery sources failed');
      return null;
    } catch (error) {
      console.error('❌ Progress recovery failed:', error);
      return null;
    }
  }

  // Create backup of progress data
  private createBackup(progressData: ProgressData): void {
    try {
      const backupKey = `backup_${this.getStorageKey(progressData.courseId, progressData.userId)}`;
      const backupData = {
        ...progressData,
        backupTimestamp: new Date().toISOString()
      };
      localStorage.setItem(backupKey, JSON.stringify(backupData));
    } catch (error) {
      console.warn('Failed to create progress backup:', error);
    }
  }

  // Load progress from backup
  private loadFromBackup(courseId: string, userId: string): ProgressData | null {
    try {
      const backupKey = `backup_${this.getStorageKey(courseId, userId)}`;
      const backup = localStorage.getItem(backupKey);
      
      if (backup) {
        const backupData = JSON.parse(backup);
        // Remove backup timestamp before returning
        const { backupTimestamp, ...progressData } = backupData;
        return progressData;
      }
    } catch (error) {
      console.warn('Failed to load from backup:', error);
    }
    
    return null;
  }

  // Validate progress data integrity
  private isValidProgressData(data: any): data is ProgressData {
    return data &&
           typeof data.courseId === 'string' &&
           typeof data.userId === 'string' &&
           typeof data.currentModule === 'number' &&
           typeof data.currentLesson === 'number' &&
           Array.isArray(data.completedLessons) &&
           typeof data.progress === 'number' &&
           typeof data.lastUpdated === 'string';
  }

  // Enhanced save with automatic backup
  async saveProgressWithBackup(
    courseId: string,
    userId: string,
    currentModule: number,
    currentLesson: number,
    completedLessons: number[],
    progress: number
  ): Promise<boolean> {
    const progressData: ProgressData = {
      courseId,
      userId,
      currentModule,
      currentLesson,
      completedLessons,
      progress,
      lastUpdated: new Date().toISOString(),
      sessionId: this.sessionId,
      version: this.getNextVersion(courseId, userId)
    };

    // Create backup before saving
    this.createBackup(progressData);

    return this.saveProgress(courseId, userId, currentModule, currentLesson, completedLessons, progress);
  }

  // Clear all progress data (for testing/reset)
  async clearProgress(courseId: string, userId: string): Promise<void> {
    const cacheKey = this.getCacheKey(courseId, userId);
    const storageKey = this.getStorageKey(courseId, userId);
    const backupKey = `backup_${storageKey}`;
    
    this.progressCache.delete(cacheKey);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(backupKey);
    this.saveQueue.delete(cacheKey);

    if (this.isOnline) {
      try {
        await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', userId)
          .eq('course_id', courseId);
      } catch (error) {
        console.error('Error clearing remote progress:', error);
      }
    }
  }
}

export const progressManager = EnhancedProgressManager.getInstance();
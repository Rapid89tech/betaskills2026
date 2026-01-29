interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  role: string;
  approval_status: string;
  created_at: string;
}

interface Enrollment {
  id: string;
  user_email: string;
  course_id: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  user_id: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class AdminDataCache {
  private cache = new Map<string, CacheEntry<any>>();
  private cacheDuration: number;

  constructor(cacheDurationMs: number = 5 * 60 * 1000) { // Default 5 minutes
    this.cacheDuration = cacheDurationMs;
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.expiresAt;
  }

  private setCache<T>(key: string, data: T): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.cacheDuration
    });
  }

  private getCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  // User cache methods
  setUsers(users: User[]): void {
    this.setCache('users', users);
    
    // Also cache individual users for quick lookup
    users.forEach(user => {
      this.setCache(`user:${user.id}`, user);
      this.setCache(`user:email:${user.email}`, user);
    });
  }

  getUsers(): User[] | null {
    return this.getCache<User[]>('users');
  }

  getUser(id: string): User | null {
    return this.getCache<User>(`user:${id}`);
  }

  getUserByEmail(email: string): User | null {
    return this.getCache<User>(`user:email:${email}`);
  }

  // Enrollment cache methods
  setEnrollments(enrollments: Enrollment[]): void {
    this.setCache('enrollments', enrollments);
    
    // Cache enrollments by status for quick filtering
    const byStatus = enrollments.reduce((acc, enrollment) => {
      if (!acc[enrollment.status]) {
        acc[enrollment.status] = [];
      }
      acc[enrollment.status].push(enrollment);
      return acc;
    }, {} as Record<string, Enrollment[]>);

    Object.entries(byStatus).forEach(([status, statusEnrollments]) => {
      this.setCache(`enrollments:status:${status}`, statusEnrollments);
    });

    // Cache individual enrollments
    enrollments.forEach(enrollment => {
      this.setCache(`enrollment:${enrollment.id}`, enrollment);
    });
  }

  getEnrollments(): Enrollment[] | null {
    return this.getCache<Enrollment[]>('enrollments');
  }

  getEnrollmentsByStatus(status: string): Enrollment[] | null {
    return this.getCache<Enrollment[]>(`enrollments:status:${status}`);
  }

  getEnrollment(id: string): Enrollment | null {
    return this.getCache<Enrollment>(`enrollment:${id}`);
  }

  // Update individual enrollment in cache
  updateEnrollment(enrollment: Enrollment): void {
    this.setCache(`enrollment:${enrollment.id}`, enrollment);
    
    // Update the main enrollments cache if it exists
    const allEnrollments = this.getEnrollments();
    if (allEnrollments) {
      const updatedEnrollments = allEnrollments.map(e => 
        e.id === enrollment.id ? enrollment : e
      );
      this.setEnrollments(updatedEnrollments);
    }
  }

  // Search cache methods
  setSearchResults(query: string, results: Enrollment[]): void {
    const searchKey = `search:${query.toLowerCase()}`;
    this.setCache(searchKey, results);
  }

  getSearchResults(query: string): Enrollment[] | null {
    const searchKey = `search:${query.toLowerCase()}`;
    return this.getCache<Enrollment[]>(searchKey);
  }

  // Statistics cache
  setStats(stats: any): void {
    this.setCache('stats', stats);
  }

  getStats(): any | null {
    return this.getCache('stats');
  }

  // Cache management
  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Preload related data for better performance
  preloadUserEnrollments(userId: string): Enrollment[] | null {
    const allEnrollments = this.getEnrollments();
    if (!allEnrollments) return null;

    const userEnrollments = allEnrollments.filter(e => 
      e.user_id === userId || e.user_email === this.getUser(userId)?.email
    );
    
    this.setCache(`user:${userId}:enrollments`, userEnrollments);
    return userEnrollments;
  }

  getUserEnrollments(userId: string): Enrollment[] | null {
    return this.getCache<Enrollment[]>(`user:${userId}:enrollments`);
  }

  // Batch operations for better performance
  batchUpdateEnrollments(enrollments: Enrollment[]): void {
    enrollments.forEach(enrollment => {
      this.setCache(`enrollment:${enrollment.id}`, enrollment);
    });

    // Update main cache
    const allEnrollments = this.getEnrollments();
    if (allEnrollments) {
      const enrollmentMap = new Map(enrollments.map(e => [e.id, e]));
      const updatedEnrollments = allEnrollments.map(e => 
        enrollmentMap.get(e.id) || e
      );
      this.setEnrollments(updatedEnrollments);
    }
  }

  // Performance monitoring
  getCacheHitRate(): { hits: number; misses: number; rate: number } {
    // This would need to be implemented with counters in a real scenario
    // For now, return mock data
    return { hits: 0, misses: 0, rate: 0 };
  }
}
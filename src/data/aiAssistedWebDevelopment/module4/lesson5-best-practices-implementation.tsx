import type { Lesson } from '@/types/course';

export const lesson5BestPracticesImplementation: Lesson = {
  id: 5,
  title: 'Best Practices Implementation',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Best Practices Implementation</h1>

<div class="intro-section">
<p class="lead-text">Learn how to use AI tools to implement industry best practices in web development, ensuring code quality, maintainability, and scalability.</p>
</div>

<h2>Why Best Practices Matter</h2>

<div class="best-practices-importance-section">
<div class="importance-item">
<h3>🔧 Code Quality</h3>
<p>Following best practices results in cleaner, more readable, and maintainable code.</p>
</div>

<div class="importance-item">
<h3>👥 Team Collaboration</h3>
<p>Consistent coding standards make it easier for teams to work together effectively.</p>
</div>

<div class="importance-item">
<h3>🚀 Performance</h3>
<p>Best practices often lead to better performance and user experience.</p>
</div>

<div class="importance-item">
<h3>🐛 Reduced Bugs</h3>
<p>Following established patterns helps prevent common programming errors.</p>
</div>

<div class="importance-item">
<h3>📈 Scalability</h3>
<p>Well-structured code is easier to scale and extend as projects grow.</p>
</div>
</div>

<h2>Common Best Practices Categories</h2>

<div class="best-practices-categories-section">
<div class="category">
<h3>📝 Code Style</h3>
<p>Consistent formatting, naming conventions, and code organization.</p>
</div>

<div class="category">
<h3>🏗️ Architecture</h3>
<p>Proper project structure, separation of concerns, and design patterns.</p>
</div>

<div class="category">
<h3>🔒 Security</h3>
<p>Input validation, authentication, authorization, and data protection.</p>
</div>

<div class="category">
<h3>⚡ Performance</h3>
<p>Optimization techniques, caching strategies, and resource management.</p>
</div>

<div class="category">
<h3>🧪 Testing</h3>
<p>Unit testing, integration testing, and test-driven development.</p>
</div>
</div>

<h2>AI Tools for Best Practices</h2>

<div class="ai-best-practices-tools-section">
<div class="tool">
<h3>🔍 ESLint</h3>
<p>JavaScript linting utility that identifies and fixes code quality issues.</p>
</div>

<div class="tool">
<h3>🎨 Prettier</h3>
<p>Code formatter that enforces consistent code style across projects.</p>
</div>

<div class="tool">
<h3>📊 SonarQube</h3>
<p>Code quality and security analysis platform with AI-powered insights.</p>
</div>

<div class="tool">
<h3>🤖 AI Code Assistants</h3>
<p>GitHub Copilot, Cursor, and Claude can suggest best practice implementations.</p>
</div>
</div>

<h2>AI-Assisted Best Practices Implementation</h2>

<div class="ai-best-practices-techniques-section">
<div class="technique">
<h3>🔍 Code Analysis</h3>
<p>AI can analyze code and suggest best practice improvements.</p>
<pre><code>// Ask AI: "Review this code for best practices"

function getUserData(id) {
  const user = fetch('/api/users/' + id).then(res => res.json());
  return user;
}

// AI Response: "Consider:
// - Use template literals for string interpolation
// - Add error handling
// - Use async/await for better readability
// - Add input validation"

async function getUserData(id) {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid user ID');
  }
  
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}</code></pre>
</div>

<div class="technique">
<h3>📝 Code Style Enforcement</h3>
<p>AI can suggest consistent code formatting and style improvements.</p>
<pre><code>// AI can suggest:
// - Consistent indentation
// - Proper spacing and line breaks
// - Meaningful variable and function names
// - Consistent naming conventions (camelCase, PascalCase)
// - Proper comment formatting</code></pre>
</div>

<div class="technique">
<h3>🏗️ Architecture Patterns</h3>
<p>AI can suggest architectural improvements and design patterns.</p>
<pre><code>// AI can suggest:
// - Separation of concerns
// - Single responsibility principle
// - Dependency injection
// - Factory patterns
// - Observer patterns
// - Repository patterns</code></pre>
</div>

<div class="technique">
<h3>🧪 Testing Best Practices</h3>
<p>AI can suggest testing strategies and test implementations.</p>
<pre><code>// AI can suggest:
// - Unit test structure
// - Test naming conventions
// - Mock and stub implementations
// - Test coverage requirements
// - Integration test patterns</code></pre>
</div>
</div>

<h2>Practical Best Practices Examples</h2>

<div class="best-practices-examples-section">
<div class="example">
<h3>🔧 Error Handling Best Practices</h3>
<pre><code>// Ask AI: "Improve error handling in this function"

const processUserData = (userData) => {
  const processedData = userData.map(user => {
    return {
      name: user.firstName + ' ' + user.lastName,
      email: user.email.toLowerCase(),
      age: new Date().getFullYear() - user.birthYear
    };
  });
  return processedData;
};

// AI Response: "Add proper error handling and validation."

const processUserData = (userData) => {
  if (!Array.isArray(userData)) {
    throw new Error('userData must be an array');
  }
  
  if (userData.length === 0) {
    return [];
  }
  
  try {
    const processedData = userData.map((user, index) => {
      if (!user || typeof user !== 'object') {
        throw new Error(\`Invalid user data at index \${index}\`);
      }
      
      if (!user.firstName || !user.lastName) {
        throw new Error(\`Missing name data for user at index \${index}\`);
      }
      
      if (!user.email) {
        throw new Error(\`Missing email for user at index \${index}\`);
      }
      
      if (!user.birthYear || isNaN(user.birthYear)) {
        throw new Error(\`Invalid birth year for user at index \${index}\`);
      }
      
      const currentYear = new Date().getFullYear();
      const age = currentYear - user.birthYear;
      
      if (age < 0 || age > 150) {
        throw new Error(\`Invalid age calculated for user at index \${index}\`);
      }
      
      return {
        name: \`\${user.firstName} \${user.lastName}\`,
        email: user.email.toLowerCase(),
        age: age
      };
    });
    
    return processedData;
  } catch (error) {
    console.error('Error processing user data:', error);
    throw error;
  }
};</code></pre>
</div>

<div class="example">
<h3>🏗️ Component Architecture Best Practices</h3>
<pre><code>// Ask AI: "Improve this React component architecture"

const UserDashboard = ({ user, posts, followers, following }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleUpdateProfile = async (data) => {
    setLoading(true);
    try {
      await updateUser(user.id, data);
      // Update local state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div className="stats">
        <p>Posts: {posts.length}</p>
        <p>Followers: {followers}</p>
        <p>Following: {following}</p>
      </div>
      <button onClick={() => handleUpdateProfile({})}>Update Profile</button>
    </div>
  );
};

// AI Response: "Separate concerns, use custom hooks, and improve component structure."

// Custom hook for user management
const useUserManagement = (userId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      await updateUser(userId, data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, updateProfile };
};

// Separate components for different concerns
const UserInfo = ({ user }) => (
  <div className="user-info">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
  </div>
);

const UserStats = ({ posts, followers, following }) => (
  <div className="stats">
    <p>Posts: {posts.length}</p>
    <p>Followers: {followers}</p>
    <p>Following: {following}</p>
  </div>
);

const UserDashboard = ({ user, posts, followers, following }) => {
  const { loading, error, updateProfile } = useUserManagement(user.id);
  
  const handleUpdateProfile = async () => {
    const success = await updateProfile({});
    if (success) {
      // Handle success (e.g., show notification, refresh data)
    }
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo user={user} />
      <UserStats posts={posts} followers={followers} following={following} />
      <button 
        onClick={handleUpdateProfile}
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};</code></pre>
</div>

<div class="example">
<h3>🧪 Testing Best Practices</h3>
<pre><code>// Ask AI: "Create tests for this function following best practices"

const calculateTotal = (items, taxRate, discount) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalWithTax = subtotal * (1 + taxRate);
  return discount > 0 ? totalWithTax * (1 - discount) : totalWithTax;
};

// AI Response: "Create comprehensive tests with proper structure and edge cases."

import { describe, it, expect } from 'jest';

describe('calculateTotal', () => {
  const mockItems = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 1 }
  ];
  
  it('should calculate total without tax or discount', () => {
    const result = calculateTotal(mockItems, 0, 0);
    expect(result).toBe(25); // (10 * 2) + (5 * 1) = 25
  });
  
  it('should calculate total with tax only', () => {
    const result = calculateTotal(mockItems, 0.1, 0); // 10% tax
    expect(result).toBe(27.5); // 25 * 1.1 = 27.5
  });
  
  it('should calculate total with discount only', () => {
    const result = calculateTotal(mockItems, 0, 0.2); // 20% discount
    expect(result).toBe(20); // 25 * 0.8 = 20
  });
  
  it('should calculate total with both tax and discount', () => {
    const result = calculateTotal(mockItems, 0.1, 0.2); // 10% tax, 20% discount
    expect(result).toBe(22); // (25 * 1.1) * 0.8 = 22
  });
  
  it('should handle empty items array', () => {
    const result = calculateTotal([], 0.1, 0.2);
    expect(result).toBe(0);
  });
  
  it('should handle zero tax rate', () => {
    const result = calculateTotal(mockItems, 0, 0.1);
    expect(result).toBe(22.5); // 25 * 0.9 = 22.5
  });
  
  it('should handle zero discount', () => {
    const result = calculateTotal(mockItems, 0.1, 0);
    expect(result).toBe(27.5); // 25 * 1.1 = 27.5
  });
  
  it('should handle negative discount (no discount applied)', () => {
    const result = calculateTotal(mockItems, 0.1, -0.1);
    expect(result).toBe(27.5); // 25 * 1.1 = 27.5 (no discount applied)
  });
});</code></pre>
</div>
</div>

<h2>Code Quality Best Practices</h2>

<div class="code-quality-section">
<div class="quality-practice">
<h3>📝 Naming Conventions</h3>
<pre><code>// AI can suggest:
// - Use descriptive names for variables and functions
// - Follow consistent naming conventions
// - Avoid abbreviations and acronyms
// - Use verbs for functions, nouns for variables

// Good examples:
const getUserById = (id) => { /* ... */ };
const isUserAuthenticated = (user) => { /* ... */ };
const userProfileData = { /* ... */ };

// Avoid:
const getU = (i) => { /* ... */ };
const isAuth = (u) => { /* ... */ };
const upd = { /* ... */ };</code></pre>
</div>

<div class="quality-practice">
<h3>🔧 Function Design</h3>
<pre><code>// AI can suggest:
// - Keep functions small and focused
// - Use single responsibility principle
// - Limit function parameters
// - Return early to reduce nesting
// - Use default parameters

// Good example:
const createUser = (userData, options = {}) => {
  if (!userData || !userData.email) {
    throw new Error('Email is required');
  }
  
  const defaultOptions = {
    sendWelcomeEmail: true,
    requireVerification: true,
    ...options
  };
  
  return {
    id: generateId(),
    email: userData.email,
    name: userData.name || '',
    createdAt: new Date(),
    ...defaultOptions
  };
};</code></pre>
</div>

<div class="quality-practice">
<h3>📁 File Organization</h3>
<pre><code>// AI can suggest:
// - Organize files by feature or type
// - Use consistent file naming
// - Keep related files together
// - Separate concerns appropriately

// Example structure:
src/
  components/
    User/
      UserProfile.tsx
      UserList.tsx
      UserCard.tsx
      index.ts
  hooks/
    useUser.ts
    useAuth.ts
  services/
    api.ts
    auth.ts
  utils/
    validation.ts
    formatting.ts</code></pre>
</div>
</div>

<h2>Performance Best Practices</h2>

<div class="performance-best-practices-section">
<div class="performance-practice">
<h3>🚀 React Performance</h3>
<pre><code>// AI can suggest:
// - Use React.memo for expensive components
// - Implement useMemo and useCallback
// - Avoid inline object and function creation
// - Use proper key props in lists
// - Implement code splitting

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);
  
  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);
  
  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} item={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});</code></pre>
</div>

<div class="performance-practice">
<h3>🌐 Network Optimization</h3>
<pre><code>// AI can suggest:
// - Implement proper caching strategies
// - Use CDNs for static assets
// - Optimize API calls
// - Implement request batching
// - Use service workers for offline support

// Example caching implementation:
const cache = new Map();

const fetchWithCache = async (url, options = {}) => {
  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
  
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    const isExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutes
    
    if (!isExpired) {
      return data;
    }
  }
  
  const response = await fetch(url, options);
  const data = await response.json();
  
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
};</code></pre>
</div>
</div>

<h2>Security Best Practices</h2>

<div class="security-best-practices-section">
<div class="security-practice">
<h3>🛡️ Input Validation</h3>
<pre><code>// AI can suggest:
// - Validate all user inputs
// - Sanitize data before processing
// - Use parameterized queries
// - Implement rate limiting
// - Use HTTPS for all communications

const validateUserInput = (userData) => {
  const errors = [];
  
  if (!userData.email || !isValidEmail(userData.email)) {
    errors.push('Valid email is required');
  }
  
  if (!userData.password || userData.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (userData.age && (userData.age < 0 || userData.age > 150)) {
    errors.push('Invalid age');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};</code></pre>
</div>

<div class="security-practice">
<h3>🔐 Authentication</h3>
<pre><code>// AI can suggest:
// - Use secure password hashing
// - Implement proper session management
// - Use JWT tokens with expiration
// - Add two-factor authentication
// - Implement account lockout policies

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};</code></pre>
</div>
</div>

<h2>Best Practices Checklist</h2>

<div class="best-practices-checklist-section">
<div class="checklist-item">
<h3>✅ Code Quality</h3>
<ul>
<li>Consistent naming conventions</li>
<li>Proper error handling</li>
<li>Code documentation</li>
<li>Regular code reviews</li>
</ul>
</div>

<div class="checklist-item">
<h3>🏗️ Architecture</h3>
<ul>
<li>Separation of concerns</li>
<li>Single responsibility principle</li>
<li>Proper file organization</li>
<li>Design patterns implementation</li>
</ul>
</div>

<div class="checklist-item">
<h3>🔒 Security</h3>
<ul>
<li>Input validation and sanitization</li>
<li>Secure authentication</li>
<li>HTTPS implementation</li>
<li>Regular security audits</li>
</ul>
</div>

<div class="checklist-item">
<h3>⚡ Performance</h3>
<ul>
<li>Code optimization</li>
<li>Caching strategies</li>
<li>Bundle size optimization</li>
<li>Performance monitoring</li>
</ul>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools can significantly accelerate the implementation of best practices by identifying opportunities and suggesting improvements. However, understanding the reasoning behind best practices is crucial for making informed decisions and adapting them to your specific project needs.
</div>

</div>`
  }
};

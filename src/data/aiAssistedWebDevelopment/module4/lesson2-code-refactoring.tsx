import type { Lesson } from '@/types/course';

export const lesson2CodeRefactoring: Lesson = {
  id: 2,
  title: 'Code Refactoring',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/_GTMOmRrqkU',
    textContent: `<div class="lesson-content">

<h1>Code Refactoring</h1>

<div class="intro-section">
<p class="lead-text">Learn how to use AI tools to refactor code for better maintainability, readability, and structure while preserving functionality.</p>
</div>

<h2>What is Code Refactoring?</h2>

<div class="refactoring-overview">
<p>Code refactoring is the process of restructuring existing code without changing its external behavior. The goal is to improve code quality, readability, maintainability, and reduce technical debt.</p>
</div>

<h2>Why Refactor Code?</h2>

<div class="refactoring-benefits-section">
<div class="benefit">
<h3>📖 Improved Readability</h3>
<p>Cleaner, more readable code is easier to understand and maintain.</p>
</div>

<div class="benefit">
<h3>🔧 Better Maintainability</h3>
<p>Well-structured code is easier to modify and extend.</p>
</div>

<div class="benefit">
<h3>🐛 Reduced Bugs</h3>
<p>Cleaner code often has fewer bugs and is easier to debug.</p>
</div>

<div class="benefit">
<h3>🚀 Enhanced Performance</h3>
<p>Refactoring can lead to performance improvements through better algorithms and data structures.</p>
</div>

<div class="benefit">
<h3>👥 Team Collaboration</h3>
<p>Clean code is easier for team members to work with and understand.</p>
</div>
</div>

<h2>Common Refactoring Patterns</h2>

<div class="refactoring-patterns-section">
<div class="pattern">
<h3>🔄 Extract Method</h3>
<p>Break down large functions into smaller, more focused functions.</p>
<pre><code>// Before
function processUserData(user) {
  // 50 lines of complex logic
  const name = user.firstName + ' ' + user.lastName;
  const email = user.email.toLowerCase();
  const age = calculateAge(user.birthDate);
  // ... more logic
}

// After (AI can suggest this)
function processUserData(user) {
  const formattedName = formatUserName(user);
  const normalizedEmail = normalizeEmail(user.email);
  const userAge = calculateAge(user.birthDate);
  return { name: formattedName, email: normalizedEmail, age: userAge };
}

function formatUserName(user) {
  return user.firstName + ' ' + user.lastName;
}

function normalizeEmail(email) {
  return email.toLowerCase();
}</code></pre>
</div>

<div class="pattern">
<h3>🏗️ Extract Class</h3>
<p>Move related functionality into separate classes.</p>
<pre><code>// Before
class UserManager {
  // User management methods
  // Email validation methods
  // File handling methods
  // Database operations
}

// After (AI can suggest this)
class UserManager {
  constructor() {
    this.validator = new EmailValidator();
    this.fileHandler = new FileHandler();
    this.database = new DatabaseService();
  }
}

class EmailValidator {
  validateEmail(email) { /* ... */ }
}

class FileHandler {
  saveFile(file) { /* ... */ }
}</code></pre>
</div>

<div class="pattern">
<h3>🎯 Rename Variables and Functions</h3>
<p>Use descriptive names that clearly indicate purpose and functionality.</p>
<pre><code>// Before
const d = new Date();
const u = getUserData();
const p = processData(u);

// After (AI can suggest this)
const currentDate = new Date();
const userData = getUserData();
const processedData = processData(userData);</code></pre>
</div>

<div class="pattern">
<h3>🔧 Simplify Conditionals</h3>
<p>Make complex conditional logic more readable and maintainable.</p>
<pre><code>// Before
if (user.age >= 18 && user.hasValidLicense && user.insuranceStatus === 'active') {
  // allow driving
}

// After (AI can suggest this)
const canDrive = user.age >= 18 && user.hasValidLicense && user.insuranceStatus === 'active';
if (canDrive) {
  // allow driving
}</code></pre>
</div>
</div>

<h2>AI-Assisted Refactoring Techniques</h2>

<div class="ai-refactoring-techniques-section">
<div class="technique">
<h3>🤖 Code Analysis</h3>
<p>AI can analyze code and identify areas that need refactoring.</p>
<pre><code>// Ask AI: "Analyze this code for refactoring opportunities"

const UserComponent = ({ user, onUpdate, onDelete, showDetails, isAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateUser(user.id, user);
      onUpdate(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user.id);
      onDelete(user.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // ... rest of component
};

// AI Response: "Consider extracting the async operations into custom hooks
// and creating separate components for different user actions."</code></pre>
</div>

<div class="technique">
<h3>🔍 Identifying Code Smells</h3>
<p>AI can identify common code smells and suggest improvements.</p>
<pre><code>// Code smells AI can identify:
// - Long functions (too many lines)
// - Large classes (too many methods)
// - Duplicate code
// - Complex conditionals
// - Magic numbers
// - Inconsistent naming</code></pre>
</div>

<div class="technique">
<h3>📝 Generating Refactored Code</h3>
<p>AI can generate refactored versions of your code.</p>
<pre><code>// Ask AI: "Refactor this function to be more readable"

function calculateTotal(items, taxRate, discount) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  total = total * (1 + taxRate);
  if (discount > 0) {
    total = total * (1 - discount);
  }
  return total;
}

// AI Response:
function calculateTotal(items, taxRate, discount) {
  const subtotal = calculateSubtotal(items);
  const totalWithTax = applyTax(subtotal, taxRate);
  return applyDiscount(totalWithTax, discount);
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function applyTax(amount, taxRate) {
  return amount * (1 + taxRate);
}

function applyDiscount(amount, discount) {
  return discount > 0 ? amount * (1 - discount) : amount;
}</code></pre>
</div>
</div>

<h2>React-Specific Refactoring</h2>

<div class="react-refactoring-section">
<div class="react-pattern">
<h3>🎣 Custom Hooks</h3>
<p>Extract reusable logic into custom hooks.</p>
<pre><code>// Before
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  
  // ... rest of component
};

// After (AI can suggest this)
const UserList = () => {
  const { users, loading, error } = useUsers();
  
  // ... rest of component
};

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  
  return { users, loading, error };
};</code></pre>
</div>

<div class="react-pattern">
<h3>🧩 Component Composition</h3>
<p>Break down large components into smaller, focused components.</p>
<pre><code>// Before
const UserDashboard = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Member since: {user.joinDate}</p>
      </div>
      <div className="stats">
        <h3>Statistics</h3>
        <p>Posts: {user.posts.length}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {user.recentActivity.map(activity => (
          <div key={activity.id}>
            <p>{activity.description}</p>
            <small>{activity.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

// After (AI can suggest this)
const UserDashboard = ({ user }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserInfo user={user} />
      <UserStats user={user} />
      <RecentActivity activities={user.recentActivity} />
    </div>
  );
};

const UserInfo = ({ user }) => (
  <div className="user-info">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
    <p>Member since: {user.joinDate}</p>
  </div>
);

const UserStats = ({ user }) => (
  <div className="stats">
    <h3>Statistics</h3>
    <p>Posts: {user.posts.length}</p>
    <p>Followers: {user.followers}</p>
    <p>Following: {user.following}</p>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="recent-activity">
    <h3>Recent Activity</h3>
    {activities.map(activity => (
      <ActivityItem key={activity.id} activity={activity} />
    ))}
  </div>
);</code></pre>
</div>
</div>

<h2>Best Practices for AI-Assisted Refactoring</h2>

<div class="best-practices-section">
<div class="practice-item">
<h3>✅ Test Before and After</h3>
<p>Always ensure your tests pass before and after refactoring to maintain functionality.</p>
</div>

<div class="practice-item">
<h3>🔍 Understand the Changes</h3>
<p>Don't blindly apply AI suggestions - understand what the refactoring accomplishes.</p>
</div>

<div class="practice-item">
<h3>📝 Refactor Incrementally</h3>
<p>Make small, incremental changes rather than large refactoring sessions.</p>
</div>

<div class="practice-item">
<h3>🎯 Focus on One Issue</h3>
<p>Address one specific issue at a time rather than trying to fix everything at once.</p>
</div>

<div class="practice-item">
<h3>📚 Document Changes</h3>
<p>Document significant refactoring changes for team understanding.</p>
</div>
</div>

<h2>Common Refactoring Tools</h2>

<div class="refactoring-tools-section">
<div class="tool">
<h3>🤖 AI Code Assistants</h3>
<p>GitHub Copilot, Cursor, and Claude can suggest refactoring improvements.</p>
</div>

<div class="tool">
<h3>🔍 ESLint</h3>
<p>Can identify code quality issues and suggest improvements.</p>
</div>

<div class="tool">
<h3>🎨 Prettier</h3>
<p>Automatically formats code for consistency.</p>
</div>

<div class="tool">
<h3>📊 SonarQube</h3>
<p>Analyzes code quality and suggests refactoring opportunities.</p>
</div>
</div>

<h2>Refactoring Checklist</h2>

<div class="refactoring-checklist-section">
<div class="checklist-item">
<h3>✅ Before Refactoring</h3>
<ul>
<li>Ensure all tests pass</li>
<li>Create a backup or use version control</li>
<li>Identify specific areas to improve</li>
<li>Set clear goals for the refactoring</li>
</ul>
</div>

<div class="checklist-item">
<h3>🔄 During Refactoring</h3>
<ul>
<li>Make small, incremental changes</li>
<li>Run tests after each change</li>
<li>Keep functionality intact</li>
<li>Document significant changes</li>
</ul>
</div>

<div class="checklist-item">
<h3>✅ After Refactoring</h3>
<ul>
<li>Verify all tests still pass</li>
<li>Test the application manually</li>
<li>Review the changes with the team</li>
<li>Update documentation if needed</li>
</ul>
</div>
</div>

<div class="highlight-box">
<strong>🎯 Key Takeaway:</strong> AI tools can significantly accelerate the refactoring process by identifying opportunities and suggesting improvements. However, always understand the changes being made and ensure that functionality is preserved through proper testing.
</div>

</div>`
  }
};

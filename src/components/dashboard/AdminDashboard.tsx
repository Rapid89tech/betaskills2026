import React, { useEffect, useState } from 'react';
import { BookOpen, Users, PieChart, Calendar, MessageCircle, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const sidebarLinks = [
  { label: 'Dashboard', icon: BookOpen },
  { label: 'Users', icon: Users },
  { label: 'Reports', icon: PieChart },
  { label: 'Schedule', icon: Calendar },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Settings', icon: Settings },
];

const mockStats = [
  { label: 'Total Users', value: 1200 },
  { label: 'Active Today', value: 350 },
  { label: 'Courses', value: 18 },
  { label: 'Revenue', value: '$12,500' },
];

const mockUsers = [
  { name: 'Francis Tran', role: 'Student', status: 'Active' },
  { name: 'Elliana Palacios', role: 'Instructor', status: 'Active' },
  { name: 'Katherine Webster', role: 'Student', status: 'Inactive' },
  { name: 'Avalon Carey', role: 'Admin', status: 'Active' },
];

const mockActivity = [
  { action: 'User Signup', detail: 'Samuel Sam (Student)', time: '2 min ago' },
  { action: 'Course Created', detail: 'AI and Human Relations', time: '10 min ago' },
  { action: 'User Promoted', detail: 'Elliana Palacios (Instructor)', time: '1 hr ago' },
];

function PendingEnrollmentApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      
      // Get enrollments from localStorage (always works)
      const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
      const pendingEnrollments = allEnrollments.filter(e => e.status === 'pending');
      
      const items = pendingEnrollments.map(enrollment => ({
        id: enrollment.id,
        studentName: enrollment.user_email,
        courseTitle: enrollment.course_title,
        enrolledAt: new Date(enrollment.enrolled_at),
        proofOfPayment: enrollment.proof_of_payment,
        paymentRef: enrollment.payment_ref,
      }));
      
      setPending(items);
      setLoading(false);
    };
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    // Update in localStorage
    const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const updatedEnrollments = allEnrollments.map(e => 
      e.id === id 
        ? { ...e, status: 'approved', approved_at: new Date().toISOString() }
        : e
    );
    
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    
    setPending(pending.filter(p => p.id !== id));
    alert('Enrollment approved successfully!');
  };

  const handleReject = async (id) => {
    // Update in localStorage
    const allEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const updatedEnrollments = allEnrollments.map(e => 
      e.id === id 
        ? { ...e, status: 'rejected' }
        : e
    );
    
    localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    
    setPending(pending.filter(p => p.id !== id));
    alert('Enrollment rejected.');
  };

  return (
    <div className="bg-red-100 rounded-xl p-6 mb-8 shadow animate-fade-in-up">
      <h2 className="text-xl font-bold text-red-700 mb-4">Pending Enrollment Approvals {pending.length > 0 && <span className="ml-2 bg-red-600 text-white rounded-full px-2 text-sm">{pending.length}</span>}</h2>
      {loading ? <div>Loading...</div> : pending.length === 0 ? <div>No pending enrollments.</div> : (
        <div className="space-y-4">
          {pending.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
              <div className="flex-1">
                <div className="font-semibold">{item.studentName}</div>
                <div className="text-sm text-gray-500">{item.courseTitle} · {item.enrolledAt.toLocaleString()}</div>
                {item.paymentRef && (
                  <div className="text-xs text-blue-600">Ref: {item.paymentRef}</div>
                )}
              </div>
              <div className="flex gap-2">
                {item.proofOfPayment && item.proofOfPayment !== 'instant_enrollment' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-blue-600 text-blue-600" 
                    onClick={() => window.open(item.proofOfPayment, '_blank')}
                  >
                    View Proof
                  </Button>
                )}
                <Button className="bg-gradient-to-r from-red-600 to-red-800 text-white" onClick={() => handleApprove(item.id)}>Approve</Button>
                <Button variant="outline" className="border-red-600 text-red-600" onClick={() => handleReject(item.id)}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const AdminDashboardComponent = ({ profile }: any) => (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4 animate-slide-in-left">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">A</div>
        <span className="font-extrabold text-lg tracking-wide text-red-600">Beta Skill</span>
      </div>
      <nav className="flex-1 space-y-2">
        {sidebarLinks.map(link => (
          <div key={link.label} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-all">
            <link.icon className="h-5 w-5 text-purple-400" />
            <span className="font-medium text-gray-700">{link.label}</span>
          </div>
        ))}
      </nav>
      <div className="mt-10 text-xs text-gray-400">Settings</div>
    </aside>
    {/* Main Content */}
    <main className="flex-1 p-8 animate-fade-in">
      {/* Pending Enrollment Approvals Widget */}
      <PendingEnrollmentApprovals />
      {/* Welcome Card */}
      <div className="relative bg-gradient-to-r from-red-500 to-purple-500 rounded-2xl p-8 mb-8 overflow-hidden shadow-lg animate-fade-in-up">
        <div className="relative z-10">
          <h2 className="text-white text-2xl font-bold mb-2">Welcome, {profile?.first_name || 'Admin'}!</h2>
          <p className="text-white mb-4">Here are the latest platform stats and activity.</p>
          <Button className="bg-white text-red-600 font-bold hover:bg-purple-100 transition">View Reports</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Platform Stats */}
        <div className="col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Platform Stats</h3>
            <div className="space-y-4">
              {mockStats.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="font-semibold text-gray-800">{stat.label}</div>
                  <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* User Management */}
        <div className="col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">User Management</h3>
            <div className="space-y-4">
              {mockUsers.map((user, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">{user.name[0]}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <span className={`text-xs font-bold ${user.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>{user.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Recent Activity</h3>
            <div className="space-y-4">
              {mockActivity.map((act, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-red-100 text-red-600">{act.action[0]}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{act.action}</div>
                    <div className="text-xs text-gray-500">{act.detail}</div>
                  </div>
                  <span className="text-xs text-gray-400">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AdminDashboardComponent; 
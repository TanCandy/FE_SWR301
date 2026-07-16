import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  CheckCircle2,
  Upload,
  Calendar,
  ArrowRight,
  Clock,
  Users,
  Megaphone,
  TrendingUp,
  Trophy,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Current Tasks',
      value: '7',
      subtitle: '2 overdue',
      icon: <CheckSquare className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Tasks assigned to you',
      status: { label: '2 Overdue', variant: 'danger' as const },
      href: '/dashboard/tasks',
    },
    {
      title: 'Completed Tasks',
      value: '15',
      subtitle: '83% completion rate',
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Total tasks you have completed',
      status: { label: 'On Track', variant: 'success' as const },
      progress: 83,
      progressColor: 'green' as const,
      href: '/dashboard/tasks',
    },
    {
      title: 'My Deliverables',
      value: '5',
      subtitle: 'Next deadline in 3 days',
      icon: <Upload className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Personal deliverables submitted',
      status: { label: '3 Days Left', variant: 'warning' as const },
      href: '/dashboard/deliverables',
    },
    {
      title: 'Attendance',
      value: '92%',
      subtitle: 'Excellent attendance record',
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Your attendance rate',
      status: { label: 'Excellent', variant: 'success' as const },
      progress: 92,
      progressColor: 'green' as const,
      trend: { value: '+2%', up: true },
    },
  ];

  const announcements = [
    {
      title: 'Hackathon Opening Ceremony',
      content: 'Join us for the official kickoff this Friday at 10:00 AM in the Main Hall.',
      time: '2 hours ago',
      type: 'event' as const,
      pinned: true,
    },
    {
      title: 'New Mentor Session Slots',
      content: 'Dr. Sarah Chen has opened 3 new session slots for next week.',
      time: '5 hours ago',
      type: 'info' as const,
      pinned: false,
    },
    {
      title: 'Round 2 Deadline Extended',
      content: 'The Round 2 submission deadline has been extended to March 27.',
      time: '1 day ago',
      type: 'update' as const,
      pinned: false,
    },
    {
      title: 'WiFi Issues Resolved',
      content: 'The campus WiFi connectivity issues have been resolved.',
      time: '2 days ago',
      type: 'info' as const,
      pinned: false,
    },
  ];

  const upcomingEvents = [
    { title: 'Sprint Planning', date: 'Today, 4:00 PM', type: 'meeting' as const },
    { title: 'Mentor Session', date: 'Tomorrow, 9:00 AM', type: 'mentor' as const },
    { title: 'Code Review', date: 'Friday, 2:00 PM', type: 'review' as const },
    { title: 'Demo Day Prep', date: 'Saturday, 10:00 AM', type: 'event' as const },
  ];

  const teamProgress = {
    name: 'Quantum Coders',
    track: 'AI/ML',
    rank: 3,
    score: 86.5,
    overallProgress: 75,
    members: [
      { name: 'Alex Johnson', tasks: 8, completed: 6, avatar: 'AJ' },
      { name: 'Jamie Rodriguez', tasks: 7, completed: 5, avatar: 'JR' },
      { name: 'Chris Lee', tasks: 6, completed: 5, avatar: 'CL' },
      { name: 'Taylor Kim', tasks: 5, completed: 4, avatar: 'TK' },
      { name: 'Jordan Patel', tasks: 7, completed: 5, avatar: 'JP' },
    ],
  };

  const recentTasks = [
    { task: 'Implement authentication flow', priority: 'high' as const, status: 'in-progress' as const, due: 'Tomorrow' },
    { task: 'Design dashboard mockups', priority: 'medium' as const, status: 'todo' as const, due: 'Friday' },
    { task: 'Write unit tests for API', priority: 'medium' as const, status: 'todo' as const, due: 'Friday' },
    { task: 'Update user documentation', priority: 'low' as const, status: 'completed' as const, due: 'Done' },
  ];

  const getPriorityStyle = (priority: 'high' | 'medium' | 'low') => {
    const map = {
      high: { bg: 'bg-red-100', text: 'text-red-700', variant: 'red' as const },
      medium: { bg: 'bg-amber-100', text: 'text-amber-700', variant: 'amber' as const },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', variant: 'gray' as const },
    };
    return map[priority];
  };

  const getStatusStyle = (status: 'todo' | 'in-progress' | 'completed') => {
    const map = {
      'todo': { variant: 'gray' as const, label: 'To Do' },
      'in-progress': { variant: 'blue' as const, label: 'In Progress' },
      'completed': { variant: 'green' as const, label: 'Done' },
    };
    return map[status];
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Jamie'}!`}
      subtitle="Stay productive and engaged with your team today."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid: Announcements + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Announcements */}
        <DashboardWidget
          title="Recent Announcements"
          subtitle="Latest updates and news"
          action={
            <button
              onClick={() => navigate('/dashboard/announcements')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                    {ann.pinned && <Badge variant="blue">Pinned</Badge>}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-1.5">{ann.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Upcoming Events */}
        <DashboardWidget
          title="Upcoming Events"
          subtitle="Your schedule for the week"
          action={
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Calendar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>

      {/* My Team Progress + Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Team Progress */}
        <DashboardWidget
          title="My Team Progress"
          subtitle={`${teamProgress.name} · ${teamProgress.track}`}
          action={
            <button
              onClick={() => navigate('/dashboard/my-team')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View team <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          {/* Team Header */}
          <div className="flex items-center justify-between mb-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Current Rank</p>
                <p className="text-2xl font-bold text-gray-900">#{teamProgress.rank}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Overall Score</p>
              <p className="text-2xl font-bold text-blue-600">{teamProgress.score}</p>
            </div>
            <div className="flex-1 max-w-[140px] ml-4">
              <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${teamProgress.overallProgress}%` }} />
              </div>
              <p className="text-xs font-semibold text-gray-700 mt-1">{teamProgress.overallProgress}%</p>
            </div>
          </div>

          {/* Members */}
          <div className="space-y-2.5">
            {teamProgress.members.map((member, idx) => {
              const percent = Math.round((member.completed / member.tasks) * 100);
              return (
                <div key={idx} className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-xs">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.completed}/{member.tasks} tasks
                    </p>
                  </div>
                  <div className="w-24">
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-10 text-right">{percent}%</span>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Recent Tasks */}
        <DashboardWidget
          title="My Recent Tasks"
          subtitle="Your active tasks"
          action={
            <button
              onClick={() => navigate('/dashboard/tasks')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              All tasks <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {recentTasks.map((task, idx) => {
              const priority = getPriorityStyle(task.priority);
              const status = getStatusStyle(task.status);
              return (
                <div key={idx} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-900 text-sm">{task.task}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${priority.bg} ${priority.text} capitalize`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.due}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
}
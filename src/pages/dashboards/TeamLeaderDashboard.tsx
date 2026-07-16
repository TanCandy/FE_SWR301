import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Upload,
  Trophy,
  Clock,
  ArrowRight,
  Bell,
  Crown,
  TrendingUp,
  Video,
  CheckCircle2,
  FileText,
  Megaphone,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function TeamLeaderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Team Members',
      value: '5',
      subtitle: '2 new members joined this week',
      icon: <Users className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Maximum allowed members: 6',
      status: { label: 'Active', variant: 'success' as const },
      href: '/dashboard/manage-team',
    },
    {
      title: 'Mentor Sessions',
      value: '3',
      subtitle: 'Next session: Tomorrow 09:00 AM',
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Upcoming mentoring meetings',
      status: { label: 'Scheduled', variant: 'info' as const },
      href: '/dashboard/mentor-session',
    },
    {
      title: 'Deliverables',
      value: '8 / 12',
      subtitle: '66% Complete',
      icon: <Upload className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Current submission progress',
      status: { label: 'On Track', variant: 'success' as const },
      progress: 66,
      progressColor: 'green' as const,
      href: '/dashboard/deliverable',
    },
    {
      title: 'Average Evaluation Score',
      value: '8.5',
      subtitle: '+0.5 from previous round',
      icon: <Trophy className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Average score from judges',
      status: { label: 'Excellent', variant: 'success' as const },
      trend: { value: '+0.5', up: true },
      href: '/dashboard/evaluation',
    },
  ];

  const upcomingDeadlines = [
    {
      task: 'Round 2 Submission',
      due: 'Due in 2 days',
      status: 'urgent' as const,
      icon: <Upload className="w-4 h-4" />,
      time: 'Mar 25, 5:00 PM',
    },
    {
      task: 'Mentor Meeting',
      due: 'Tomorrow, 9:00 AM',
      status: 'upcoming' as const,
      icon: <Video className="w-4 h-4" />,
      time: 'Mar 21, 09:00 AM',
    },
    {
      task: 'Presentation Practice',
      due: 'Friday, 2:00 PM',
      status: 'upcoming' as const,
      icon: <FileText className="w-4 h-4" />,
      time: 'Mar 22, 02:00 PM',
    },
    {
      task: 'Documentation Review',
      due: 'In 4 days',
      status: 'normal' as const,
      icon: <FileText className="w-4 h-4" />,
      time: 'Mar 24, 11:59 PM',
    },
  ];

  const announcements = [
    {
      title: 'Hackathon Opening Ceremony',
      content: 'Join us for the official kickoff event this Friday at 10:00 AM in the Main Hall.',
      time: '2 hours ago',
      pinned: true,
      type: 'event' as const,
    },
    {
      title: 'New Evaluation Criteria',
      content: 'The judging panel has updated the evaluation criteria for Round 2. Please review the changes.',
      time: '1 day ago',
      pinned: false,
      type: 'update' as const,
    },
    {
      title: 'Mentor Schedule Updated',
      content: 'Dr. Sarah Chen has updated her availability. New session slots are now open.',
      time: '3 days ago',
      pinned: false,
      type: 'info' as const,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Team Alpha', score: 92.5, change: 'up' as const, members: 5, track: 'AI/ML' },
    { rank: 2, name: 'Code Warriors', score: 89.8, change: 'same' as const, members: 4, track: 'FinTech' },
    { rank: 3, name: 'Quantum Coders', score: 86.5, change: 'up' as const, members: 5, track: 'AI/ML', isYou: true },
    { rank: 4, name: 'Cloud Innovators', score: 84.2, change: 'down' as const, members: 4, track: 'Cloud' },
    { rank: 5, name: 'Data Dragons', score: 82.1, change: 'up' as const, members: 5, track: 'Data Science' },
  ];

  const getDeadlineStyle = (status: 'urgent' | 'upcoming' | 'normal') => {
    if (status === 'urgent') return { bg: 'bg-red-100', text: 'text-red-600', badge: 'red' as const, label: 'Urgent' };
    if (status === 'upcoming') return { bg: 'bg-blue-100', text: 'text-blue-600', badge: 'blue' as const, label: 'Upcoming' };
    return { bg: 'bg-gray-100', text: 'text-gray-600', badge: 'gray' as const, label: 'Scheduled' };
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Alex'}!`}
      subtitle="Here's an overview of your hackathon progress today."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid: Deadlines + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Upcoming Deadlines - takes 2 cols */}
        <DashboardWidget
          title="Upcoming Deadlines"
          subtitle="Stay on top of your schedule"
          action={
            <button
              onClick={() => navigate('/dashboard/deliverable')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, idx) => {
              const style = getDeadlineStyle(deadline.status);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center`}>
                    <span className={style.text}>{deadline.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{deadline.task}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{deadline.time}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={style.badge}>{style.label}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{deadline.due}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Latest Announcements */}
        <DashboardWidget
          title="Latest Announcements"
          subtitle="Recent updates from admins"
          action={
            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {ann.pinned && <Megaphone className="w-3.5 h-3.5 text-blue-600" />}
                    <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-1.5">{ann.time}</p>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>

      {/* Leaderboard Preview + Mentor Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <DashboardWidget
          title="Leaderboard Preview"
          subtitle="Top performing teams in the hackathon"
          action={
            <button
              onClick={() => navigate('/dashboard/ranking')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Full ranking <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-2">
            {leaderboard.map((team) => (
              <div
                key={team.rank}
                className={`flex items-center gap-4 p-3.5 rounded-xl transition-colors ${
                  team.isYou ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                    team.rank === 1
                      ? 'bg-amber-100 text-amber-700'
                      : team.rank === 2
                      ? 'bg-gray-200 text-gray-700'
                      : team.rank === 3
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {team.rank === 1 ? <Crown className="w-4 h-4" /> : `#${team.rank}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{team.name}</p>
                    {team.isYou && <Badge variant="blue">You</Badge>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {team.track} · {team.members} members
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">{team.score}</span>
                  {team.change === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-600" />}
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Current Mentor */}
        <DashboardWidget title="Current Mentor" subtitle="Your assigned mentor">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold text-lg">
              SC
            </div>
            <div>
              <p className="font-semibold text-gray-900">Dr. Sarah Chen</p>
              <p className="text-xs text-gray-500">AI/ML Specialist</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Next Session</span>
              <span className="font-medium text-gray-900">Tomorrow, 9:00 AM</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Sessions Completed</span>
              <span className="font-medium text-gray-900">3</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Avg. Rating</span>
              <span className="font-medium text-amber-600">4.9 / 5.0</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard/mentor-session')}
            className="w-full mt-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book a Session
          </button>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
}
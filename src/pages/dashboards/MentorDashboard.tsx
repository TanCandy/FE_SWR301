import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Video,
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function MentorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Assigned Teams',
      value: '6',
      subtitle: '2 teams need attention',
      icon: <Users className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Total teams assigned to you',
      status: { label: 'Active', variant: 'success' as const },
      href: '/dashboard/assigned-teams',
    },
    {
      title: "Today's Sessions",
      value: '4',
      subtitle: 'First meeting: 09:00 AM',
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Sessions scheduled for today',
      status: { label: 'On Schedule', variant: 'info' as const },
      href: '/dashboard/mentor-sessions',
    },
    {
      title: 'Feedback Submitted',
      value: '18',
      subtitle: '90% completion rate',
      icon: <ClipboardCheck className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Total feedback reviews submitted',
      status: { label: 'Excellent', variant: 'success' as const },
      progress: 90,
      progressColor: 'green' as const,
      href: '/dashboard/review-progress',
    },
    {
      title: 'Average Team Progress',
      value: '74%',
      subtitle: 'Above average performance',
      icon: <TrendingUp className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Average completion across all teams',
      status: { label: '+8%', variant: 'success' as const },
      trend: { value: '+8%', up: true },
      href: '/dashboard/assigned-teams',
    },
  ];

  const todaysSchedule = [
    { time: '09:00 AM', team: 'Quantum Coders', topic: 'ML Model Optimization', type: 'video' as const, status: 'upcoming' },
    { time: '11:00 AM', team: 'Cloud Innovators', topic: 'Architecture Review', type: 'video' as const, status: 'upcoming' },
    { time: '02:00 PM', team: 'Data Wizards', topic: 'Data Pipeline Design', type: 'video' as const, status: 'upcoming' },
    { time: '04:00 PM', team: 'Health Heroes', topic: 'API Integration', type: 'in-person' as const, status: 'upcoming' },
  ];

  const upcomingMeetings = [
    { team: 'EduLearn Masters', date: 'Tomorrow, 10:00 AM', topic: 'UI/UX Best Practices' },
    { team: 'FinTech Wizards', date: 'Friday, 2:00 PM', topic: 'Security Architecture' },
    { team: 'Green Tech', date: 'Saturday, 11:00 AM', topic: 'IoT Integration' },
  ];

  const recentlyReviewed = [
    {
      team: 'Quantum Coders',
      track: 'AI/ML',
      submittedAt: '2 hours ago',
      score: 8.7,
      status: 'approved' as const,
      avatar: 'QC',
    },
    {
      team: 'Cloud Innovators',
      track: 'Cloud',
      submittedAt: '1 day ago',
      score: 8.3,
      status: 'approved' as const,
      avatar: 'CI',
    },
    {
      team: 'Data Wizards',
      track: 'Data Science',
      submittedAt: '2 days ago',
      score: 9.1,
      status: 'approved' as const,
      avatar: 'DW',
    },
    {
      team: 'Health Heroes',
      track: 'HealthTech',
      submittedAt: '3 days ago',
      score: 7.8,
      status: 'needs-revision' as const,
      avatar: 'HH',
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Dr. Chen'}!`}
      subtitle="Here's an overview of your mentoring activities today."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Schedule */}
        <DashboardWidget
          title="Today's Schedule"
          subtitle="Your meetings lined up for today"
          action={
            <button
              onClick={() => navigate('/dashboard/mentor-sessions')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {todaysSchedule.map((session, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-16 text-center">
                  <p className="text-xs text-gray-500">{session.time.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-gray-900">{session.time.split(' ')[1]}</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{session.team}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{session.topic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="blue">{session.type === 'video' ? 'Video Call' : 'In-Person'}</Badge>
                  <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Upcoming Meetings */}
        <DashboardWidget
          title="Upcoming Meetings"
          subtitle="Next 3 days"
          action={
            <button
              onClick={() => navigate('/dashboard/mentor-sessions')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Calendar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {upcomingMeetings.map((meeting, idx) => (
              <div key={idx} className="p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                <p className="font-semibold text-gray-900 text-sm">{meeting.team}</p>
                <p className="text-xs text-gray-600 mt-1">{meeting.topic}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {meeting.date}
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>

      {/* Recently Reviewed Teams */}
      <DashboardWidget
        title="Recently Reviewed Teams"
        subtitle="Latest submission evaluations"
        action={
          <button
            onClick={() => navigate('/dashboard/review-progress')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyReviewed.map((team, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {team.avatar}
                </div>
                {team.status === 'approved' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{team.team}</p>
              <Badge variant="blue" className="mt-1.5">{team.track}</Badge>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">{team.submittedAt}</span>
                <span className="text-lg font-bold text-blue-600">{team.score}</span>
              </div>
            </div>
          ))}
        </div>
      </DashboardWidget>
    </DashboardLayout>
  );
}
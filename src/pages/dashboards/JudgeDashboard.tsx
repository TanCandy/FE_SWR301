import { useNavigate } from 'react-router-dom';
import {
  Folder,
  CheckCircle2,
  Star,
  Clock,
  ArrowRight,
  Calendar,
  Trophy,
  FileText,
  Github,
  Video,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function JudgeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Assigned Projects',
      value: '12',
      subtitle: '4 remaining to review',
      icon: <Folder className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Total projects assigned for evaluation',
      status: { label: 'Active', variant: 'info' as const },
      href: '/dashboard/assigned-projects',
    },
    {
      title: 'Reviews Completed',
      value: '8',
      subtitle: '67% completion rate',
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Total project reviews completed',
      status: { label: 'On Track', variant: 'success' as const },
      progress: 67,
      progressColor: 'blue' as const,
      href: '/dashboard/assigned-projects',
    },
    {
      title: 'Average Score Given',
      value: '8.1',
      subtitle: 'Across all submissions',
      icon: <Star className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Mean score across all evaluated projects',
      status: { label: 'Above Avg', variant: 'success' as const },
      trend: { value: '+0.3', up: true },
    },
    {
      title: 'Pending Reviews',
      value: '4',
      subtitle: 'Deadline: Tomorrow',
      icon: <Clock className="w-5 h-5" />,
      iconColor: 'red' as const,
      tooltip: 'Projects awaiting your evaluation',
      status: { label: 'Urgent', variant: 'danger' as const },
      href: '/dashboard/assigned-projects',
    },
  ];

  const evaluationQueue = [
    {
      team: 'AI Pioneers',
      project: 'Neural Vision Platform',
      track: 'AI/ML',
      submittedAt: '2 hours ago',
      priority: 'high' as const,
      avatar: 'AP',
    },
    {
      team: 'Cloud Masters',
      project: 'Serverless Architecture',
      track: 'Cloud',
      submittedAt: '5 hours ago',
      priority: 'high' as const,
      avatar: 'CM',
    },
    {
      team: 'Data Crunchers',
      project: 'Real-time Analytics',
      track: 'Data Science',
      submittedAt: '1 day ago',
      priority: 'medium' as const,
      avatar: 'DC',
    },
    {
      team: 'Health Innovators',
      project: 'Patient Monitoring System',
      track: 'HealthTech',
      submittedAt: '1 day ago',
      priority: 'medium' as const,
      avatar: 'HI',
    },
  ];

  const todaysSchedule = [
    { time: '10:00 AM', event: 'Judging Panel Meeting', type: 'meeting' as const },
    { time: '02:00 PM', event: 'Project Demos - Track A', type: 'demo' as const },
    { time: '04:00 PM', event: 'Calibration Session', type: 'meeting' as const },
  ];

  const recentReviews = [
    {
      team: 'Quantum Coders',
      project: 'ML Optimization Engine',
      score: 8.7,
      criteria: { innovation: 9, technical: 9, ux: 8, business: 8, presentation: 9 },
      date: '2 hours ago',
      avatar: 'QC',
    },
    {
      team: 'EduLearn Masters',
      project: 'Adaptive Learning Platform',
      score: 8.4,
      criteria: { innovation: 8, technical: 8, ux: 9, business: 8, presentation: 9 },
      date: 'Yesterday',
      avatar: 'EM',
    },
    {
      team: 'FinTech Wizards',
      project: 'Crypto Trading Bot',
      score: 8.9,
      criteria: { innovation: 9, technical: 9, ux: 8, business: 10, presentation: 9 },
      date: '2 days ago',
      avatar: 'FW',
    },
    {
      team: 'Green Tech',
      project: 'Carbon Tracker',
      score: 7.9,
      criteria: { innovation: 8, technical: 8, ux: 7, business: 8, presentation: 8 },
      date: '3 days ago',
      avatar: 'GT',
    },
  ];

  const getPriorityVariant = (priority: 'high' | 'medium') =>
    priority === 'high' ? ('red' as const) : ('amber' as const);

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Judge'}!`}
      subtitle="Review and evaluate hackathon projects."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Evaluation Queue */}
        <DashboardWidget
          title="Evaluation Queue"
          subtitle="Projects awaiting your review"
          action={
            <button
              onClick={() => navigate('/dashboard/assigned-projects')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {evaluationQueue.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-gray-900 text-sm">{item.team}</p>
                    <Badge variant="blue">{item.track}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{item.project}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge variant={getPriorityVariant(item.priority)}>
                    {item.priority === 'high' ? 'High Priority' : 'Medium'}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{item.submittedAt}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/review-submission');
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </DashboardWidget>

        {/* Today's Schedule */}
        <DashboardWidget
          title="Today's Schedule"
          subtitle="Your agenda for today"
          action={
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Calendar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {todaysSchedule.map((session, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  session.type === 'demo' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {session.type === 'demo' ? (
                    <Trophy className="w-5 h-5 text-purple-600" />
                  ) : (
                    <Calendar className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{session.event}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>

      {/* Recent Reviews */}
      <DashboardWidget
        title="Recent Reviews"
        subtitle="Your latest evaluations"
        action={
          <button
            onClick={() => navigate('/dashboard/assigned-projects')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentReviews.map((review, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {review.avatar}
                </div>
                <span className="text-xl font-bold text-blue-600">{review.score}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{review.team}</p>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{review.project}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              {/* Criteria mini-bars */}
              <div className="mt-3 space-y-1">
                {Object.entries(review.criteria).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 capitalize w-12">{key.slice(0, 3)}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                      <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${val * 10}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-5">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DashboardWidget>
    </DashboardLayout>
  );
}
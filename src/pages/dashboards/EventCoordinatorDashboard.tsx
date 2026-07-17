import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Layers,
  Flag,
  Users,
  Video,
  Upload,
  ArrowRight,
  Clock,
  Megaphone,
  Activity,
  CheckCircle2,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/ui/DashboardCard';
import DashboardWidget from '../../components/ui/DashboardWidget';
import Badge from '../../components/ui/Badge';

export default function EventCoordinatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Current Event',
      value: 'SEAL Spring 2026',
      subtitle: 'In progress · Round 2',
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'blue' as const,
      tooltip: 'Currently active hackathon event',
      status: { label: 'Active', variant: 'success' as const },
      href: '/dashboard/manage-event',
    },
    {
      title: 'Current Round',
      value: 'Round 2',
      subtitle: 'Submission Phase',
      icon: <Flag className="w-5 h-5" />,
      iconColor: 'purple' as const,
      tooltip: 'Active hackathon round',
      status: { label: 'Day 12', variant: 'info' as const },
      href: '/dashboard/manage-round',
    },
    {
      title: 'Tracks',
      value: '5',
      subtitle: 'AI, Web, Mobile, Game, IoT',
      icon: <Layers className="w-5 h-5" />,
      iconColor: 'amber' as const,
      tooltip: 'Number of active tracks',
      status: { label: 'All Active', variant: 'success' as const },
      href: '/dashboard/manage-track',
    },
    {
      title: 'Participants',
      value: '245',
      subtitle: '+18 this week',
      icon: <Users className="w-5 h-5" />,
      iconColor: 'green' as const,
      tooltip: 'Total registered participants',
      status: { label: '+18', variant: 'success' as const },
      trend: { value: '+18%', up: true },
      href: '/dashboard/manage-participants',
    },
    {
      title: 'Upcoming Sessions',
      value: '24',
      subtitle: 'Next 7 days',
      icon: <Video className="w-5 h-5" />,
      iconColor: 'indigo' as const,
      tooltip: 'Sessions scheduled for this week',
      status: { label: 'Scheduled', variant: 'info' as const },
      href: '/dashboard/schedule',
    },
    {
      title: 'Submission Progress',
      value: '91%',
      subtitle: '138 / 152 teams submitted',
      icon: <Upload className="w-5 h-5" />,
      iconColor: 'pink' as const,
      tooltip: 'Current submission rate',
      status: { label: 'Excellent', variant: 'success' as const },
      progress: 91,
      progressColor: 'green' as const,
    },
  ];

  // Mini calendar events
  const today = 21;
  const calendarEvents = [
    { day: 20, events: [{ title: 'Mentor Session', type: 'session' as const, time: '10:00 AM' }] },
    { day: 21, events: [{ title: 'Round 2 Deadline', type: 'deadline' as const, time: '5:00 PM' }, { title: 'Sprint Planning', type: 'meeting' as const, time: '4:00 PM' }] },
    { day: 22, events: [{ title: 'Demo Day Prep', type: 'event' as const, time: '10:00 AM' }] },
    { day: 23, events: [] },
    { day: 24, events: [{ title: 'Mentor Workshop', type: 'session' as const, time: '2:00 PM' }] },
    { day: 25, events: [{ title: 'Project Demos', type: 'event' as const, time: '11:00 AM' }] },
  ];

  const timeline = [
    { time: '09:00 AM', title: 'Mentor Session - Quantum Coders', type: 'session' as const, status: 'upcoming' },
    { time: '11:00 AM', title: 'Sprint Review Meeting', type: 'meeting' as const, status: 'upcoming' },
    { time: '02:00 PM', title: 'Round 2 Submission Deadline', type: 'deadline' as const, status: 'pending' },
    { time: '04:00 PM', title: 'Demo Practice - Code Warriors', type: 'event' as const, status: 'pending' },
  ];

  const recentActivities = [
    { action: 'New team registered: Team Phoenix', time: '15 min ago', icon: <Users className="w-4 h-4" />, color: 'blue' },
    { action: 'Track "Mobile" reached max teams', time: '1 hour ago', icon: <Layers className="w-4 h-4" />, color: 'amber' },
    { action: 'Round 2 deadline extended by 48 hours', time: '2 hours ago', icon: <Flag className="w-4 h-4" />, color: 'purple' },
    { action: '12 new submissions uploaded', time: '4 hours ago', icon: <Upload className="w-4 h-4" />, color: 'green' },
  ];

  const announcements = [
    { title: 'Round 2 Deadline Reminder', content: 'Less than 48 hours remaining for submission.', time: '2 hours ago', pinned: true },
    { title: 'Workshop: Pitching Your Project', content: 'Free workshop for finalists on Friday at 2 PM.', time: '1 day ago', pinned: false },
  ];

  const getEventColor = (type: 'session' | 'meeting' | 'deadline' | 'event') => {
    const map = {
      session: 'bg-blue-500',
      meeting: 'bg-purple-500',
      deadline: 'bg-red-500',
      event: 'bg-green-500',
    };
    return map[type];
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name?.split(' ')[0] || 'Lisa'}!`}
      subtitle="Coordinate and oversee all hackathon activities."
      actions={
        <button
          onClick={() => navigate('/dashboard/manage-event')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Event
        </button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Calendar + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Mini Calendar */}
        <DashboardWidget
          title="Calendar"
          subtitle="March 2026"
          action={
            <button
              onClick={() => navigate('/dashboard/schedule')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Full view <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2;
              if (day < 1 || day > 31) return <div key={i} className="h-20" />;
              const dayData = calendarEvents.find((e) => e.day === day);
              const isToday = day === today;
              return (
                <div
                  key={i}
                  className={`h-20 rounded-xl border p-1.5 transition-colors ${
                    isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-xs font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</div>
                  <div className="space-y-0.5">
                    {dayData?.events.slice(0, 2).map((e, idx) => (
                      <div key={idx} className={`text-[10px] px-1 py-0.5 rounded ${getEventColor(e.type)} text-white truncate`}>
                        {e.time}
                      </div>
                    ))}
                    {dayData && dayData.events.length > 2 && (
                      <div className="text-[10px] text-gray-500">+{dayData.events.length - 2} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Today's Timeline */}
        <DashboardWidget title="Today's Timeline" subtitle="Upcoming events">
          <div className="space-y-3">
            {timeline.map((item, idx) => {
              const style = getEventColor(item.type);
              return (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <div className="w-1 h-12 rounded-full" style={{ backgroundColor: style.replace('bg-', '').replace('-500', '') }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </p>
                  </div>
                  <Badge variant={item.status === 'upcoming' ? 'blue' : 'amber'}>
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </DashboardWidget>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Submission Trend */}
        <DashboardWidget
          title="Submission Trend"
          subtitle="Last 14 days"
          action={<Badge variant="green">+24% vs last week</Badge>}
        >
          <div className="flex items-end gap-1.5 h-40 mt-4 px-1">
            {[12, 18, 15, 22, 28, 25, 30, 35, 32, 28, 42, 45, 38, 50].map((count, idx) => {
              const percent = (count / 50) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex-1 bg-gray-100 rounded flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded transition-all duration-500"
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>2 weeks ago</span>
            <span>Today</span>
          </div>
        </DashboardWidget>

        {/* Participants Per Track */}
        <DashboardWidget title="Participants Per Track" subtitle="Distribution">
          <div className="space-y-3 mt-4">
            {[
              { name: 'AI/ML', count: 78, color: 'bg-blue-500' },
              { name: 'FinTech', count: 52, color: 'bg-green-500' },
              { name: 'HealthTech', count: 45, color: 'bg-purple-500' },
              { name: 'EdTech', count: 38, color: 'bg-amber-500' },
              { name: 'IoT', count: 32, color: 'bg-pink-500' },
            ].map((track, idx) => {
              const max = 80;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{track.name}</span>
                    <span className="text-sm font-bold text-gray-900">{track.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${track.color}`}
                      style={{ width: `${(track.count / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>
      </div>

      {/* Recent Activities + Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <DashboardWidget title="Recent Activities" subtitle="Latest system events" className="lg:col-span-2">
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-600',
                amber: 'bg-amber-100 text-amber-600',
                purple: 'bg-purple-100 text-purple-600',
                green: 'bg-green-100 text-green-600',
              };
              return (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[activity.color]}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Announcements */}
        <DashboardWidget
          title="Announcements"
          subtitle="Recent updates"
          action={
            <button
              onClick={() => navigate('/dashboard/announcements')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div key={idx} className="p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="w-3.5 h-3.5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">{ann.title}</h4>
                  {ann.pinned && <Badge variant="blue">Pinned</Badge>}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-1.5">{ann.time}</p>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>
    </DashboardLayout>
  );
}
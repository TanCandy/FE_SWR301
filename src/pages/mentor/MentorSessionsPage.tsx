import { useState } from 'react';
import { Calendar, Clock, Video, Check, X, MessageSquare, FileText } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import StatusChip from '../../components/ui/StatusChip';

interface Session {
  id: string;
  team: string;
  topic: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  description: string;
}

const mockSessions: Session[] = [
  { id: '1', team: 'Quantum Coders', topic: 'ML Model Optimization', date: '2024-03-20', time: '14:00', status: 'pending', description: 'Need help optimizing our ML model for better performance.' },
  { id: '2', team: 'Cloud Innovators', topic: 'Architecture Review', date: '2024-03-21', time: '10:00', status: 'approved', description: 'Would like to review our cloud architecture design.' },
  { id: '3', team: 'Data Wizards', topic: 'Data Pipeline', date: '2024-03-15', time: '15:00', status: 'completed', description: 'Discussed data pipeline implementation.' },
];

export default function MentorSessionsPage() {
  const [sessions] = useState<Session[]>(mockSessions);

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'pending': return 'amber';
      case 'approved': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
    }
  };

  return (
    <SharedLayout
      title="Mentor Sessions"
      subtitle="Manage your mentoring sessions"
      breadcrumbs={[{ label: 'Mentor Sessions' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending', count: 2, color: 'bg-amber-100 text-amber-700' },
          { label: 'Approved', count: 3, color: 'bg-blue-100 text-blue-700' },
          { label: 'Completed', count: 10, color: 'bg-green-100 text-green-700' },
          { label: 'This Week', count: 4, color: 'bg-purple-100 text-purple-700' },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <Avatar name={session.team} size="lg" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{session.team}</h3>
                    <p className="text-lg font-medium text-blue-600 mt-1">{session.topic}</p>
                  </div>
                  <StatusChip status={session.status === 'pending' ? 'pending' : session.status === 'approved' ? 'in_progress' : session.status === 'completed' ? 'completed' : 'rejected'} />
                </div>
                <p className="text-gray-600 mt-2">{session.description}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </span>
                </div>
              </div>
              {session.status === 'pending' && (
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              )}
              {session.status === 'approved' && (
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                    <Video className="w-4 h-4" />
                    Start Meeting
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    Reschedule
                  </button>
                </div>
              )}
              {session.status === 'completed' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200">
                  <FileText className="w-4 h-4" />
                  Write Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </SharedLayout>
  );
}

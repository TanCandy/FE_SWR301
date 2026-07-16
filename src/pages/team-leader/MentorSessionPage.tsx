import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import StatusChip from '../../components/ui/StatusChip';

interface Session {
  id: string;
  mentor: string;
  topic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
}

const mockSessions: Session[] = [
  { id: '1', mentor: 'Dr. Sarah Chen', topic: 'ML Model Optimization', date: '2024-03-20', time: '14:00', status: 'upcoming', meetingLink: 'https://meet.google.com/abc-defg-hij' },
  { id: '2', mentor: 'Dr. Sarah Chen', topic: 'Architecture Review', date: '2024-03-15', time: '10:00', status: 'completed', meetingLink: 'https://meet.google.com/xyz-uvwx-rst' },
  { id: '3', mentor: 'Dr. Sarah Chen', topic: 'Data Pipeline Design', date: '2024-03-10', time: '15:00', status: 'completed', meetingLink: 'https://meet.google.com/pqr-stuv-wxy' },
  { id: '4', mentor: 'Prof. James Wilson', topic: 'Cloud Deployment', date: '2024-03-25', time: '11:00', status: 'upcoming', meetingLink: 'https://meet.google.com/mno-pqrs-tuv' },
];

const daysInMonth = 31;
const firstDay = new Date(2024, 2, 1).getDay();
const currentMonth = 'March 2024';

export default function MentorSessionPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [sessions] = useState<Session[]>(mockSessions);

  const upcomingSessions = sessions.filter((s) => s.status === 'upcoming');
  const completedSessions = sessions.filter((s) => s.status === 'completed');

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-12 h-12" />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const hasSession = sessions.some((s) => new Date(s.date).getDate() === i && s.status === 'upcoming');
      const isToday = i === 15;
      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(i)}
          className={`w-12 h-12 rounded-xl text-sm font-medium transition-colors relative ${
            hasSession ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
          } ${isToday ? 'ring-2 ring-blue-500' : ''} ${selectedDate === i ? 'bg-blue-600 text-white' : ''}`}
        >
          {i}
          {hasSession && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <SharedLayout
      title="Mentor Sessions"
      subtitle="Schedule and manage mentor sessions"
      breadcrumbs={[{ label: 'Mentor Sessions' }]}
      actions={
        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Request Session
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">{currentMonth}</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <div key={d} className="w-12 h-8 flex items-center justify-center text-xs font-medium text-gray-400">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>

          {/* Mentor Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Mentor</h3>
            <div className="flex items-center gap-4">
              <Avatar name="Dr. Sarah Chen" role="mentor" size="lg" />
              <div>
                <p className="font-semibold text-gray-900">Dr. Sarah Chen</p>
                <p className="text-sm text-gray-500">AI/ML Specialist</p>
                <p className="text-sm text-gray-400">3 sessions completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="lg:col-span-2">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
            {upcomingSessions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No upcoming sessions</p>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{session.topic}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
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
                    <div className="flex flex-col items-end gap-2">
                      <StatusChip status="in_progress" />
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Past Sessions</h3>
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div key={session.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{session.topic}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
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
                  <StatusChip status="completed" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request Session Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Request Mentor Session"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsRequestModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
              Cancel
            </button>
            <button onClick={() => setIsRequestModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">
              Submit Request
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <input type="text" placeholder="What would you like to discuss?" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={3} placeholder="Provide more details about your session..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

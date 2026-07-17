import { useState } from 'react';
import { Calendar, Clock, Video, Megaphone, Users, Plus } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface ScheduleItem {
  id: string;
  title: string;
  type: 'mentor' | 'presentation' | 'judge' | 'event';
  date: string;
  time: string;
  duration: string;
  location: string;
  participants: number;
  status: 'upcoming' | 'in_progress' | 'completed';
}

const mockSchedule: ScheduleItem[] = [
  { id: '1', title: 'Mentor Session - Quantum Coders', type: 'mentor', date: '2026-03-21', time: '09:00 AM', duration: '60 min', location: 'Room 301', participants: 5, status: 'upcoming' },
  { id: '2', title: 'Sprint Review Meeting', type: 'event', date: '2026-03-21', time: '11:00 AM', duration: '90 min', location: 'Main Hall', participants: 45, status: 'upcoming' },
  { id: '3', title: 'Project Demos - Round 2', type: 'presentation', date: '2026-03-22', time: '10:00 AM', duration: '4 hours', location: 'Auditorium', participants: 156, status: 'upcoming' },
  { id: '4', title: 'Judge Calibration Session', type: 'judge', date: '2026-03-22', time: '02:00 PM', duration: '2 hours', location: 'Conference Room A', participants: 12, status: 'upcoming' },
  { id: '5', title: 'Mentor Workshop: Cloud Architecture', type: 'mentor', date: '2026-03-23', time: '02:00 PM', duration: '90 min', location: 'Online', participants: 28, status: 'upcoming' },
  { id: '6', title: 'Closing Ceremony', type: 'event', date: '2026-03-28', time: '06:00 PM', duration: '3 hours', location: 'Main Auditorium', participants: 245, status: 'upcoming' },
];

const typeConfig: Record<ScheduleItem['type'], { label: string; icon: any; color: string; variant: 'blue' | 'purple' | 'amber' | 'green' }> = {
  mentor: { label: 'Mentor Session', icon: Video, color: 'bg-purple-100 text-purple-600', variant: 'purple' },
  presentation: { label: 'Presentation', icon: Users, color: 'bg-blue-100 text-blue-600', variant: 'blue' },
  judge: { label: 'Judge', icon: Users, color: 'bg-amber-100 text-amber-600', variant: 'amber' },
  event: { label: 'Event', icon: Calendar, color: 'bg-green-100 text-green-600', variant: 'green' },
};

export default function CoordinatorSchedulePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const columns = [
    {
      key: 'title',
      label: 'Event',
      render: (item: ScheduleItem) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        return (
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${config.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <Badge variant={config.variant} className="mt-1">{config.label}</Badge>
            </div>
          </div>
        );
      },
    },
    {
      key: 'date',
      label: 'Date',
      render: (item: ScheduleItem) => <span className="text-gray-900 font-medium">{item.date}</span>,
    },
    {
      key: 'time',
      label: 'Time',
      render: (item: ScheduleItem) => (
        <div>
          <p className="font-medium text-gray-900">{item.time}</p>
          <p className="text-xs text-gray-500">{item.duration}</p>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (item: ScheduleItem) => <span className="text-gray-600">{item.location}</span>,
    },
    {
      key: 'participants',
      label: 'Participants',
      render: (item: ScheduleItem) => <span className="text-gray-900 font-medium">{item.participants}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: ScheduleItem) => (
        <Badge variant={item.status === 'completed' ? 'green' : item.status === 'in_progress' ? 'blue' : 'amber'}>
          {item.status.replace('_', ' ')}
        </Badge>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Schedule"
      subtitle="Manage all events, sessions and activities"
      breadcrumbs={[{ label: 'Schedule' }]}
      actions={
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      }
    >
      {/* Mini Calendar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">March 2026</h3>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2;
            if (day < 1 || day > 31) return <div key={i} className="h-16" />;
            const hasEvents = mockSchedule.some((e) => parseInt(e.date.split('-')[2]) === day);
            return (
              <div
                key={i}
                className={`h-16 rounded-xl border p-2 transition-colors ${
                  hasEvents ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
                }`}
              >
                <div className={`text-xs font-semibold ${hasEvents ? 'text-blue-600' : 'text-gray-700'}`}>{day}</div>
                {hasEvents && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
              </div>
            );
          })}
        </div>
      </div>

      <DataTable columns={columns} data={mockSchedule} keyExtractor={(s) => s.id} emptyMessage="No schedule items" />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Schedule Item"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                <option>Mentor Session</option>
                <option>Presentation</option>
                <option>Judge</option>
                <option>Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input type="time" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input type="text" placeholder="60 min" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" placeholder="Room / Online" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}
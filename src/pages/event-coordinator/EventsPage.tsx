import { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Eye, Archive, Send } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';

interface HackathonEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationStart: string;
  registrationEnd: string;
  status: 'draft' | 'registration' | 'active' | 'completed' | 'archived';
  teams: number;
  participants: number;
}

const mockEvents: HackathonEvent[] = [
  { id: '1', name: 'SEAL Spring 2026', description: 'Annual spring hackathon focusing on AI and Cloud', startDate: '2026-03-01', endDate: '2026-03-28', registrationStart: '2026-02-01', registrationEnd: '2026-02-25', status: 'active', teams: 156, participants: 780 },
  { id: '2', name: 'AI Innovation Challenge', description: 'AI-focused innovation challenge', startDate: '2026-04-01', endDate: '2026-04-15', registrationStart: '2026-03-15', registrationEnd: '2026-03-28', status: 'registration', teams: 0, participants: 0 },
  { id: '3', name: 'SEAL Winter 2025', description: 'Winter hackathon', startDate: '2025-12-01', endDate: '2025-12-20', registrationStart: '2025-11-01', registrationEnd: '2025-11-25', status: 'completed', teams: 120, participants: 600 },
  { id: '4', name: 'Mobile Build Sprint', description: 'Mobile app development sprint', startDate: '2025-10-01', endDate: '2025-10-15', registrationStart: '2025-09-01', registrationEnd: '2025-09-25', status: 'archived', teams: 85, participants: 425 },
  { id: '5', name: 'HealthTech Hack 2026', description: 'Healthcare technology hackathon', startDate: '2026-05-15', endDate: '2026-05-30', registrationStart: '2026-04-01', registrationEnd: '2026-04-30', status: 'draft', teams: 0, participants: 0 },
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  registration: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  completed: 'bg-purple-100 text-purple-700',
  archived: 'bg-amber-100 text-amber-700',
};

export default function CoordinatorEventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredEvents = mockEvents
    .filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((e) => filterStatus === 'all' || e.status === filterStatus);

  const columns = [
    {
      key: 'name',
      label: 'Event',
      render: (e: HackathonEvent) => (
        <div>
          <p className="font-medium text-gray-900">{e.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{e.description}</p>
        </div>
      ),
    },
    {
      key: 'period',
      label: 'Period',
      render: (e: HackathonEvent) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">{e.startDate}</p>
          <p className="text-gray-500 text-xs">to {e.endDate}</p>
        </div>
      ),
    },
    {
      key: 'registration',
      label: 'Registration',
      render: (e: HackathonEvent) => (
        <div className="text-sm text-gray-600">
          <p>{e.registrationStart}</p>
          <p className="text-xs text-gray-400">to {e.registrationEnd}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (e: HackathonEvent) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[e.status]}`}>
          {e.status}
        </span>
      ),
    },
    {
      key: 'stats',
      label: 'Participants',
      render: (e: HackathonEvent) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">{e.teams} teams</p>
          <p className="text-gray-500 text-xs">{e.participants} participants</p>
        </div>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (e: HackathonEvent) => (
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-green-600"><Edit className="w-4 h-4" /></button>
          {e.status === 'draft' && (
            <button className="p-2 text-gray-400 hover:text-blue-600" title="Publish"><Send className="w-4 h-4" /></button>
          )}
          {e.status === 'completed' && (
            <button className="p-2 text-gray-400 hover:text-amber-600" title="Archive"><Archive className="w-4 h-4" /></button>
          )}
          <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Manage Hackathon Events"
      subtitle="Create and manage all hackathon events"
      breadcrumbs={[{ label: 'Manage Events' }]}
      actions={
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total', value: 5, color: 'bg-blue-100 text-blue-700' },
          { label: 'Active', value: 1, color: 'bg-green-100 text-green-700' },
          { label: 'Registration', value: 1, color: 'bg-blue-100 text-blue-700' },
          { label: 'Completed', value: 1, color: 'bg-purple-100 text-purple-700' },
          { label: 'Archived', value: 1, color: 'bg-amber-100 text-amber-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search events..." className="max-w-md flex-1" />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="registration">Registration</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredEvents} keyExtractor={(e) => e.id} emptyMessage="No events found" />

      <div className="mt-6 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Event" size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Create</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
            <input type="text" placeholder="e.g., SEAL Summer 2026" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={3} placeholder="Describe the event..." className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Start</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration End</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Start</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event End</label>
              <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}
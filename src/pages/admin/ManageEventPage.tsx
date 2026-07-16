import { useState } from 'react';
import { Calendar, Plus, Edit, Trash2, Copy, CheckCircle } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface HackathonEvent {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'registration' | 'active' | 'completed' | 'archived';
  teams: number;
  participants: number;
}

const mockEvents: HackathonEvent[] = [
  { id: '1', name: 'SEAL Spring 2024', description: 'Annual spring hackathon', startDate: '2024-03-01', endDate: '2024-03-25', status: 'active', teams: 156, participants: 780 },
  { id: '2', name: 'AI Innovation Challenge', description: 'AI-focused innovation challenge', startDate: '2024-04-01', endDate: '2024-04-15', status: 'registration', teams: 0, participants: 0 },
  { id: '3', name: 'Winter Hackathon 2023', description: 'Previous winter hackathon', startDate: '2023-12-01', endDate: '2023-12-20', status: 'completed', teams: 120, participants: 600 },
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  registration: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  completed: 'bg-purple-100 text-purple-700',
  archived: 'bg-amber-100 text-amber-700',
};

export default function AdminManageEventPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events] = useState<HackathonEvent[]>(mockEvents);

  const columns = [
    {
      key: 'name',
      label: 'Event',
      render: (e: HackathonEvent) => (
        <div>
          <p className="font-medium text-gray-900">{e.name}</p>
          <p className="text-sm text-gray-500">{e.description}</p>
        </div>
      ),
    },
    {
      key: 'dates',
      label: 'Dates',
      render: (e: HackathonEvent) => (
        <div className="text-sm text-gray-600">
          <p>{e.startDate} - {e.endDate}</p>
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
          <p className="text-gray-500">{e.participants} participants</p>
        </div>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Manage Hackathon Events"
      subtitle="Create and manage hackathon events"
      breadcrumbs={[{ label: 'Manage Events' }]}
      actions={
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      }
    >
      <DataTable columns={columns} data={events} keyExtractor={(e) => e.id} emptyMessage="No events found" />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Hackathon Event" size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Create</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">End Date</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

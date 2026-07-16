import { useState } from 'react';
import { Users, Upload, Download, Search } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';

interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  status: 'registered' | 'confirmed' | 'rejected';
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', role: 'Team Leader', team: 'Quantum Coders', status: 'confirmed' },
  { id: '2', name: 'Jamie Rodriguez', email: 'jamie@email.com', role: 'Student', team: 'Quantum Coders', status: 'confirmed' },
  { id: '3', name: 'Chris Lee', email: 'chris@email.com', role: 'Student', team: 'Unassigned', status: 'registered' },
  { id: '4', name: 'Taylor Kim', email: 'taylor@email.com', role: 'Student', team: 'Unassigned', status: 'rejected' },
];

export default function AdminManageParticipantsPage() {
  const [participants] = useState<Participant[]>(mockParticipants);
  const [activeTab, setActiveTab] = useState<'students' | 'teams'>('students');

  const columns = [
    {
      key: 'name',
      label: 'Participant',
      render: (p: Participant) => (
        <div className="flex items-center gap-3">
          <Avatar name={p.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{p.name}</p>
            <p className="text-xs text-gray-500">{p.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (p: Participant) => <Badge variant="blue">{p.role}</Badge>,
    },
    {
      key: 'team',
      label: 'Team',
      render: (p: Participant) => <span className={p.team === 'Unassigned' ? 'text-gray-400' : 'text-gray-900'}>{p.team}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (p: Participant) => <Badge variant={p.status === 'confirmed' ? 'green' : p.status === 'registered' ? 'blue' : 'red'}>{p.status}</Badge>,
    },
  ];

  return (
    <SharedLayout title="Manage Participants" subtitle="View and manage participants" breadcrumbs={[{ label: 'Manage Participants' }]}
      actions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Import Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['students', 'teams'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab === 'students' ? 'Students' : 'Teams'}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={participants} keyExtractor={(p) => p.id} emptyMessage="No participants found" />
    </SharedLayout>
  );
}

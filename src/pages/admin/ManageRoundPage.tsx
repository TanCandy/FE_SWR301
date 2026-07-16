import { useState } from 'react';
import { Flag, Plus, Edit, Trash2 } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Round {
  id: string;
  name: string;
  description: string;
  submissionDeadline: string;
  evaluationDeadline: string;
  status: 'upcoming' | 'active' | 'completed';
  teams: number;
}

const mockRounds: Round[] = [
  { id: '1', name: 'Round 1: Ideation', description: 'Initial project concept submission', submissionDeadline: '2024-03-10', evaluationDeadline: '2024-03-12', status: 'completed', teams: 156 },
  { id: '2', name: 'Round 2: Development', description: 'Working prototype development', submissionDeadline: '2024-03-25', evaluationDeadline: '2024-03-28', status: 'active', teams: 150 },
  { id: '3', name: 'Round 3: Final Presentation', description: 'Final demo and presentation', submissionDeadline: '2024-04-05', evaluationDeadline: '2024-04-07', status: 'upcoming', teams: 0 },
];

export default function AdminManageRoundPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rounds] = useState<Round[]>(mockRounds);

  const columns = [
    {
      key: 'name',
      label: 'Round',
      render: (r: Round) => (
        <div>
          <p className="font-medium text-gray-900">{r.name}</p>
          <p className="text-sm text-gray-500">{r.description}</p>
        </div>
      ),
    },
    {
      key: 'deadlines',
      label: 'Deadlines',
      render: (r: Round) => (
        <div className="text-sm">
          <p>Submission: {r.submissionDeadline}</p>
          <p className="text-gray-500">Evaluation: {r.evaluationDeadline}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (r: Round) => <Badge variant={r.status === 'completed' ? 'green' : r.status === 'active' ? 'blue' : 'gray'}>{r.status}</Badge>,
    },
    {
      key: 'teams',
      label: 'Teams',
      render: (r: Round) => <span className="font-medium">{r.teams}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout title="Manage Rounds" subtitle="Configure hackathon rounds" breadcrumbs={[{ label: 'Manage Rounds' }]}
      actions={<button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"><Plus className="w-4 h-4" />Add Round</button>}
    >
      <DataTable columns={columns} data={rounds} keyExtractor={(r) => r.id} emptyMessage="No rounds found" />
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Round"
        footer={<div className="flex gap-3 justify-end"><button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button><button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add Round</button></div>}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Round Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Submission Deadline</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Evaluation Deadline</label><input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

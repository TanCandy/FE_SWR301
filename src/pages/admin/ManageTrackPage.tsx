import { useState } from 'react';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Track {
  id: string;
  name: string;
  description: string;
  color: string;
  teams: number;
  status: 'active' | 'inactive';
}

const mockTracks: Track[] = [
  { id: '1', name: 'AI/ML', description: 'Artificial Intelligence and Machine Learning', color: '#2563EB', teams: 45, status: 'active' },
  { id: '2', name: 'FinTech', description: 'Financial Technology', color: '#10B981', teams: 32, status: 'active' },
  { id: '3', name: 'HealthTech', description: 'Healthcare Technology', color: '#EF4444', teams: 28, status: 'active' },
  { id: '4', name: 'EdTech', description: 'Education Technology', color: '#8B5CF6', teams: 25, status: 'active' },
  { id: '5', name: 'Cloud', description: 'Cloud Computing', color: '#F59E0B', teams: 26, status: 'inactive' },
];

export default function AdminManageTrackPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tracks] = useState<Track[]>(mockTracks);

  const columns = [
    {
      key: 'name',
      label: 'Track',
      render: (t: Track) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: t.color + '20' }}>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: t.color }} />
          </div>
          <div>
            <p className="font-medium text-gray-900">{t.name}</p>
            <p className="text-sm text-gray-500">{t.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'teams',
      label: 'Teams',
      render: (t: Track) => <span className="font-medium text-gray-900">{t.teams}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (t: Track) => <Badge variant={t.status === 'active' ? 'green' : 'gray'}>{t.status}</Badge>,
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
    <SharedLayout
      title="Manage Tracks"
      subtitle="Configure hackathon tracks"
      breadcrumbs={[{ label: 'Manage Tracks' }]}
      actions={
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl">
          <Plus className="w-4 h-4" />
          Add Track
        </button>
      }
    >
      <DataTable columns={columns} data={tracks} keyExtractor={(t) => t.id} emptyMessage="No tracks found" />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Track"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add Track</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Track Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Color</label><input type="color" className="w-full h-12 rounded-xl cursor-pointer" /></div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

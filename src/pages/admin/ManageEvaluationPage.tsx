import { useState } from 'react';
import { ClipboardCheck, Plus, Edit, Trash2 } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Criteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  track: string;
  status: 'active' | 'inactive';
}

const mockCriteria: Criteria[] = [
  { id: '1', name: 'Innovation', description: 'Creativity and novelty of the solution', weight: 25, track: 'All Tracks', status: 'active' },
  { id: '2', name: 'Technical Implementation', description: 'Code quality and architecture', weight: 30, track: 'All Tracks', status: 'active' },
  { id: '3', name: 'User Experience', description: 'UI/UX design and usability', weight: 20, track: 'All Tracks', status: 'active' },
  { id: '4', name: 'Business Potential', description: 'Market viability', weight: 15, track: 'All Tracks', status: 'active' },
  { id: '5', name: 'Presentation', description: 'Clarity and demo quality', weight: 10, track: 'All Tracks', status: 'active' },
];

export default function AdminManageEvaluationPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [criteria] = useState<Criteria[]>(mockCriteria);

  const columns = [
    {
      key: 'name',
      label: 'Criteria',
      render: (c: Criteria) => (
        <div>
          <p className="font-medium text-gray-900">{c.name}</p>
          <p className="text-sm text-gray-500">{c.description}</p>
        </div>
      ),
    },
    {
      key: 'weight',
      label: 'Weight',
      render: (c: Criteria) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${c.weight * 4}%` }} />
          </div>
          <span className="font-medium">{c.weight}%</span>
        </div>
      ),
    },
    {
      key: 'track',
      label: 'Track',
      render: (c: Criteria) => <Badge variant="blue">{c.track}</Badge>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (c: Criteria) => <Badge variant={c.status === 'active' ? 'green' : 'gray'}>{c.status}</Badge>,
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
    <SharedLayout title="Manage Evaluation" subtitle="Configure evaluation criteria" breadcrumbs={[{ label: 'Manage Evaluation' }]}
      actions={<button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"><Plus className="w-4 h-4" />Add Criteria</button>}
    >
      <DataTable columns={columns} data={criteria} keyExtractor={(c) => c.id} emptyMessage="No criteria found" />
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Evaluation Criteria"
        footer={<div className="flex gap-3 justify-end"><button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button><button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add Criteria</button></div>}
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Criteria Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Weight (%)</label><input type="number" min="0" max="100" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Track</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl"><option>All Tracks</option><option>AI/ML</option><option>FinTech</option></select></div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

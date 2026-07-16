import { useState } from 'react';
import { Trophy, Plus, Edit, Trash2, Medal } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Prize {
  id: string;
  name: string;
  position: '1st' | '2nd' | '3rd' | 'other';
  amount: string;
  description: string;
  winners?: string;
  status: 'active' | 'pending' | 'awarded';
}

const mockPrizes: Prize[] = [
  { id: '1', name: 'Grand Prize', position: '1st', amount: '$10,000', description: 'First place overall', winners: 'Code Warriors', status: 'awarded' },
  { id: '2', name: 'Second Place', position: '2nd', amount: '$5,000', description: 'Second place overall', winners: 'Data Dragons', status: 'awarded' },
  { id: '3', name: 'Third Place', position: '3rd', amount: '$2,500', description: 'Third place overall', status: 'pending' },
  { id: '4', name: 'Best AI/ML', position: 'other', amount: '$1,000', description: 'Best AI/ML track project', status: 'pending' },
];

const positionColors = {
  '1st': 'bg-amber-100 text-amber-700',
  '2nd': 'bg-gray-100 text-gray-700',
  '3rd': 'bg-orange-100 text-orange-700',
  other: 'bg-blue-100 text-blue-700',
};

export default function AdminManagePrizePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [prizes] = useState<Prize[]>(mockPrizes);

  const columns = [
    {
      key: 'name',
      label: 'Prize',
      render: (p: Prize) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${positionColors[p.position]}`}>
            <Medal className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{p.name}</p>
            <p className="text-sm text-gray-500">{p.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'position',
      label: 'Position',
      render: (p: Prize) => <Badge>{p.position} Place</Badge>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (p: Prize) => <span className="text-lg font-bold text-green-600">{p.amount}</span>,
    },
    {
      key: 'winners',
      label: 'Winner',
      render: (p: Prize) => <span className="text-gray-600">{p.winners || '-'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (p: Prize) => <Badge variant={p.status === 'awarded' ? 'green' : p.status === 'active' ? 'blue' : 'gray'}>{p.status}</Badge>,
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
      title="Manage Prizes"
      subtitle="Configure hackathon prizes"
      breadcrumbs={[{ label: 'Manage Prizes' }]}
      actions={
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl">
          <Plus className="w-4 h-4" />
          Add Prize
        </button>
      }
    >
      <DataTable columns={columns} data={prizes} keyExtractor={(p) => p.id} emptyMessage="No prizes found" />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Prize"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add Prize</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Prize Name</label><input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Position</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl"><option>1st Place</option><option>2nd Place</option><option>3rd Place</option><option>Special Prize</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Amount</label><input type="text" placeholder="$1,000" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

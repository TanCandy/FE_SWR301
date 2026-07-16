import { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Download, Upload } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import StatusChip from '../../components/ui/StatusChip';
import DataTable from '../../components/ui/DataTable';

interface Deliverable {
  id: string;
  title: string;
  round: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'approved' | 'needs_revision';
  score?: number;
  feedback?: string;
}

const mockDeliverables: Deliverable[] = [
  { id: '1', title: 'Project Setup', round: 'Round 1', submittedAt: '2024-03-10 14:30', status: 'approved', score: 9.0, feedback: 'Excellent setup!' },
  { id: '2', title: 'Core Features', round: 'Round 1', submittedAt: '2024-03-12 16:45', status: 'approved', score: 8.5 },
  { id: '3', title: 'Sprint 1 Deliverables', round: 'Round 2', submittedAt: '2024-03-18 10:00', status: 'under_review' },
  { id: '4', title: 'Documentation', round: 'Round 2', submittedAt: '2024-03-19 09:30', status: 'needs_revision', feedback: 'Please add more details' },
];

export default function StudentDeliverablesPage() {
  const [deliverables] = useState<Deliverable[]>(mockDeliverables);

  const columns = [
    {
      key: 'title',
      label: 'Deliverable',
      render: (d: Deliverable) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{d.title}</p>
            <p className="text-xs text-gray-500">{d.round}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (d: Deliverable) => (
        <StatusChip status={
          d.status === 'approved' ? 'completed' :
          d.status === 'under_review' ? 'in_progress' :
          d.status === 'needs_revision' ? 'pending' : 'pending'
        } />
      ),
    },
    {
      key: 'score',
      label: 'Score',
      render: (d: Deliverable) => (
        <span className={d.score ? 'font-bold text-green-600' : 'text-gray-400'}>
          {d.score || '-'}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      render: (d: Deliverable) => (
        <span className="text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {d.submittedAt}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (d: Deliverable) => (
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600">
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Deliverables"
      subtitle="View your submission history"
      breadcrumbs={[{ label: 'Deliverables' }]}
    >
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: 4, color: 'blue' },
          { label: 'Approved', value: 2, color: 'green' },
          { label: 'Under Review', value: 1, color: 'amber' },
          { label: 'Needs Revision', value: 1, color: 'red' },
        ].map((stat) => (
          <div key={stat.label} className={`bg-${stat.color}-50 border border-${stat.color}-100 rounded-xl p-4`}>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Deliverables Table */}
      <DataTable
        columns={columns}
        data={deliverables}
        keyExtractor={(d) => d.id}
        emptyMessage="No deliverables found"
      />
    </SharedLayout>
  );
}

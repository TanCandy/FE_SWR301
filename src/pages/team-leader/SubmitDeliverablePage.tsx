import { useState } from 'react';
import { Upload, File, Link, Video, Clock, CheckCircle, AlertCircle, Download, Plus } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import StatusChip from '../../components/ui/StatusChip';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Submission {
  id: string;
  round: string;
  title: string;
  description: string;
  files: string[];
  githubLink?: string;
  videoLink?: string;
  submittedAt: string;
  status: 'submitted' | 'under_review' | 'evaluated';
  score?: number;
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    round: 'Round 1',
    title: 'Initial Project Setup',
    description: 'Project architecture and initial codebase submission',
    files: ['architecture.pdf', 'codebase.zip'],
    githubLink: 'https://github.com/quantum-coders/project',
    videoLink: 'https://youtube.com/watch?v=abc123',
    submittedAt: '2024-03-10 14:30',
    status: 'evaluated',
    score: 8.5,
  },
  {
    id: '2',
    round: 'Round 2',
    title: 'Sprint 1 Deliverables',
    description: 'Core features implementation and documentation',
    files: ['features.pdf', 'demo.zip'],
    githubLink: 'https://github.com/quantum-coders/project',
    submittedAt: '2024-03-18 16:45',
    status: 'under_review',
  },
];

export default function SubmitDeliverablePage() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissions] = useState<Submission[]>(mockSubmissions);

  const columns = [
    {
      key: 'round',
      label: 'Round',
      render: (s: Submission) => <Badge variant="blue">{s.round}</Badge>,
    },
    {
      key: 'title',
      label: 'Title',
      render: (s: Submission) => (
        <div>
          <p className="font-medium text-gray-900">{s.title}</p>
          <p className="text-xs text-gray-500 mt-1">{s.description}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (s: Submission) => (
        <StatusChip status={s.status === 'submitted' ? 'pending' : s.status === 'under_review' ? 'in_progress' : 'completed'} />
      ),
    },
    {
      key: 'score',
      label: 'Score',
      render: (s: Submission) => (
        <span className={s.score ? 'text-lg font-bold text-green-600' : 'text-gray-400'}>
          {s.score || '-'}
        </span>
      ),
    },
    {
      key: 'submittedAt',
      label: 'Submitted',
      render: (s: Submission) => (
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          {s.submittedAt}
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Submit Deliverable"
      subtitle="Upload and manage your project submissions"
      breadcrumbs={[{ label: 'Submit Deliverable' }]}
      actions={
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Submission
        </button>
      }
    >
      {/* Submission Guidelines */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Submission Deadline</h3>
            <p className="text-blue-700">Round 2 submissions close on March 25, 2024 at 5:00 PM EST</p>
            <p className="text-sm text-blue-600 mt-2">Please ensure all required files are uploaded before the deadline.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Upload Files</p>
            <p className="text-xs text-gray-500">PDF, ZIP, Images</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Link className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">GitHub Repository</p>
            <p className="text-xs text-gray-500">Link your codebase</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Demo Video</p>
            <p className="text-xs text-gray-500">YouTube or Vimeo link</p>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <DataTable
        columns={columns}
        data={submissions}
        keyExtractor={(s) => s.id}
        emptyMessage="No submissions yet"
      />

      {/* Submit Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Submit Deliverable"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsSubmitModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
              Cancel
            </button>
            <button onClick={() => setIsSubmitModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">
              Submit
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Round</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Round 2 - Development</option>
              <option>Round 3 - Final Presentation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Submission Title</label>
            <input type="text" placeholder="e.g., Sprint 2 Features" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={3} placeholder="Describe your submission..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">PDF, ZIP, PNG, JPG up to 50MB</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Repository</label>
            <input type="url" placeholder="https://github.com/..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Demo Video URL</label>
            <input type="url" placeholder="https://youtube.com/..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

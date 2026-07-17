import { useState } from 'react';
import { Megaphone, Plus, Edit, Trash2, Pin, Paperclip } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  pinned: boolean;
  type: 'event' | 'update' | 'info' | 'deadline';
  attachments: number;
}

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Awards & Closing Ceremony', content: 'Join us for the official closing ceremony on March 28 at 6:00 PM.', author: 'Lisa Anderson', createdAt: '2026-03-19', pinned: true, type: 'event', attachments: 1 },
  { id: '2', title: 'Round 2 Deadline Extended', content: 'The Round 2 submission deadline has been extended by 48 hours to March 27.', author: 'Lisa Anderson', createdAt: '2026-03-18', pinned: true, type: 'deadline', attachments: 0 },
  { id: '3', title: 'New Workshop: Cloud Architecture', content: 'A free workshop on Cloud Architecture best practices on March 25.', author: 'Lisa Anderson', createdAt: '2026-03-17', pinned: false, type: 'event', attachments: 2 },
  { id: '4', title: 'Track Assignment Published', content: 'Team track assignments have been published.', author: 'Lisa Anderson', createdAt: '2026-03-15', pinned: false, type: 'update', attachments: 1 },
];

const typeConfig: Record<Announcement['type'], { label: string; variant: 'blue' | 'amber' | 'green' | 'red' }> = {
  event: { label: 'Event', variant: 'blue' },
  update: { label: 'Update', variant: 'green' },
  info: { label: 'Info', variant: 'amber' },
  deadline: { label: 'Deadline', variant: 'red' },
};

export default function CoordinatorAnnouncementsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const columns = [
    {
      key: 'title',
      label: 'Announcement',
      render: (a: Announcement) => (
        <div className="flex items-center gap-3">
          {a.pinned && <Pin className="w-4 h-4 text-blue-600" />}
          <div>
            <p className="font-medium text-gray-900">{a.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{a.content}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (a: Announcement) => <Badge variant={typeConfig[a.type].variant}>{typeConfig[a.type].label}</Badge>,
    },
    {
      key: 'attachments',
      label: 'Files',
      render: (a: Announcement) => (
        a.attachments > 0 ? (
          <span className="flex items-center gap-1 text-gray-600">
            <Paperclip className="w-3 h-3" />
            {a.attachments}
          </span>
        ) : <span className="text-gray-400">-</span>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (a: Announcement) => <span className="text-gray-600">{a.author}</span>,
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (a: Announcement) => <span className="text-gray-500">{a.createdAt}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:text-blue-600"><Pin className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
          <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Announcements"
      subtitle="Create and manage announcements"
      breadcrumbs={[{ label: 'Announcements' }]}
      actions={
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Announcement
        </button>
      }
    >
      <DataTable columns={columns} data={mockAnnouncements} keyExtractor={(a) => a.id} emptyMessage="No announcements" />

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create Announcement" size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Publish</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" placeholder="Announcement title" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
              <option>Event</option>
              <option>Update</option>
              <option>Info</option>
              <option>Deadline</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea rows={4} placeholder="Write your announcement..." className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click or drag to attach files</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="pin" className="w-4 h-4" />
            <label htmlFor="pin" className="text-sm text-gray-700">Pin to top</label>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}
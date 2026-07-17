import { useState } from 'react';
import { Megaphone, Search, Pin, Bell, Calendar } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  pinned: boolean;
  type: 'event' | 'update' | 'info' | 'deadline';
}

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Awards & Closing Ceremony', content: 'Join us for the official closing ceremony on March 28 at 6:00 PM in the Main Auditorium. All winners and participants are expected to attend.', author: 'Admin', createdAt: '2 hours ago', pinned: true, type: 'event' },
  { id: '2', title: 'Round 2 Deadline Extended', content: 'Due to multiple requests, the Round 2 submission deadline has been extended by 48 hours to March 27, 5:00 PM EST.', author: 'Admin', createdAt: '1 day ago', pinned: true, type: 'deadline' },
  { id: '3', title: 'New Evaluation Criteria Released', content: 'The judging panel has updated the evaluation criteria for Round 2. Please review the changes carefully.', author: 'Judge Panel', createdAt: '2 days ago', pinned: false, type: 'update' },
  { id: '4', title: 'Mentor Schedule Updated', content: 'Dr. Sarah Chen has updated her availability. New session slots are now open for booking.', author: 'Mentor', createdAt: '3 days ago', pinned: false, type: 'info' },
  { id: '5', title: 'Workshop: Cloud Architecture', content: 'A free workshop on Cloud Architecture best practices will be held on March 25 at 2:00 PM.', author: 'Coordinator', createdAt: '4 days ago', pinned: false, type: 'event' },
  { id: '6', title: 'WiFi Issues Resolved', content: 'The campus WiFi connectivity issues have been resolved. Service should be stable now.', author: 'IT Support', createdAt: '5 days ago', pinned: false, type: 'info' },
];

const typeStyle: Record<Announcement['type'], { bg: string; text: string; label: string; variant: 'blue' | 'amber' | 'green' | 'red' }> = {
  event: { bg: 'bg-purple-100', text: 'text-purple-600', label: 'Event', variant: 'blue' },
  update: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Update', variant: 'green' },
  info: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Info', variant: 'amber' },
  deadline: { bg: 'bg-red-100', text: 'text-red-600', label: 'Deadline', variant: 'red' },
};

export default function PdpAnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = mockAnnouncements
    .filter((a) => a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((a) => filterType === 'all' || a.type === filterType);

  return (
    <SharedLayout
      title="Announcements"
      subtitle="Browse and read all announcements"
      breadcrumbs={[{ label: 'Announcements' }]}
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search announcements..." className="max-w-md flex-1" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Types</option>
          <option value="event">Events</option>
          <option value="deadline">Deadlines</option>
          <option value="update">Updates</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Pinned */}
      {filtered.filter((a) => a.pinned).length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Pin className="w-4 h-4 text-blue-600" />
            Pinned
          </h3>
          <div className="space-y-3">
            {filtered.filter((a) => a.pinned).map((ann) => {
              const style = typeStyle[ann.type];
              return (
                <div key={ann.id} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Bell className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-bold text-gray-900">{ann.title}</h4>
                        <Badge variant={style.variant}>{style.label}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{ann.content}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                        <span>By {ann.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {ann.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Announcements */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">All Announcements</h3>
        <div className="space-y-3">
          {filtered.filter((a) => !a.pinned).map((ann) => {
            const style = typeStyle[ann.type];
            return (
              <div key={ann.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Bell className={`w-5 h-5 ${style.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="font-semibold text-gray-900">{ann.title}</h4>
                      <Badge variant={style.variant}>{style.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{ann.content}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>By {ann.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ann.createdAt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SharedLayout>
  );
}
import { useState } from 'react';
import { Bell, Pin, Clock, ChevronRight } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  pinned: boolean;
  type: 'info' | 'deadline' | 'update';
}

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Round 2 Deadline Extended', content: 'Due to technical difficulties, the Round 2 submission deadline has been extended by 48 hours. New deadline is March 27, 2024 at 5:00 PM EST.', author: 'Admin', createdAt: '2 hours ago', pinned: true, type: 'deadline' },
  { id: '2', title: 'New Mentor Session Slots Available', content: 'Additional mentor session slots have been added. Book now before they fill up!', author: 'Admin', createdAt: '1 day ago', pinned: false, type: 'update' },
  { id: '3', title: 'System Maintenance', content: 'The system will undergo maintenance on March 22 from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.', author: 'Admin', createdAt: '2 days ago', pinned: false, type: 'info' },
  { id: '4', title: 'Judging Criteria Updated', content: 'The judging criteria for Round 2 has been updated. Please review the new criteria.', author: 'Judge Panel', createdAt: '3 days ago', pinned: false, type: 'update' },
];

export default function StudentAnnouncementsPage() {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);

  const getTypeStyle = (type: Announcement['type']) => {
    switch (type) {
      case 'deadline': return { bg: 'bg-red-100', text: 'text-red-600', label: 'Deadline' };
      case 'update': return { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Update' };
      case 'info': return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Info' };
    }
  };

  return (
    <SharedLayout
      title="Announcements"
      subtitle="Stay updated with the latest news"
      breadcrumbs={[{ label: 'Announcements' }]}
    >
      {/* Pinned Announcement */}
      {announcements.filter((a) => a.pinned).map((ann) => (
        <div key={ann.id} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Pin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="blue">{ann.type === 'deadline' ? 'Pinned' : ann.type}</Badge>
                <span className="text-xs text-gray-400">{ann.createdAt}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{ann.title}</h3>
              <p className="text-gray-600">{ann.content}</p>
            </div>
          </div>
        </div>
      ))}

      {/* All Announcements */}
      <div className="space-y-4">
        {announcements.filter((a) => !a.pinned).map((ann) => {
          const style = getTypeStyle(ann.type);
          return (
            <div key={ann.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${style.bg} rounded-lg flex items-center justify-center`}>
                  <Bell className={`w-5 h-5 ${style.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${style.bg} ${style.text}`}>
                        {style.label}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ann.createdAt}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{ann.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SharedLayout>
  );
}

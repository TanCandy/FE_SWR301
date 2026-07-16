import { useState } from 'react';
import { Bell, Check, X, Calendar, MessageSquare, Users, Trophy, AlertCircle } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/Cards';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'deadline' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'deadline', title: 'Round 2 Submission Deadline', message: 'Your team has until Friday, 5:00 PM to submit deliverables for Round 2.', time: '2 hours ago', read: false },
  { id: '2', type: 'success', title: 'Mentor Session Confirmed', message: 'Dr. Sarah Chen confirmed your mentor session for tomorrow at 2:00 PM.', time: '5 hours ago', read: false },
  { id: '3', type: 'info', title: 'New Team Member', message: 'Taylor Kim accepted your invitation to join Quantum Coders.', time: 'Yesterday', read: true },
  { id: '4', type: 'message', title: 'Judge Feedback', message: 'Judge Michael Park commented on your project submission.', time: '2 days ago', read: true },
  { id: '5', type: 'success', title: 'Rank Update', message: 'Congratulations! Your team moved up to #3 in the leaderboard.', time: '3 days ago', read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline': return <Calendar className="w-5 h-5 text-red-500" />;
      case 'success': return <Check className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'deadline': return 'border-l-red-500';
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-amber-500';
      case 'message': return 'border-l-blue-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <SharedLayout
      title="Notifications"
      subtitle={`${unreadCount} unread notifications`}
      breadcrumbs={[{ label: 'Notifications' }]}
      actions={
        unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Mark all as read
          </button>
        )
      }
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-4 text-sm font-medium transition-colors ${
              filter === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-4 text-sm font-medium transition-colors flex items-center gap-2 ${
              filter === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-50">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              icon={<Bell className="w-8 h-8 text-gray-400" />}
              title="No notifications"
              description={filter === 'unread' ? "You've read all your notifications" : "You're all caught up!"}
            />
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getBorderColor(notification.type)} ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'deadline' ? 'bg-red-100' :
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-amber-100' :
                    'bg-blue-100'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    {!notification.read && (
                      <span className="inline-block mt-2 text-xs text-blue-600 font-medium">New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SharedLayout>
  );
}

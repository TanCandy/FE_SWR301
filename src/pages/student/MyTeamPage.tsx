import { useState } from 'react';
import { Users, Crown, MessageSquare, Settings, UserPlus, Copy } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'online' | 'away' | 'offline';
}

const mockMembers: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', role: 'Team Leader', status: 'online' },
  { id: '2', name: 'Jamie Rodriguez', email: 'jamie@email.com', role: 'Developer', status: 'online' },
  { id: '3', name: 'Chris Lee', email: 'chris@email.com', role: 'Designer', status: 'away' },
  { id: '4', name: 'Taylor Kim', email: 'taylor@email.com', role: 'Data Scientist', status: 'offline' },
  { id: '5', name: 'Jordan Patel', email: 'jordan@email.com', role: 'Developer', status: 'online' },
];

export default function StudentMyTeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <SharedLayout
      title="My Team"
      subtitle="Manage your team and collaborate"
      breadcrumbs={[{ label: 'My Team' }]}
      actions={
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Invite
        </button>
      }
    >
      {/* Team Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quantum Coders</h2>
              <p className="text-blue-100">AI/ML Track • Ranked #3</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-blue-200">Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">8.5</p>
              <p className="text-sm text-blue-200">Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Link */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Invite Link</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value="https://seal.hackathon/join/abc123"
            readOnly
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600"
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <MessageSquare className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar name={member.name} size="lg" />
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  member.status === 'online' ? 'bg-green-500' :
                  member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  {member.role === 'Team Leader' && <Crown className="w-4 h-4 text-amber-500" />}
                </div>
                <p className="text-sm text-gray-500">{member.email}</p>
                <Badge variant={member.role === 'Team Leader' ? 'amber' : 'blue'} className="mt-2">
                  {member.role}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                Message
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Send Invite</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="Enter email" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
              <option>Developer</option>
              <option>Designer</option>
              <option>Data Scientist</option>
            </select>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

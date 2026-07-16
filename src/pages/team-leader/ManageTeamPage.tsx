import { useState } from 'react';
import { Users, Plus, Mail, MoreVertical, UserPlus, UserMinus, Crown, Clock } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar, EmptyState } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'active' | 'pending';
  joinedAt: string;
}

const mockMembers: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', role: 'Team Leader', status: 'active', joinedAt: 'Mar 1, 2024' },
  { id: '2', name: 'Jamie Rodriguez', email: 'jamie@email.com', role: 'Developer', status: 'active', joinedAt: 'Mar 1, 2024' },
  { id: '3', name: 'Chris Lee', email: 'chris@email.com', role: 'Designer', status: 'active', joinedAt: 'Mar 3, 2024' },
  { id: '4', name: 'Taylor Kim', email: 'taylor@email.com', role: 'Data Scientist', status: 'active', joinedAt: 'Mar 5, 2024' },
  { id: '5', name: 'Jordan Patel', email: 'jordan@email.com', role: 'Developer', status: 'pending', joinedAt: 'Waiting...' },
];

export default function ManageTeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [members] = useState<TeamMember[]>(mockMembers);

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'Member',
      render: (member: TeamMember) => (
        <div className="flex items-center gap-3">
          <Avatar name={member.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{member.name}</p>
            <p className="text-xs text-gray-500">{member.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (member: TeamMember) => (
        <div className="flex items-center gap-2">
          {member.role === 'Team Leader' && <Crown className="w-4 h-4 text-amber-500" />}
          <span className={member.role === 'Team Leader' ? 'font-semibold text-gray-900' : 'text-gray-600'}>
            {member.role}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (member: TeamMember) => (
        <Badge variant={member.status === 'active' ? 'green' : 'amber'}>
          {member.status === 'active' ? 'Active' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      render: (member: TeamMember) => (
        <span className="text-gray-500">{member.joinedAt}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (member: TeamMember) => (
        member.role !== 'Team Leader' && (
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
            <UserMinus className="w-4 h-4" />
          </button>
        )
      ),
    },
  ];

  return (
    <SharedLayout
      title="Manage Team"
      subtitle="Manage your team members and invitations"
      breadcrumbs={[{ label: 'Manage Team' }]}
      actions={
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      }
    >
      {/* Team Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quantum Coders</h2>
              <p className="text-gray-500">5 members • Ranked #3</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">1</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search members..."
          className="max-w-md"
        />
      </div>

      {/* Members Table */}
      <DataTable
        columns={columns}
        data={filteredMembers}
        keyExtractor={(m) => m.id}
        emptyMessage="No team members found"
      />

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
        footer={
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsInviteModalOpen(false);
                setInviteEmail('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Send Invite
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email to invite"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Developer</option>
              <option>Designer</option>
              <option>Data Scientist</option>
              <option>Project Manager</option>
            </select>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

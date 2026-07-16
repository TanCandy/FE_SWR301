import { useState } from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical, Edit, Trash2, Key, Shield } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'team_leader' | 'mentor' | 'student' | 'judge' | 'administrator';
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', role: 'team_leader', status: 'active', createdAt: '2024-03-01' },
  { id: '2', name: 'Dr. Sarah Chen', email: 'sarah@email.com', role: 'mentor', status: 'active', createdAt: '2024-03-01' },
  { id: '3', name: 'Jamie Rodriguez', email: 'jamie@email.com', role: 'student', status: 'active', createdAt: '2024-03-02' },
  { id: '4', name: 'Michael Park', email: 'michael@email.com', role: 'judge', status: 'active', createdAt: '2024-03-03' },
  { id: '5', name: 'Emily Watson', email: 'emily@email.com', role: 'administrator', status: 'active', createdAt: '2024-03-01' },
  { id: '6', name: 'Chris Lee', email: 'chris@email.com', role: 'student', status: 'inactive', createdAt: '2024-03-04' },
];

const roleColors = {
  team_leader: 'bg-blue-100 text-blue-700',
  mentor: 'bg-purple-100 text-purple-700',
  student: 'bg-green-100 text-green-700',
  judge: 'bg-amber-100 text-amber-700',
  administrator: 'bg-red-100 text-red-700',
};

export default function AdminManageUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      label: 'User',
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.name} role={user.role} size="sm" />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (user: User) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
          {user.role.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: User) => (
        <Badge variant={user.status === 'active' ? 'green' : 'gray'}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (user: User) => <span className="text-gray-500">{user.createdAt}</span>,
    },
    {
      key: 'actions',
      label: '',
      render: () => (
        <div className="flex gap-1">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
            <Key className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <SharedLayout
      title="Manage Users"
      subtitle="Manage system users and roles"
      breadcrumbs={[{ label: 'Manage Users' }]}
      actions={
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      }
    >
      <div className="flex gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search users..." className="max-w-md" />
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <option>All Roles</option>
          <option>Team Leader</option>
          <option>Mentor</option>
          <option>Student</option>
          <option>Judge</option>
          <option>Administrator</option>
        </select>
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <DataTable columns={columns} data={filteredUsers} keyExtractor={(u) => u.id} emptyMessage="No users found" />

      <div className="mt-6 flex justify-center">
        <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add User</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input type="text" placeholder="Enter full name" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" placeholder="Enter email" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
              <option>Student</option>
              <option>Team Leader</option>
              <option>Mentor</option>
              <option>Judge</option>
              <option>Administrator</option>
            </select>
          </div>
        </div>
      </Modal>
    </SharedLayout>
  );
}

import { useState } from 'react';
import { Users, TrendingUp, Clock, Calendar, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';

interface Team {
  id: string;
  name: string;
  track: string;
  progress: number;
  lastUpdate: string;
  members: number;
}

const mockTeams: Team[] = [
  { id: '1', name: 'Quantum Coders', track: 'AI/ML', progress: 75, lastUpdate: '2 hours ago', members: 5 },
  { id: '2', name: 'Cloud Innovators', track: 'Cloud', progress: 60, lastUpdate: '5 hours ago', members: 4 },
  { id: '3', name: 'Data Wizards', track: 'Data Science', progress: 85, lastUpdate: '1 day ago', members: 3 },
  { id: '4', name: 'Health Tech Heroes', track: 'HealthTech', progress: 45, lastUpdate: '3 days ago', members: 5 },
];

export default function MentorAssignedTeamsPage() {
  return (
    <SharedLayout
      title="Assigned Teams"
      subtitle="View and manage your assigned teams"
      breadcrumbs={[{ label: 'Assigned Teams' }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Assigned Teams" value="6" icon={<Users className="w-6 h-6" />} color="blue" trend="+2 this month" trendUp />
        <StatCard title="Avg Progress" value="68%" icon={<TrendingUp className="w-6 h-6" />} color="green" trend="+5%" trendUp />
        <StatCard title="Sessions Done" value="12" icon={<Calendar className="w-6 h-6" />} color="purple" />
        <StatCard title="Pending Reviews" value="3" icon={<Clock className="w-6 h-6" />} color="amber" />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{team.name}</h3>
                <Badge variant="blue" className="mt-1">{team.track}</Badge>
              </div>
              <span className="text-lg font-bold text-blue-600">{team.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${team.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {team.members} members
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {team.lastUpdate}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                View Details
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Leave Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </SharedLayout>
  );
}

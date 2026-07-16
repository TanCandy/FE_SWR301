import { useState } from 'react';
import { Folder, Clock, Star, CheckCircle, FileSearch } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';

interface Project {
  id: string;
  name: string;
  team: string;
  track: string;
  submittedAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  score?: number;
}

const mockProjects: Project[] = [
  { id: '1', name: 'Quantum Analytics', team: 'Data Masters', track: 'AI/ML', submittedAt: '2 days ago', status: 'in_progress' },
  { id: '2', name: 'Health Tracker Pro', team: 'Wellness Warriors', track: 'HealthTech', submittedAt: '3 days ago', status: 'pending' },
  { id: '3', name: 'FinTech Connect', team: 'Money Makers', track: 'FinTech', submittedAt: '1 day ago', status: 'pending' },
  { id: '4', name: 'EduLearn Platform', team: 'LearnHub', track: 'EdTech', submittedAt: '5 days ago', status: 'completed', score: 8.5 },
];

export default function JudgeAssignedProjectsPage() {
  return (
    <SharedLayout
      title="Assigned Projects"
      subtitle="Projects assigned for evaluation"
      breadcrumbs={[{ label: 'Assigned Projects' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Assigned" value="12" icon={<Folder className="w-6 h-6" />} color="blue" />
        <StatCard title="Pending Reviews" value="4" icon={<Clock className="w-6 h-6" />} color="amber" />
        <StatCard title="Completed" value="8" icon={<CheckCircle className="w-6 h-6" />} color="green" />
        <StatCard title="Avg Score Given" value="8.4" icon={<Star className="w-6 h-6" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.team} • {project.track}</p>
              </div>
              <Badge variant={project.status === 'completed' ? 'green' : project.status === 'in_progress' ? 'blue' : 'amber'}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {project.submittedAt}
              </span>
            </div>
            {project.score && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">Score Given</span>
                <span className="text-2xl font-bold text-blue-600">{project.score}</span>
              </div>
            )}
            <button className={`w-full py-2 rounded-xl font-medium mt-4 transition-colors ${
              project.status === 'completed'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}>
              {project.status === 'completed' ? 'View Score' : 'Start Review'}
            </button>
          </div>
        ))}
      </div>
    </SharedLayout>
  );
}

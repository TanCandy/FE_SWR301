import { useState } from 'react';
import { BarChart3, Download, FileText, Filter, Calendar } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import StatCard from '../../components/ui/StatCard';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';

export default function AdminReportsPage() {
  return (
    <SharedLayout
      title="Reports"
      subtitle="View analytics and export data"
      breadcrumbs={[{ label: 'Reports' }]}
      actions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Participants" value="2,500+" icon={<Avatar name="Users" size="sm" />} color="blue" />
        <StatCard title="Completion Rate" value="85%" icon={<BarChart3 className="w-6 h-6" />} color="green" trend="+5%" trendUp />
        <StatCard title="Avg Score" value="7.8" icon={<BarChart3 className="w-6 h-6" />} color="purple" />
        <StatCard title="Total Submissions" value="456" icon={<FileText className="w-6 h-6" />} color="amber" />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Participants by Track</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Submissions Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Chart visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Teams */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Top Performing Teams</h3>
        <div className="space-y-4">
          {[
            { name: 'Code Warriors', track: 'AI/ML', score: 9.2, trend: '+0.5' },
            { name: 'Data Dragons', track: 'Data Science', score: 9.0, trend: '+0.3' },
            { name: 'Quantum Coders', track: 'AI/ML', score: 8.5, trend: '+0.2' },
          ].map((team, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-300">#{idx + 1}</span>
                <Avatar name={team.name} size="md" />
                <div>
                  <p className="font-medium text-gray-900">{team.name}</p>
                  <Badge variant="blue">{team.track}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{team.score}</p>
                <p className="text-sm text-green-600">{team.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}

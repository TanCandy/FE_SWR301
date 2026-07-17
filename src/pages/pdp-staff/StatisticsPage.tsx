import { useState } from 'react';
import { Calendar, Users, Trophy, Activity, Download, FileText, BarChart3 } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import StatCard from '../../components/ui/StatCard';

export default function PdpStatisticsPage() {
  return (
    <SharedLayout
      title="Hackathon Statistics"
      subtitle="Overall performance and engagement metrics"
      breadcrumbs={[{ label: 'Hackathon Statistics' }]}
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
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Events" value="8" icon={<Calendar className="w-6 h-6" />} color="blue" trend="+1 this year" trendUp />
        <StatCard title="Total Participants" value="1,840" icon={<Users className="w-6 h-6" />} color="green" trend="+24%" trendUp />
        <StatCard title="Total Teams" value="320" icon={<Trophy className="w-6 h-6" />} color="purple" trend="+18%" trendUp />
        <StatCard title="Avg Satisfaction" value="4.7" icon={<Activity className="w-6 h-6" />} color="amber" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Participants Over Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Participants per Event</h3>
              <p className="text-xs text-gray-500 mt-0.5">Last 8 events</p>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48 px-2">
            {[180, 220, 195, 250, 280, 245, 310, 290].map((count, idx) => {
              const percent = (count / 320) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">{count}</span>
                  <div className="w-full flex-1 bg-gray-100 rounded-lg relative overflow-hidden flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg transition-all duration-700"
                      style={{ height: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">E{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Score Distribution</h3>
              <p className="text-xs text-gray-500 mt-0.5">Current round</p>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            {[
              { range: '90 - 100', count: 12, color: 'bg-green-500' },
              { range: '80 - 89', count: 28, color: 'bg-blue-500' },
              { range: '70 - 79', count: 45, color: 'bg-amber-500' },
              { range: '60 - 69', count: 32, color: 'bg-orange-500' },
              { range: '< 60', count: 25, color: 'bg-red-500' },
            ].map((item, idx) => {
              const max = 50;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.range}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count} teams</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Track Popularity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-1">Track Popularity</h3>
          <p className="text-xs text-gray-500 mb-4">Number of teams per track</p>
          <div className="space-y-3">
            {[
              { name: 'AI/ML', count: 68, color: 'bg-blue-500' },
              { name: 'FinTech', count: 52, color: 'bg-green-500' },
              { name: 'HealthTech', count: 45, color: 'bg-purple-500' },
              { name: 'EdTech', count: 38, color: 'bg-amber-500' },
              { name: 'Cloud', count: 35, color: 'bg-pink-500' },
              { name: 'IoT', count: 28, color: 'bg-indigo-500' },
            ].map((track, idx) => {
              const max = 70;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{track.name}</span>
                    <span className="text-sm font-bold text-gray-900">{track.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${track.color}`}
                      style={{ width: `${(track.count / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-1">Key Metrics</h3>
          <p className="text-xs text-gray-500 mb-4">Hackathon-wide statistics</p>
          <div className="space-y-4">
            {[
              { label: 'Submission Rate', value: 91, color: 'blue', suffix: '%' },
              { label: 'On-time Submissions', value: 87, color: 'green', suffix: '%' },
              { label: 'Team Completion', value: 84, color: 'purple', suffix: '%' },
              { label: 'Mentor Engagement', value: 78, color: 'amber', suffix: '%' },
            ].map((metric, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                purple: 'bg-purple-500',
                amber: 'bg-amber-500',
              };
              return (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">{metric.label}</span>
                    <span className="text-xl font-bold text-gray-900">
                      {metric.value}
                      {metric.suffix}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${colorMap[metric.color]}`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
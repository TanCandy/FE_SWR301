/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Judge, Project } from '../types';
import {
  Users,
  TrendingUp,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
  CheckCircle,
} from 'lucide-react';

interface JudgeWorkloadScreenProps {
  judges: Judge[];
  projects: Project[];
  searchTerm: string;
  onOpenReassign: (judge: Judge) => void;
  onQuickReassign: () => void;
  onInviteJudge: () => void;
  onExportReport: () => void;
}

export default function JudgeWorkloadScreen({
  judges,
  projects,
  searchTerm,
  onOpenReassign,
  onQuickReassign,
  onInviteJudge,
  onExportReport,
}: JudgeWorkloadScreenProps) {
  // Local Filter state
  const [capacityFilter, setCapacityFilter] = useState<'all' | 'under' | 'over'>('all');
  const [expertiseFilter, setExpertiseFilter] = useState<string>('All Specializations');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Calculate stats dynamically
  const totalJudges = judges.length;
  const totalAssigned = judges.reduce((acc, j) => acc + j.assignedProjectsCount, 0);
  const totalCompleted = judges.reduce((acc, j) => acc + j.completedEvaluations, 0);
  const avgProgress = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;
  const pendingReviews = totalAssigned - totalCompleted;
  const bottleneckCount = judges.filter((j) => j.isOverCapacity || j.assignedProjectsCount > 12).length;

  // Filter judges list
  const filteredJudges = judges.filter((judge) => {
    // Search filter (name or organization)
    const matchesSearch =
      judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judge.organization.toLowerCase().includes(searchTerm.toLowerCase());

    // Capacity filter
    // Under capacity: assignedProjectsCount <= 12
    // Over capacity: assignedProjectsCount > 12
    const matchesCapacity =
      capacityFilter === 'all' ||
      (capacityFilter === 'under' && judge.assignedProjectsCount <= 12) ||
      (capacityFilter === 'over' && judge.assignedProjectsCount > 12);

    // Expertise filter
    const matchesExpertise =
      expertiseFilter === 'All Specializations' || judge.expertise === expertiseFilter;

    return matchesSearch && matchesCapacity && matchesExpertise;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredJudges.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJudges = filteredJudges.slice(startIndex, startIndex + itemsPerPage);

  // Helper to get status color for expertise badges
  const getExpertiseBadgeStyles = (expertise: string) => {
    switch (expertise) {
      case 'AI/ML':
        return 'bg-[#a3f69c] text-[#002204]';
      case 'FinTech':
        return 'bg-[#ffdbcb] text-[#341100]';
      case 'UI/UX Design':
        return 'bg-[#c1c6d4]/40 text-[#414752]';
      case 'HealthTech':
        return 'bg-[#BBDEFB]/40 text-[#0D47A1]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper to get evaluation progress bar color
  const getProgressBarColor = (completed: number, total: number) => {
    const ratio = total > 0 ? completed / total : 0;
    if (ratio >= 0.8) return 'bg-[#005dac]'; // blue
    if (ratio >= 0.4) return 'bg-[#F57C00]'; // orange/warning
    return 'bg-[#D32F2F]'; // red/error
  };

  const getProgressTextColor = (completed: number, total: number) => {
    const ratio = total > 0 ? completed / total : 0;
    if (ratio < 0.25) return 'text-[#D32F2F] font-bold';
    return 'text-[#1b1c1c]';
  };

  return (
    <div className="space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#1b1c1c] tracking-tight mb-1">
            Judge Workload &amp; Tracking
          </h1>
          <p className="text-base text-[#414752]">
            Monitor evaluation progress, identifying bottlenecks, and manage judge assignments in real-time.
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onExportReport}
            className="flex items-center gap-1.5 border border-[#005dac] text-[#005dac] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#BBDEFB]/10 transition-all cursor-pointer text-sm"
          >
            <Clock className="w-4.5 h-4.5" />
            Export Report
          </button>
          <button
            onClick={onInviteJudge}
            className="flex items-center gap-1.5 bg-[#005dac] text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-[#0D47A1] transition-all cursor-pointer text-sm"
          >
            <Users className="w-4.5 h-4.5" />
            Invite Judge
          </button>
        </div>
      </div>

      {/* Bento Grid Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Judges */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Total Active Judges</span>
            <Users className="text-[#005dac] w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-[#1b1c1c]">{totalJudges}</div>
          <div className="text-xs text-[#196b22] mt-1.5 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            +3 this session
          </div>
        </div>

        {/* Avg Progress */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Avg. Progress</span>
            <TrendingUp className="text-[#F57C00] w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-[#1b1c1c]">{avgProgress}%</div>
          <div className="w-full bg-[#eae7e7] h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#F57C00] h-full transition-all duration-500" style={{ width: `${avgProgress}%` }}></div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Pending Reviews</span>
            <Clock className="text-[#005dac] w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-[#1b1c1c]">{pendingReviews}</div>
          <div className="text-xs text-[#414752] mt-1.5 font-medium">Across {projects.length} projects</div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Bottlenecks</span>
            <AlertTriangle className="text-[#D32F2F] w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-[#D32F2F]">{bottleneckCount}</div>
          <div className="text-xs text-[#D32F2F] mt-1.5 font-semibold">
            Judges over capacity
          </div>
        </div>
      </div>

      {/* Main Data Table Section */}
      <div className="bg-white rounded-xl border border-[#c1c6d4]/20 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-5 border-b border-[#c1c6d4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-[#eae7e7] p-1 rounded-lg flex gap-1">
              <button
                onClick={() => {
                  setCapacityFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  capacityFilter === 'all' ? 'bg-white text-[#1b1c1c] shadow-sm' : 'text-[#414752] hover:bg-[#e5e2e1]'
                }`}
              >
                All Judges
              </button>
              <button
                onClick={() => {
                  setCapacityFilter('under');
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  capacityFilter === 'under' ? 'bg-white text-[#1b1c1c] shadow-sm' : 'text-[#414752] hover:bg-[#e5e2e1]'
                }`}
              >
                Under-capacity
              </button>
              <button
                onClick={() => {
                  setCapacityFilter('over');
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  capacityFilter === 'over' ? 'bg-white text-[#1b1c1c] shadow-sm' : 'text-[#414752] hover:bg-[#e5e2e1]'
                }`}
              >
                Over-capacity
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#414752]">Filter by Expertise:</span>
            <select
              value={expertiseFilter}
              onChange={(e) => {
                setExpertiseFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#f6f3f2] border-none rounded-lg text-xs font-bold focus:ring-[#005dac] py-1.5 px-3 text-[#1b1c1c] outline-none cursor-pointer"
            >
              <option value="All Specializations">All Specializations</option>
              <option value="AI/ML">AI/ML</option>
              <option value="FinTech">FinTech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>
        </div>

        {/* Judges Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] text-xs font-semibold text-[#414752] uppercase tracking-wider border-b border-[#c1c6d4]/20">
                <th className="px-6 py-4 font-semibold">Judge Name</th>
                <th className="px-6 py-4 font-semibold">Expertise</th>
                <th className="px-6 py-4 font-semibold text-center">Assigned Projects</th>
                <th className="px-6 py-4 font-semibold">Completed Evaluations</th>
                <th className="px-6 py-4 font-semibold text-center">Avg. Score Given</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c1c6d4]/15">
              {paginatedJudges.length > 0 ? (
                paginatedJudges.map((judge) => {
                  const isOver = judge.assignedProjectsCount > 12;
                  return (
                    <tr key={judge.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {judge.avatarUrl ? (
                            <img
                              className="w-10 h-10 rounded-full object-cover border border-[#c1c6d4]/20"
                              alt={judge.name}
                              referrerPolicy="no-referrer"
                              src={judge.avatarUrl}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#d4e3ff] flex items-center justify-center text-[#001c3a] font-bold text-sm">
                              {judge.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-[#1b1c1c]">{judge.name}</div>
                            <div className="text-xs text-[#414752] font-medium">{judge.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${getExpertiseBadgeStyles(judge.expertise)}`}>
                          {judge.expertise}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1 justify-center">
                          <span className={`text-sm font-bold ${isOver ? 'text-[#D32F2F]' : 'text-[#1b1c1c]'}`}>
                            {judge.assignedProjectsCount}
                          </span>
                          {isOver && (
                            <TrendingUp className="text-[#D32F2F] w-4 h-4" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[#eae7e7] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressBarColor(
                                judge.completedEvaluations,
                                judge.assignedProjectsCount
                              )}`}
                              style={{
                                width: `${
                                  judge.assignedProjectsCount > 0
                                    ? (judge.completedEvaluations / judge.assignedProjectsCount) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className={`text-xs ${getProgressTextColor(judge.completedEvaluations, judge.assignedProjectsCount)}`}>
                            {judge.completedEvaluations}/{judge.assignedProjectsCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-semibold text-[#1b1c1c]">{judge.avgScoreGiven.toFixed(1)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {judge.completedEvaluations === judge.assignedProjectsCount ? (
                          <button
                            onClick={() => onOpenReassign(judge)}
                            className="text-[#005dac] hover:bg-[#BBDEFB]/20 p-2 rounded-lg transition-all cursor-pointer"
                            title="Rebalance assignments"
                          >
                            <ArrowLeftRight className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenReassign(judge)}
                            className="bg-[#005dac]/5 text-[#005dac] hover:bg-[#005dac]/10 px-3.5 py-1.5 rounded-lg transition-all font-bold text-xs cursor-pointer"
                          >
                            Reassign
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#414752] font-medium text-sm">
                    No judges found matching search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-5 bg-gray-50/50 border-t border-[#c1c6d4]/20 flex items-center justify-between">
          <span className="text-xs text-[#414752] font-semibold">
            Showing {filteredJudges.length > 0 ? startIndex + 1 : 0} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredJudges.length)} of {filteredJudges.length} judges
          </span>
          <div className="flex gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border border-[#c1c6d4]/20 hover:bg-[#eae7e7] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="w-5 h-5 text-[#1b1c1c]" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#005dac] text-white shadow-sm'
                    : 'border border-[#c1c6d4]/20 text-[#1b1c1c] hover:bg-[#eae7e7]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border border-[#c1c6d4]/20 hover:bg-[#eae7e7] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronRight className="w-5 h-5 text-[#1b1c1c]" />
            </button>
          </div>
        </div>
      </div>

      {/* Capacity Alert Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Critical Bottleneck Panel */}
        <div className="bg-red-50 border border-red-200 p-5 rounded-xl flex gap-4 items-start shadow-sm">
          <span className="material-symbols-outlined text-[#D32F2F] p-2 bg-[#D32F2F]/10 rounded-lg flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#93000a] mb-1">
              Critical Bottleneck Identified
            </h3>
            <p className="text-xs text-[#414752] leading-relaxed mb-4">
              Sarah Jenkins has completed less than 25% of assigned evaluations with 4 hours remaining. System suggests reassigning 5 projects to Dr. Elena Rodriguez who is currently at capacity zero.
            </p>
            <button
              onClick={onQuickReassign}
              className="bg-[#D32F2F] text-white px-5 py-2.5 rounded-lg font-bold text-xs hover:bg-[#93000a] transition-all cursor-pointer shadow-sm active:translate-y-0.5"
            >
              Quick Reassign
            </button>
          </div>
        </div>

        {/* Efficiency High Panel */}
        <div className="bg-[#196b22]/5 border border-[#196b22]/20 p-5 rounded-xl flex gap-4 items-start shadow-sm">
          <span className="text-[#196b22] p-2 bg-[#196b22]/10 rounded-lg flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#196b22] mb-1">
              Judging Efficiency High
            </h3>
            <p className="text-xs text-[#414752] leading-relaxed">
              The AI/ML track is moving 20% faster than average. Consider allocating additional edge-case projects to this pool of judges to maintain momentum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

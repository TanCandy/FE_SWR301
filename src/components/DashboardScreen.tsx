/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Judge, Project } from '../types';
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Layers,
} from 'lucide-react';

interface DashboardScreenProps {
  judges: Judge[];
  projects: Project[];
  activityLog: string[];
  onNavigateToTab: (tab: 'dashboard' | 'judges' | 'projects' | 'assignments' | 'settings') => void;
}

export default function DashboardScreen({
  judges,
  projects,
  activityLog,
  onNavigateToTab,
}: DashboardScreenProps) {
  // Aggregate data
  const totalProjectsCount = projects.length;
  const completedProjectsCount = projects.filter((p) => p.evaluationStatus === 'Completed').length;
  const inProgressProjectsCount = projects.filter((p) => p.evaluationStatus === 'In Progress').length;
  const pendingProjectsCount = projects.filter((p) => p.evaluationStatus === 'Pending').length;

  const totalEvaluations = judges.reduce((acc, j) => acc + j.assignedProjectsCount, 0);
  const completedEvaluations = judges.reduce((acc, j) => acc + j.completedEvaluations, 0);
  const evaluationCompletionRate = totalEvaluations > 0 ? Math.round((completedEvaluations / totalEvaluations) * 100) : 0;

  // Track counts
  const tracks = ['AI/ML', 'FinTech', 'HealthTech', 'UI/UX Design'] as const;
  const trackMetrics = tracks.map((track) => {
    const trackProjects = projects.filter((p) => p.track === track);
    const completed = trackProjects.filter((p) => p.evaluationStatus === 'Completed').length;
    const total = trackProjects.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { track, completed, total, pct };
  });

  // Average score given across evaluated projects
  const evaluatedScores = projects.filter((p) => p.score !== undefined).map((p) => p.score as number);
  const avgScore =
    evaluatedScores.length > 0
      ? (evaluatedScores.reduce((acc, s) => acc + s, 0) / evaluatedScores.length).toFixed(1)
      : 'N/A';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#005dac] text-white p-6 rounded-2xl relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-bold mb-2">Agile Nexus Control Panel</h1>
          <p className="text-sm text-[#BBDEFB] leading-relaxed">
            Welcome to the SEAL Hackathon core administrative interface. Track evaluation rates across major development tracks, resolve judge load bottlenecks, and export finalized scoring registers.
          </p>
        </div>
        <div className="absolute right-6 bottom-0 top-0 w-1/3 hidden md:flex items-center justify-end opacity-10 pointer-events-none">
          <Award className="w-48 h-48" />
        </div>
      </div>

      {/* Metric Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Total Submissions</span>
            <BookOpen className="text-[#005dac] w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-[#1b1c1c]">{totalProjectsCount}</div>
          <p className="text-xs text-[#414752] mt-1.5 font-medium">
            Active hackathon team entries
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Evaluation Completion</span>
            <CheckCircle className="text-[#196b22] w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-[#1b1c1c]">{evaluationCompletionRate}%</div>
          <p className="text-xs text-[#196b22] mt-1.5 font-semibold">
            {completedEvaluations} of {totalEvaluations} reviews submitted
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Active Judges</span>
            <Layers className="text-[#F57C00] w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-[#1b1c1c]">{judges.length}</div>
          <p className="text-xs text-[#F57C00] mt-1.5 font-semibold">
            Across 4 specializations
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#414752] uppercase tracking-wider">Average Score</span>
            <TrendingUp className="text-[#005dac] w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-[#1b1c1c]">{avgScore}</div>
          <p className="text-xs text-[#414752] mt-1.5 font-medium">
            Scale of 1.0 - 10.0 points
          </p>
        </div>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Track Completion Chart (Horizontal Bar Visualizer) */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-bold text-[#1b1c1c]">Track Progress Tracker</h3>
            <span className="text-xs text-[#414752] font-semibold uppercase">Real-Time Data</span>
          </div>
          <div className="space-y-5">
            {trackMetrics.map((t) => {
              // Custom color themes
              let trackColor = 'bg-[#005dac]';
              let trackBg = 'bg-blue-50';
              if (t.track === 'AI/ML') {
                trackColor = 'bg-[#196b22]';
                trackBg = 'bg-emerald-50';
              } else if (t.track === 'FinTech') {
                trackColor = 'bg-[#9f4200]';
                trackBg = 'bg-orange-50';
              } else if (t.track === 'HealthTech') {
                trackColor = 'bg-[#005dac]';
                trackBg = 'bg-sky-50';
              } else {
                trackColor = 'bg-[#414752]';
                trackBg = 'bg-gray-100';
              }

              return (
                <div key={t.track} className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-sm font-bold text-[#1b1c1c]">{t.track}</span>
                      <span className="text-xs text-[#414752] ml-2">({t.completed}/{t.total} Evaluated)</span>
                    </div>
                    <span className="text-xs font-bold text-[#1b1c1c]">{t.pct}%</span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${trackBg}`}>
                    <div
                      className={`h-full ${trackColor} transition-all duration-500`}
                      style={{ width: `${t.pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2 text-xs">
            <button
              onClick={() => onNavigateToTab('projects')}
              className="text-[#005dac] font-bold hover:underline cursor-pointer"
            >
              View detailed project listings &rarr;
            </button>
          </div>
        </div>

        {/* Live Admin Audit & Activity Logs */}
        <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2.5">
              <Activity className="text-[#005dac] w-5 h-5" />
              <h3 className="text-base font-bold text-[#1b1c1c]">Audit Timeline</h3>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {activityLog.length > 0 ? (
                activityLog.map((log, index) => (
                  <div key={index} className="flex gap-3 items-start text-xs text-[#1b1c1c] leading-relaxed">
                    <span className="w-2.5 h-2.5 bg-[#1976d2] rounded-full shrink-0 mt-1 shadow-sm shadow-blue-200"></span>
                    <p className="font-medium text-gray-700">{log}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#414752] text-xs font-medium italic">
                  No system actions recorded yet in this session.
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-[11px] text-[#414752] font-semibold uppercase tracking-wider text-center">
              Logged in as Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      <div className="bg-[#eae7e7]/30 border border-[#c1c6d4]/30 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 items-start">
          <Clock className="text-[#005dac] w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-[#1b1c1c]">Pending Workload Balancing Recommended</h4>
            <p className="text-xs text-[#414752] leading-relaxed mt-0.5">
              Several judges have exceeded 15 assigned projects due to recent registrations. Navigate to the Judges tab to distribute excess evaluations to high-capacity peers.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateToTab('judges')}
          className="bg-[#005dac] hover:bg-[#0D47A1] text-white px-5 py-2 rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          Manage Workloads
        </button>
      </div>
    </div>
  );
}

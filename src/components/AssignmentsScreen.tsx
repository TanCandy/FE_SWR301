/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Judge, Project } from '../types';
import { ShieldCheck, Scale, CircleAlert, CheckCircle, RefreshCw } from 'lucide-react';

interface AssignmentsScreenProps {
  judges: Judge[];
  projects: Project[];
  onAutoBalance: () => void;
  onOpenReassign: (judge: Judge) => void;
}

export default function AssignmentsScreen({
  judges,
  projects,
  onAutoBalance,
  onOpenReassign,
}: AssignmentsScreenProps) {
  // Sort judges into workload categories
  const highWorkloadJudges = judges.filter((j) => j.assignedProjectsCount > 12);
  const moderateWorkloadJudges = judges.filter((j) => j.assignedProjectsCount >= 8 && j.assignedProjectsCount <= 12);
  const lightWorkloadJudges = judges.filter((j) => j.assignedProjectsCount < 8);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#1b1c1c] tracking-tight mb-1">
            Workload Balancing Board
          </h1>
          <p className="text-base text-[#414752]">
            Distribute evaluations evenly to prevent reviewer fatigue and ensure quick feedback turnaround.
          </p>
        </div>
        <button
          onClick={onAutoBalance}
          className="flex items-center gap-1.5 bg-[#005dac] text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-[#0D47A1] transition-all cursor-pointer text-sm flex items-center gap-1 shadow-md hover:scale-[1.02] active:scale-95 duration-100"
        >
          <Scale className="w-4.5 h-4.5" />
          Auto Balance Workloads
        </button>
      </div>

      {/* Balancing Summary Alert */}
      {highWorkloadJudges.length > 0 ? (
        <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl flex gap-4 items-start shadow-sm">
          <CircleAlert className="text-[#F57C00] w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#7a3000] mb-0.5">
              Workload Imbalance Detected
            </h3>
            <p className="text-xs text-[#414752] leading-relaxed">
              {highWorkloadJudges.length} judge(s) are currently over-allocated (assigned more than 12 projects). This can result in delayed evaluations and lower quality reviews. Use the <strong>Auto Balance</strong> feature to intelligently redistribute pending projects, or manually reassign projects below.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 p-5 rounded-xl flex gap-4 items-start shadow-sm">
          <CheckCircle className="text-[#196b22] w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#002204] mb-0.5">
              All Workloads Balanced
            </h3>
            <p className="text-xs text-[#414752] leading-relaxed">
              Excellent! No judge is currently over-capacity. Standard turnaround is expected across all hackathon tracks.
            </p>
          </div>
        </div>
      )}

      {/* Grid of Workload Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Over-Capacity Column */}
        <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-red-50 pb-3">
            <span className="text-xs font-extrabold text-[#D32F2F] tracking-wider uppercase flex items-center gap-1">
              <CircleAlert className="w-4 h-4" /> Over-Capacity (&gt;12)
            </span>
            <span className="bg-red-50 text-[#D32F2F] font-bold text-xs px-2 py-0.5 rounded-full">
              {highWorkloadJudges.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {highWorkloadJudges.length > 0 ? (
              highWorkloadJudges.map((j) => (
                <div
                  key={j.id}
                  className="p-4 border border-red-100 bg-red-50/10 rounded-xl space-y-3 hover:border-red-200 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b1c1c]">{j.name}</h4>
                      <p className="text-xs text-[#414752] font-semibold uppercase">{j.expertise}</p>
                    </div>
                    <span className="text-sm font-black text-[#D32F2F]">{j.assignedProjectsCount} proj</span>
                  </div>
                  <div className="w-full bg-[#eae7e7] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#D32F2F] h-full" style={{ width: '100%' }}></div>
                  </div>
                  <button
                    onClick={() => onOpenReassign(j)}
                    className="w-full py-2 bg-white hover:bg-red-50 text-[#D32F2F] border border-red-100 font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Resolve Bottleneck
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-xs text-gray-400 italic">No judges over-capacity.</div>
            )}
          </div>
        </div>

        {/* Optimal Workload Column */}
        <div className="bg-white p-5 rounded-xl border border-blue-50 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-blue-50 pb-3">
            <span className="text-xs font-extrabold text-[#005dac] tracking-wider uppercase flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Optimal (8-12)
            </span>
            <span className="bg-blue-50 text-[#005dac] font-bold text-xs px-2 py-0.5 rounded-full">
              {moderateWorkloadJudges.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {moderateWorkloadJudges.length > 0 ? (
              moderateWorkloadJudges.map((j) => (
                <div
                  key={j.id}
                  className="p-4 border border-blue-100 bg-blue-50/5 rounded-xl space-y-3 hover:border-blue-200 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b1c1c]">{j.name}</h4>
                      <p className="text-xs text-[#414752] font-semibold uppercase">{j.expertise}</p>
                    </div>
                    <span className="text-sm font-black text-[#005dac]">{j.assignedProjectsCount} proj</span>
                  </div>
                  <div className="w-full bg-[#eae7e7] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#005dac] h-full" style={{ width: `${(j.assignedProjectsCount / 12) * 100}%` }}></div>
                  </div>
                  <button
                    onClick={() => onOpenReassign(j)}
                    className="w-full py-2 bg-white hover:bg-blue-50 text-[#005dac] border border-blue-100 font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Rebalance
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-xs text-gray-400 italic">No judges in optimal range.</div>
            )}
          </div>
        </div>

        {/* Low Workload Column */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <span className="text-xs font-extrabold text-gray-500 tracking-wider uppercase flex items-center gap-1">
              <Scale className="w-4 h-4" /> Available Capacity (&lt;8)
            </span>
            <span className="bg-gray-100 text-gray-600 font-bold text-xs px-2 py-0.5 rounded-full">
              {lightWorkloadJudges.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {lightWorkloadJudges.length > 0 ? (
              lightWorkloadJudges.map((j) => (
                <div
                  key={j.id}
                  className="p-4 border border-gray-100 rounded-xl space-y-3 hover:border-gray-200 transition-all bg-gray-50/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b1c1c]">{j.name}</h4>
                      <p className="text-xs text-[#414752] font-semibold uppercase">{j.expertise}</p>
                    </div>
                    <span className="text-sm font-black text-gray-600">{j.assignedProjectsCount} proj</span>
                  </div>
                  <div className="w-full bg-[#eae7e7] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full" style={{ width: `${(j.assignedProjectsCount / 12) * 100}%` }}></div>
                  </div>
                  <button
                    onClick={() => onOpenReassign(j)}
                    className="w-full py-2 bg-white hover:bg-gray-50 text-gray-600 border border-gray-100 font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Allocate Work
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-xs text-gray-400 italic">No low-workload judges available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Project, Judge } from '../types';
import { Search, Plus, Filter, Edit, Star, CircleAlert } from 'lucide-react';

interface ProjectsScreenProps {
  projects: Project[];
  judges: Judge[];
  onOpenNewAssignment: () => void;
  onOpenReassign: (judge: Judge) => void;
}

export default function ProjectsScreen({
  projects,
  judges,
  onOpenNewAssignment,
  onOpenReassign,
}: ProjectsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('All Tracks');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Filter projects
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.teamName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = trackFilter === 'All Tracks' || proj.track === trackFilter;

    const matchesStatus = statusFilter === 'All Statuses' || proj.evaluationStatus === statusFilter;

    return matchesSearch && matchesTrack && matchesStatus;
  });

  const getStatusBadge = (status: Project['evaluationStatus']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-[#196b22] border border-green-200';
      case 'In Progress':
        return 'bg-orange-50 text-[#F57C00] border border-orange-200';
      case 'Pending':
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#1b1c1c] tracking-tight mb-1">
            Projects Directory
          </h1>
          <p className="text-base text-[#414752]">
            Browse all submitted hackathon projects, verify evaluation statuses, and allocate reviews.
          </p>
        </div>
        <button
          onClick={onOpenNewAssignment}
          className="flex items-center gap-1.5 bg-[#005dac] text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-[#0D47A1] transition-all cursor-pointer text-sm"
        >
          <Plus className="w-4.5 h-4.5" />
          Register Assignment
        </button>
      </div>

      {/* Filtering Section */}
      <div className="bg-white p-4 rounded-xl border border-[#c1c6d4]/20 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f6f3f2] border-none rounded-lg px-4 py-2.5 pl-10 text-sm text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#005dac] transition-all placeholder:text-[#717783]"
            placeholder="Search projects or team names..."
            type="text"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#414752] w-4.5 h-4.5 pointer-events-none" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5">
          {/* Tracks */}
          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="bg-[#f6f3f2] border-none rounded-lg text-xs font-bold focus:ring-[#005dac] py-2.5 px-3 text-[#1b1c1c] outline-none cursor-pointer"
          >
            <option value="All Tracks">All Tracks</option>
            <option value="AI/ML">AI/ML</option>
            <option value="FinTech">FinTech</option>
            <option value="HealthTech">HealthTech</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#f6f3f2] border-none rounded-lg text-xs font-bold focus:ring-[#005dac] py-2.5 px-3 text-[#1b1c1c] outline-none cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Projects Grid / Table */}
      <div className="bg-white rounded-xl border border-[#c1c6d4]/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] text-xs font-semibold text-[#414752] uppercase tracking-wider border-b border-[#c1c6d4]/20">
                <th className="px-6 py-4 font-semibold">Project Title</th>
                <th className="px-6 py-4 font-semibold">Track</th>
                <th className="px-6 py-4 font-semibold">Team Name</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Score</th>
                <th className="px-6 py-4 font-semibold">Assigned Judge</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c1c6d4]/15">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proj) => {
                  const assignedJudge = judges.find((j) => j.id === proj.assignedJudgeId);

                  return (
                    <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Project Title */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-[#1b1c1c]">{proj.title}</div>
                      </td>

                      {/* Track */}
                      <td className="px-6 py-4 text-xs font-semibold">
                        <span className="text-[#005dac] bg-blue-50 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
                          {proj.track}
                        </span>
                      </td>

                      {/* Team */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-600">
                        {proj.teamName}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(proj.evaluationStatus)}`}>
                          {proj.evaluationStatus}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-6 py-4 text-center">
                        {proj.score !== undefined ? (
                          <div className="inline-flex items-center gap-1 justify-center text-sm font-bold text-[#196b22]">
                            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500 shrink-0" />
                            <span>{proj.score.toFixed(1)}</span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-400">&mdash;</span>
                        )}
                      </td>

                      {/* Assigned Judge */}
                      <td className="px-6 py-4">
                        {assignedJudge ? (
                          <div className="text-sm font-semibold text-[#1b1c1c]">
                            {assignedJudge.name}
                            <span className="text-xs text-[#414752] block font-normal">
                              {assignedJudge.organization}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#D32F2F] font-bold flex items-center gap-1">
                            <CircleAlert className="w-3.5 h-3.5" /> Unassigned
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {assignedJudge ? (
                          <button
                            onClick={() => onOpenReassign(assignedJudge)}
                            className="bg-gray-50 hover:bg-[#eae7e7] text-[#414752] border border-gray-200 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
                          >
                            Reassign
                          </button>
                        ) : (
                          <button
                            onClick={onOpenNewAssignment}
                            className="bg-[#005dac] text-white hover:bg-[#0D47A1] px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer"
                          >
                            Assign
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#414752] font-medium text-sm">
                    No projects found matching search terms or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

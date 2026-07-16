/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Judge, Project } from '../types';
import { X, Check } from 'lucide-react';

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  judges: Judge[];
  projects: Project[];
  onAddAssignment: (projectId: string, judgeId: string) => void;
}

export default function NewAssignmentModal({
  isOpen,
  onClose,
  judges,
  projects,
  onAddAssignment,
}: NewAssignmentModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedJudgeId, setSelectedJudgeId] = useState<string>('');

  if (!isOpen) return null;

  // Filter projects that are either pending or can take another review
  const availableProjects = projects;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) {
      alert('Please select a project.');
      return;
    }
    if (!selectedJudgeId) {
      alert('Please select a judge.');
      return;
    }

    onAddAssignment(selectedProjectId, selectedJudgeId);
    setSelectedProjectId('');
    setSelectedJudgeId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl transition-transform duration-300 border border-gray-100">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#1b1c1c] tracking-tight">Create New Assignment</h2>
            <p className="text-xs text-[#414752] mt-0.5">Assign a hackathon project to a professional judge</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#414752] hover:bg-[#eae7e7] p-1.5 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Project */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Select Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none cursor-pointer"
              required
            >
              <option value="">-- Choose a Project --</option>
              {availableProjects.map((p) => {
                // Find current judge
                const currentJudge = judges.find((j) => j.id === p.assignedJudgeId);
                const currentJudgeName = currentJudge ? ` (Assigned to: ${currentJudge.name})` : ' (Unassigned)';
                return (
                  <option key={p.id} value={p.id}>
                    {p.title} - {p.track}{currentJudgeName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Select Judge */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Assign to Judge
            </label>
            <select
              value={selectedJudgeId}
              onChange={(e) => setSelectedJudgeId(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none cursor-pointer"
              required
            >
              <option value="">-- Choose a Judge --</option>
              {judges.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name} - {j.expertise} (Assigned: {j.assignedProjectsCount} projects)
                </option>
              ))}
            </select>
          </div>

          {/* Warning check */}
          {selectedJudgeId && (() => {
            const j = judges.find((jg) => jg.id === selectedJudgeId);
            if (j && j.assignedProjectsCount >= 12) {
              return (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-3 rounded-lg leading-relaxed">
                  <strong>Warning:</strong> {j.name} already has {j.assignedProjectsCount} projects. Assigning more projects will exceed the recommended threshold (12).
                </div>
              );
            }
            return null;
          })()}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-[#c1c6d4] text-[#1b1c1c] font-semibold text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-[#005dac] text-white font-bold text-sm hover:bg-[#0D47A1] transition-all cursor-pointer shadow-md shadow-blue-100 flex items-center justify-center gap-1"
            >
              <Check className="w-4 h-4" />
              Assign Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

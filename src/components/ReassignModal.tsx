/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Judge, Project } from '../types';
import { X } from 'lucide-react';

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  judge: Judge | null;
  judges: Judge[];
  projects: Project[];
  onConfirm: (projectIds: string[], targetJudgeId: string) => void;
}

export default function ReassignModal({
  isOpen,
  onClose,
  judge,
  judges,
  projects,
  onConfirm,
}: ReassignModalProps) {
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [targetJudgeId, setTargetJudgeId] = useState<string>('');

  // Find projects assigned to this judge
  const judgeProjects = projects.filter(
    (p) => p.assignedJudgeId === judge?.id && p.evaluationStatus !== 'Completed'
  );

  // Filter possible target judges
  const otherJudges = judges.filter((j) => j.id !== judge?.id);

  // Sync state when modal opens or judge changes
  useEffect(() => {
    if (judge) {
      // By default select all uncompleted projects
      setSelectedProjectIds(judgeProjects.map((p) => p.id));
      if (otherJudges.length > 0) {
        // Default to a sensible candidate (e.g., someone with lower workload)
        const sortedCandidate = [...otherJudges].sort(
          (a, b) => a.assignedProjectsCount - b.assignedProjectsCount
        );
        setTargetJudgeId(sortedCandidate[0]?.id || '');
      }
    } else {
      setSelectedProjectIds([]);
      setTargetJudgeId('');
    }
  }, [judge, projects]);

  if (!isOpen || !judge) return null;

  const handleToggleProject = (id: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (selectedProjectIds.length === 0) {
      alert('Please select at least one project to transfer.');
      return;
    }
    if (!targetJudgeId) {
      alert('Please select a target judge.');
      return;
    }
    onConfirm(selectedProjectIds, targetJudgeId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl transition-transform duration-300 max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#1b1c1c] tracking-tight">Reassign Projects</h2>
            <p className="text-xs text-[#414752] mt-0.5">
              Managing workload for <span className="font-bold text-[#005dac]">{judge.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#414752] hover:bg-[#eae7e7] p-1.5 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-5">
          {/* Projects to transfer checklist */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-2 uppercase tracking-wider">
              Select Projects to Transfer ({selectedProjectIds.length}/{judgeProjects.length})
            </label>
            {judgeProjects.length > 0 ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 border border-gray-100 rounded-lg p-2 bg-gray-50/50">
                {judgeProjects.map((proj) => {
                  const isChecked = selectedProjectIds.includes(proj.id);
                  return (
                    <label
                      key={proj.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#005dac] bg-[#BBDEFB]/10'
                          : 'border-[#c1c6d4]/30 bg-white hover:bg-[#f6f3f2]'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#1b1c1c]">{proj.title}</span>
                        <span className="text-xs text-[#414752] font-medium">Team: {proj.teamName} | {proj.track}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleProject(proj.id)}
                        className="rounded text-[#1976d2] focus:ring-[#1976d2] h-5 w-5 border-gray-300 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#414752] italic p-3 border border-dashed rounded-lg text-center bg-gray-50">
                No active or uncompleted projects assigned to this judge.
              </p>
            )}
          </div>

          {/* Target Judge Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Transfer To:
            </label>
            <select
              value={targetJudgeId}
              onChange={(e) => setTargetJudgeId(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none cursor-pointer"
            >
              {otherJudges.map((j) => {
                // Determine capacity label
                const workload = j.assignedProjectsCount;
                let capacityLabel = 'High Capacity';
                if (workload > 12) capacityLabel = 'Over Capacity (Low)';
                else if (workload > 8) capacityLabel = 'Moderate Capacity';

                return (
                  <option key={j.id} value={j.id}>
                    {j.name} ({j.expertise}) - Workload: {workload} ({capacityLabel})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-[#c1c6d4] text-[#1b1c1c] font-semibold text-sm hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 rounded-lg bg-[#005dac] text-white font-bold text-sm hover:bg-[#0D47A1] transition-all cursor-pointer shadow-md shadow-blue-100"
            >
              Confirm Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

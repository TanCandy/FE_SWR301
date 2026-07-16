/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { EvaluationCriterion } from '../types';
import { Settings, Save, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface SettingsScreenProps {
  criteria: EvaluationCriterion[];
  onSaveCriteria: (newCriteria: EvaluationCriterion[]) => void;
  maxProjectsLimit: number;
  onSaveMaxProjectsLimit: (limit: number) => void;
}

export default function SettingsScreen({
  criteria,
  onSaveCriteria,
  maxProjectsLimit,
  onSaveMaxProjectsLimit,
}: SettingsScreenProps) {
  // Local state
  const [localCriteria, setLocalCriteria] = useState<EvaluationCriterion[]>([...criteria]);
  const [localLimit, setLocalLimit] = useState<number>(maxProjectsLimit);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Calculate sum of weights
  const totalWeight = localCriteria.reduce((acc, c) => acc + c.weight, 0);

  const handleWeightChange = (id: string, newWeightPercent: number) => {
    // Convert e.g., 25 to 0.25
    const weightFraction = newWeightPercent / 100;
    setLocalCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, weight: weightFraction } : c))
    );
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (Math.abs(totalWeight - 1.0) > 0.001) {
      alert(`Weights must total exactly 100%. Currently they total ${Math.round(totalWeight * 100)}%`);
      return;
    }
    onSaveCriteria(localCriteria);
    onSaveMaxProjectsLimit(localLimit);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-normal text-[#1b1c1c] tracking-tight mb-1">
          Hackathon Settings
        </h1>
        <p className="text-base text-[#414752]">
          Configure general scoring parameters, recommended limits, and workload alerts.
        </p>
      </div>

      {showSavedToast && (
        <div className="bg-green-50 border border-green-200 text-[#196b22] px-4 py-3 rounded-lg flex items-center gap-2 text-xs font-bold shadow-sm transition-all animate-bounce">
          <CheckCircle className="w-4 h-4 shrink-0" />
          Settings updated successfully! Changes applied globally across all panels.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main settings options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Criteria Panel */}
            <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Settings className="text-[#005dac] w-5 h-5" />
                <h3 className="text-base font-bold text-[#1b1c1c]">Evaluation Criteria &amp; Weights</h3>
              </div>

              <div className="space-y-4">
                {localCriteria.map((c) => (
                  <div key={c.id} className="p-4 border border-[#c1c6d4]/20 rounded-xl space-y-3 bg-gray-50/30">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#1b1c1c]">{c.name}</h4>
                        <p className="text-xs text-[#414752] leading-relaxed mt-0.5">{c.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={Math.round(c.weight * 100)}
                          onChange={(e) => handleWeightChange(c.id, Number(e.target.value))}
                          className="w-16 bg-white border border-[#c1c6d4]/40 rounded p-2 text-xs font-bold text-center text-[#1b1c1c] outline-none focus:ring-2 focus:ring-[#005dac]"
                        />
                        <span className="text-xs font-extrabold text-[#414752]">%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weights Alert */}
              <div className="flex justify-between items-center bg-gray-100/50 p-4 rounded-lg text-xs">
                <span className="text-[#414752] font-semibold">Total Cumulative Weights:</span>
                <div className="flex items-center gap-1.5 font-extrabold">
                  <span className={Math.abs(totalWeight - 1.0) < 0.001 ? 'text-[#196b22]' : 'text-[#D32F2F]'}>
                    {Math.round(totalWeight * 100)}%
                  </span>
                  {Math.abs(totalWeight - 1.0) > 0.001 && (
                    <AlertTriangle className="w-4 h-4 text-[#D32F2F]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar options */}
          <div className="space-y-6">
            {/* Workload limits panel */}
            <div className="bg-white p-5 rounded-xl border border-[#c1c6d4]/20 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-[#1b1c1c]">Workload Caps</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1b1c1c] uppercase tracking-wider">
                    Recommended Max Projects Per Judge
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={localLimit}
                    onChange={(e) => setLocalLimit(Number(e.target.value))}
                    className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm font-semibold text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] outline-none"
                    required
                  />
                  <p className="text-[11px] text-[#414752] leading-relaxed">
                    Judges assigned more than this number of projects will be flagged as a bottleneck on administrative dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick instructions / Info panel */}
            <div className="bg-[#BBDEFB]/10 border border-[#BBDEFB]/30 p-5 rounded-xl space-y-3 shadow-sm">
              <div className="flex gap-2 items-center text-[#0D47A1]">
                <Info className="w-4.5 h-4.5" />
                <h4 className="text-xs font-bold uppercase tracking-wider">System Parameters</h4>
              </div>
              <p className="text-xs text-[#414752] leading-relaxed">
                Weights and parameters changed here are immediately updated in our offline state system. They drive automated warning notifications and the <strong>Auto Balance</strong> optimization solver.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-[#005dac] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#0D47A1] transition-all cursor-pointer text-sm"
          >
            <Save className="w-4.5 h-4.5" />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}

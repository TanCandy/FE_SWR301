/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Expertise } from '../types';
import { X, Check } from 'lucide-react';

interface InviteJudgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJudge: (name: string, role: string, organization: string, expertise: Expertise) => void;
}

export default function InviteJudgeModal({ isOpen, onClose, onAddJudge }: InviteJudgeModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [expertise, setExpertise] = useState<Expertise>('AI/ML');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddJudge(name, role || 'Expert', organization || 'Independent', expertise);
    setName('');
    setRole('');
    setOrganization('');
    setExpertise('AI/ML');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-300">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl transition-transform duration-300 border border-gray-100">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#1b1c1c] tracking-tight">Invite Professional Judge</h2>
            <p className="text-xs text-[#414752] mt-0.5">Send invitations to join the hackathon evaluation board</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#414752] hover:bg-[#eae7e7] p-1.5 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judge Name */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Judge Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none placeholder:text-gray-400"
              placeholder="e.g. Dr. Jane Doe"
              required
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Organization / Company
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none placeholder:text-gray-400"
              placeholder="e.g. Microsoft Research, MIT Media Lab"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Job Title / Professional Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#c1c6d4]/30 rounded-lg p-3 text-sm text-[#1b1c1c] focus:ring-2 focus:ring-[#005dac] focus:border-transparent outline-none placeholder:text-gray-400"
              placeholder="e.g. Director of Engineering, CTO"
              required
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5 uppercase tracking-wider">
              Primary Area of Expertise
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['AI/ML', 'FinTech', 'HealthTech', 'UI/UX Design'] as Expertise[]).map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setExpertise(exp)}
                  className={`p-3 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                    expertise === exp
                      ? 'border-[#005dac] bg-[#BBDEFB]/10 text-[#005dac]'
                      : 'border-[#c1c6d4]/30 bg-white text-[#414752] hover:bg-gray-50'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
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
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

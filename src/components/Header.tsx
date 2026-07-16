/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Bell, HelpCircle } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeHeaderTab: 'events' | 'judge_portal' | 'analytics';
  onHeaderTabChange: (tab: 'events' | 'judge_portal' | 'analytics') => void;
}

export default function Header({
  searchTerm,
  onSearchChange,
  activeHeaderTab,
  onHeaderTabChange,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-[64px] bg-white border-b border-[#c1c6d4]/20 shadow-sm flex justify-between items-center px-6 z-50">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-[#005dac] tracking-tight">SEAL Hackathon</span>
        <div className="hidden md:flex ml-8 items-center gap-6">
          <button
            onClick={() => onHeaderTabChange('events')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg transition-all text-base font-medium ${
              activeHeaderTab === 'events'
                ? 'text-[#005dac] border-b-2 border-[#005dac] rounded-b-none pb-0.5'
                : 'text-[#414752] hover:bg-[#BBDEFB]/10'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => onHeaderTabChange('judge_portal')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg transition-all text-base font-medium ${
              activeHeaderTab === 'judge_portal'
                ? 'text-[#005dac] border-b-2 border-[#005dac] rounded-b-none pb-0.5'
                : 'text-[#414752] hover:bg-[#BBDEFB]/10'
            }`}
          >
            Judge Portal
          </button>
          <button
            onClick={() => onHeaderTabChange('analytics')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg transition-all text-base font-medium ${
              activeHeaderTab === 'analytics'
                ? 'text-[#005dac] border-b-2 border-[#005dac] rounded-b-none pb-0.5'
                : 'text-[#414752] hover:bg-[#BBDEFB]/10'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative group hidden sm:block">
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-[#f6f3f2] border-none rounded-full px-4 py-1.5 pl-10 text-sm text-[#1b1c1c] focus:outline-none focus:ring-2 focus:ring-[#005dac] w-64 focus:w-80 transition-all placeholder:text-[#717783]"
            placeholder="Search judges or projects..."
            type="text"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414752] w-5 h-5 pointer-events-none" />
        </div>

        {/* Notifications */}
        <button className="relative text-[#005dac] p-2 rounded-full hover:bg-[#BBDEFB]/10 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#D32F2F] rounded-full border border-white"></span>
        </button>

        {/* Help */}
        <button className="text-[#005dac] p-2 rounded-full hover:bg-[#BBDEFB]/10 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-8 w-[1px] bg-[#c1c6d4]/30 mx-1"></div>

        {/* Admin profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-[#eae7e7] p-1.5 pr-3 rounded-full transition-all">
          <img
            className="w-8 h-8 rounded-full object-cover"
            alt="Admin Profile"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYTSPwx1UllE2Z73lWTq7ytWl1qrqRs95dgzvfA5s486P9e9OH21PH8O9Q9QYJbKuhEXBQd68FTMCfLz1MqdXwkCPFkryg1j8NLHkAqb1g8Pl24EuD6UQH_3iCaD5A-3UTwcn23yS7soLNEr0jM7dW5l4HeQi5o6gbUb8TyI1aRdeJO1a2cE4ZEzThammoLzVB-BQ4GzcpJ2iJ2zK3OF9R0uO15XJQ2cSsBuxFf0hRXtTo6L1FjwVu6LzS8p34G4SM6AOrgo6E1G0"
          />
          <span className="text-sm font-semibold text-[#1b1c1c] hidden lg:block">Admin Console</span>
        </div>
      </div>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  LayoutDashboard,
  Gavel,
  FolderKanban,
  UserCheck,
  Settings as SettingsIcon,
  Plus,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'judges' | 'projects' | 'assignments' | 'settings';
  onTabChange: (tab: 'dashboard' | 'judges' | 'projects' | 'assignments' | 'settings') => void;
  onNewAssignmentClick: () => void;
  onLogoutClick: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  onNewAssignmentClick,
  onLogoutClick,
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'judges', label: 'Judges', icon: Gavel },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'assignments', label: 'Assignments', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ] as const;

  return (
    <nav className="fixed left-0 top-0 h-full w-[260px] bg-[#f6f3f2] shadow-sm flex flex-col pt-[64px] z-40 border-r border-[#c1c6d4]/20">
      <div className="px-4 py-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-6 px-4">
            <h2 className="text-xl font-extrabold text-[#1b1c1c] tracking-tight">Agile Nexus Admin</h2>
            <p className="text-xs text-[#414752] uppercase tracking-wider font-semibold">Global Management</p>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-full transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#1976d2] text-white shadow-sm'
                      : 'text-[#414752] hover:bg-[#e5e2e1] hover:text-[#1b1c1c]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#414752]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* New Assignment Action */}
          <div className="mt-8 px-2">
            <button
              onClick={onNewAssignmentClick}
              className="w-full bg-[#005dac] text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#0D47A1] active:translate-y-0.5 transition-all duration-150"
            >
              <Plus className="w-5 h-5" />
              New Assignment
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-[#c1c6d4]/20 pt-4">
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-full text-[#414752] hover:bg-red-50 hover:text-[#D32F2F] transition-all duration-150 cursor-pointer text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

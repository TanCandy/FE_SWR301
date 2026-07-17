import { useState, useRef, useEffect, ReactNode } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Upload,
  ClipboardCheck,
  Trophy,
  User,
  CalendarDays,
  ClipboardList,
  CheckSquare,
  File,
  Bell,
  Folder,
  FileSearch,
  UserCog,
  UserPlus,
  Layers,
  Flag,
  Gift,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Award,
  TrendingUp,
  Megaphone,
  CalendarClock,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../types/auth';

const iconMap: Record<string, ReactNode> = {
  layout: <LayoutDashboard className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
  upload: <Upload className="w-5 h-5" />,
  'clipboard-check': <ClipboardCheck className="w-5 h-5" />,
  trophy: <Trophy className="w-5 h-5" />,
  user: <User className="w-5 h-5" />,
  'calendar-check': <CalendarDays className="w-5 h-5" />,
  'clipboard-list': <ClipboardList className="w-5 h-5" />,
  'check-square': <CheckSquare className="w-5 h-5" />,
  file: <File className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
  folder: <Folder className="w-5 h-5" />,
  'file-search': <FileSearch className="w-5 h-5" />,
  'users-cog': <UserCog className="w-5 h-5" />,
  'user-plus': <UserPlus className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  flag: <Flag className="w-5 h-5" />,
  gift: <Gift className="w-5 h-5" />,
  'bar-chart': <BarChart3 className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  'trending-up': <TrendingUp className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  'calendar-clock': <CalendarClock className="w-5 h-5" />,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const navItems = NAV_ITEMS[user.role] || [];

  const handleNavClick = (itemId: string) => {
    setActiveItem(itemId);
    navigate(`/dashboard/${itemId}`);
    if (window.innerWidth < 1024) {
      onMobileClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    setActiveItem('profile');
    navigate('/dashboard/profile');
    setUserMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">SEAL</h1>
                  <p className="text-[10px] text-gray-500">Hackathon</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            )}
            <button
              onClick={onToggle}
              className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <button
              onClick={onMobileClose}
              className="lg:hidden w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    activeItem === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span className={`flex-shrink-0 ${activeItem === item.id ? 'text-blue-600' : 'text-gray-400'}`}>
                    {iconMap[item.icon]}
                  </span>
                  {!collapsed && (
                    <span className="font-medium text-sm truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* User Menu */}
          <div className="border-t border-gray-100 p-3" ref={userMenuRef}>
            {/* User Info */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${ROLE_COLORS[user.role]} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {!collapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{ROLE_LABELS[user.role]}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-90' : ''}`} />
                  </>
                )}
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && !collapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-2 z-10">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/dashboard/settings');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Logout button when collapsed */}
            {collapsed && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 p-2 rounded-xl hover:bg-red-50 text-red-600 transition-colors mt-2"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => {}}
        className="fixed bottom-4 right-4 z-30 lg:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}

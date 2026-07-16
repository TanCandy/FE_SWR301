import { ReactNode } from 'react';
import { User, Calendar, FileText, Users, Award, Mail, Phone, MapPin } from 'lucide-react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  role?: string;
  avatar?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const roleColors: Record<string, string> = {
  team_leader: 'bg-blue-500',
  mentor: 'bg-purple-500',
  student: 'bg-green-500',
  judge: 'bg-amber-500',
  administrator: 'bg-red-500',
};

export function Avatar({ src, name, size = 'md', role }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const bgColor = role ? roleColors[role] || 'bg-gray-500' : 'bg-blue-500';

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-xl object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-xl flex items-center justify-center text-white font-semibold`}>
      {initials}
    </div>
  );
}

interface UserCardProps {
  name: string;
  email?: string;
  role?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  onClick?: () => void;
  actions?: ReactNode;
}

export function UserCard({ name, email, role, avatar, phone, location, onClick, actions }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start gap-4">
        <Avatar name={name} role={role} avatar={avatar} size="lg" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          {role && <p className="text-sm text-gray-500 capitalize">{role.replace('_', ' ')}</p>}
          {email && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              {email}
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Phone className="w-4 h-4" />
              {phone}
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {icon || <FileText className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6 max-w-sm">{description}</p>}
      {action}
    </div>
  );
}

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list' | 'profile';
  count?: number;
}

export function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === 'table') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100 border-b border-gray-100" />
          {skeletons.map((i) => (
            <div key={i} className="h-16 border-b border-gray-50 flex items-center px-4 gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-100 rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {skeletons.map((i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-xl" />
          <div className="flex-1">
            <div className="h-6 bg-gray-100 rounded w-1/3 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
          <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
          <div className="h-8 bg-gray-100 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

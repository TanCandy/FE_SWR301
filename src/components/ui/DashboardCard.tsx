import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Info, ArrowRight } from 'lucide-react';
import Badge from './Badge';

export type CardStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconColor?: 'blue' | 'green' | 'purple' | 'amber' | 'red' | 'indigo' | 'pink' | 'gray';
  tooltip?: string;
  status?: { label: string; variant: CardStatus };
  trend?: { value: string; up: boolean };
  href?: string;
  progress?: number;
  progressColor?: 'blue' | 'green' | 'amber' | 'red';
  key?: string | number;
}

const iconColorClasses: Record<NonNullable<DashboardCardProps['iconColor']>, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
};

const progressColorClasses: Record<NonNullable<DashboardCardProps['progressColor']>, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

const badgeVariantMap: Record<CardStatus, 'green' | 'amber' | 'red' | 'blue' | 'gray'> = {
  success: 'green',
  warning: 'amber',
  danger: 'red',
  info: 'blue',
  neutral: 'gray',
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'blue',
  tooltip,
  status,
  trend,
  href,
  progress,
  progressColor = 'blue',
}: DashboardCardProps) {
  const navigate = useNavigate();
  const clickable = Boolean(href);

  const handleClick = () => {
    if (href) navigate(href);
  };

  return (
    <div
      onClick={handleClick}
      title={tooltip}
      className={`group relative bg-white rounded-2xl p-5 shadow-sm border border-gray-100 transition-all duration-200 ${
        clickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200' : ''
      }`}
    >
      {/* Top row: icon + status badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${iconColorClasses[iconColor]} rounded-xl flex items-center justify-center text-white shadow-sm`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5">
          {status && (
            <Badge variant={badgeVariantMap[status.variant]}>{status.label}</Badge>
          )}
          {tooltip && (
            <span className="text-gray-300 group-hover:text-gray-400 transition-colors">
              <Info className="w-4 h-4" />
            </span>
          )}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${
              trend.up ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trend.value}
          </span>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-700">{title}</p>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${progressColorClasses[progressColor]}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}

      {/* Click hint */}
      {clickable && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4 text-blue-500" />
        </div>
      )}
    </div>
  );
}
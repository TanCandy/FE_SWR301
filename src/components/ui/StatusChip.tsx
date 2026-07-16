type StatusType = 'pending' | 'in_progress' | 'completed' | 'rejected' | 'active' | 'inactive';

interface StatusChipProps {
  status: StatusType;
  label?: string;
}

const statusConfig: Record<StatusType, { color: string; bgColor: string; label: string }> = {
  pending: { color: 'text-amber-600', bgColor: 'bg-amber-100', label: 'Pending' },
  in_progress: { color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'In Progress' },
  completed: { color: 'text-green-600', bgColor: 'bg-green-100', label: 'Completed' },
  rejected: { color: 'text-red-600', bgColor: 'bg-red-100', label: 'Rejected' },
  active: { color: 'text-green-600', bgColor: 'bg-green-100', label: 'Active' },
  inactive: { color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'Inactive' },
};

export default function StatusChip({ status, label }: StatusChipProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.color.replace('text-', 'bg-')}`} />
      {label || config.label}
    </span>
  );
}

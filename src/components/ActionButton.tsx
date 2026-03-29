import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

export function ActionButton({
  label,
  onClick,
  loading = false,
  variant = 'primary',
  icon,
}: ActionButtonProps) {
  const base =
    'flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';

  const colors =
    variant === 'primary'
      ? 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500'
      : variant === 'secondary'
        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 focus:ring-slate-500'
        : 'text-slate-400 hover:text-slate-200 focus:ring-slate-500';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`${base} ${colors}`}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {label}
    </button>
  );
}

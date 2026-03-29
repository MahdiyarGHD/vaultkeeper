import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusBannerProps {
  type: StatusType;
  message: string;
}

const CONFIG: Record<
  StatusType,
  { icon: React.ReactNode; bg: string; border: string; text: string }
> = {
  success: {
    icon: <CheckCircle size={18} />,
    bg: 'bg-green-900/40',
    border: 'border-green-600/50',
    text: 'text-green-300',
  },
  error: {
    icon: <XCircle size={18} />,
    bg: 'bg-red-900/40',
    border: 'border-red-600/50',
    text: 'text-red-300',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    bg: 'bg-yellow-900/40',
    border: 'border-yellow-600/50',
    text: 'text-yellow-300',
  },
  info: {
    icon: <Info size={18} />,
    bg: 'bg-indigo-900/40',
    border: 'border-indigo-600/50',
    text: 'text-indigo-300',
  },
};

export function StatusBanner({ type, message }: StatusBannerProps) {
  const cfg = CONFIG[type];
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-4 py-3 text-sm fade-in
                  ${cfg.bg} ${cfg.border} ${cfg.text}`}
      role="alert"
    >
      <span className="mt-0.5 shrink-0">{cfg.icon}</span>
      <span>{message}</span>
    </div>
  );
}

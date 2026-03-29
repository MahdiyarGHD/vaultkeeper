import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
}

export function TextArea({
  label,
  value,
  onChange,
  readOnly = false,
  placeholder = '',
  rows = 6,
}: TextAreaProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-sm text-slate-400">{label}</label>
        {value && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400
                       hover:text-indigo-400 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">کپی شد</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>کپی</span>
              </>
            )}
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        rows={rows}
        spellCheck={false}
        className={`w-full bg-slate-800 border text-slate-100 rounded-lg px-4 py-3
                    text-sm resize-none font-mono leading-relaxed
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    placeholder:text-slate-500 transition
                    ${readOnly ? 'border-slate-700 cursor-default' : 'border-slate-600'}`}
      />
    </div>
  );
}

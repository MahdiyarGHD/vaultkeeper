import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface KeyInputProps {
  value: string;
  onChange: (key: string) => void;
  label?: string;
}

export function KeyInput({ value, onChange, label = 'کلید رمزنگاری' }: KeyInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-400">{label}</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="کلید خود را وارد کنید…"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-slate-800 border border-slate-600 text-slate-100
                     rounded-lg px-4 py-2 pl-10 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     placeholder:text-slate-500 transition"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400
                     hover:text-slate-200 transition cursor-pointer"
          aria-label={visible ? 'پنهان کردن کلید' : 'نمایش کلید'}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

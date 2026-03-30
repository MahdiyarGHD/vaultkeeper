import { ALGORITHMS } from '../crypto';
import type { Algorithm } from '../crypto';

interface AlgorithmSelectorProps {
  value: Algorithm;
  onChange: (algo: Algorithm) => void;
}

export function AlgorithmSelector({ value, onChange }: AlgorithmSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-400">الگوریتم رمزنگاری</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Algorithm)}
        className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg
                   px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500
                   cursor-pointer transition"
      >
        {ALGORITHMS.map((algo) => (
          <option key={algo.name} value={algo.name}>
            {algo.label}
          </option>
        ))}
      </select>
    </div>
  );
}

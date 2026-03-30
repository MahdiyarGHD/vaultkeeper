import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="flex flex-col items-center gap-2 py-6 sm:py-8 select-none">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-10 h-10 text-indigo-400" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold tracking-tight text-white">
          VaultKeeper
        </h1>
      </div>
      <p className="text-slate-400 text-sm mt-1">
        رمزنگاری و رمزگشایی متن — کاملاً در مرورگر شما
      </p>
    </header>
  );
}

import { useState } from 'react';
import { Header, AlgorithmSelector } from './components';
import { CryptoPanel } from './panels';
import type { Algorithm } from './crypto';

export default function App() {
  const [algorithm, setAlgorithm] = useState<Algorithm>('AES-256-GCM');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <Header />

        <div className="mb-6">
          <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />
        </div>

        <CryptoPanel algorithm={algorithm} />

        <footer className="mt-12 text-center text-xs text-slate-600 select-none">
          VaultKeeper — رمزنگاری کاملاً محلی در مرورگر شما | بدون ارسال داده به سرور
        </footer>
      </div>
    </div>
  );
}

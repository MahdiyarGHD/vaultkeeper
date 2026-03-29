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

        <footer className="mt-12 text-center text-xs text-slate-600 select-none flex flex-col gap-1">
          <span>
            ساخته شده با{' '}
            <span className="text-red-500">♥</span>
            {' '}توسط{' '}
            <a
              href="https://github.com/mahdiyarghd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors"
            >
              MahdiyarGHD
            </a>
          </span>
          <a
            href="https://github.com/MahdiyarGHD/vaultkeeper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-colors"
          >
            مخزن پروژه
          </a>
        </footer>
      </div>
    </div>
  );
}

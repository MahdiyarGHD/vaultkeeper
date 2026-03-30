import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { KeyInput, TextArea, ActionButton, StatusBanner } from '../components';
import type { StatusType } from '../components/StatusBanner';
import { encrypt, decrypt, ALGORITHMS, encodeToPhrase, decodeFromPhrase, isPersianEncoded } from '../crypto';
import type { Algorithm } from '../crypto';

interface CryptoPanelProps {
  algorithm: Algorithm;
}

export function CryptoPanel({ algorithm }: CryptoPanelProps) {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [status, setStatus] = useState<{ type: StatusType; message: string } | null>(null);
  const [loading, setLoading] = useState<'encrypt' | 'decrypt' | null>(null);
  const [persianMode, setPersianMode] = useState(false);
  const [withEmojis, setWithEmojis] = useState(true);

  const algoCfg = ALGORITHMS.find((a) => a.name === algorithm)!;

  const handleEncrypt = async () => {
    if (!plaintext.trim()) {
      setStatus({ type: 'warning', message: 'لطفاً متن اصلی را وارد کنید.' });
      return;
    }
    if (!key) {
      setStatus({ type: 'warning', message: 'لطفاً کلید رمزنگاری را وارد کنید.' });
      return;
    }
    setLoading('encrypt');
    setStatus(null);
    try {
      const result = await encrypt(plaintext, key, algoCfg.keyLength, algoCfg.ivLength);
      setCiphertext(persianMode ? encodeToPhrase(result, withEmojis) : result);
      setStatus({ type: 'success', message: 'رمزنگاری با موفقیت انجام شد.' });
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'خطایی ناشناخته رخ داد.' });
      setCiphertext('');
    } finally {
      setLoading(null);
    }
  };

  const handleDecrypt = async () => {
    if (!ciphertext.trim()) {
      setStatus({ type: 'warning', message: 'لطفاً متن رمزنگاری شده را وارد کنید.' });
      return;
    }
    if (!key) {
      setStatus({ type: 'warning', message: 'لطفاً کلید رمزگشایی را وارد کنید.' });
      return;
    }
    setLoading('decrypt');
    setStatus(null);
    try {
      let base64 = ciphertext.trim();
      if (isPersianEncoded(base64)) {
        base64 = decodeFromPhrase(base64);
      }
      const result = await decrypt(base64, key, algoCfg.keyLength, algoCfg.ivLength);
      setPlaintext(result);
      setStatus({ type: 'success', message: 'رمزگشایی با موفقیت انجام شد.' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطایی ناشناخته رخ داد.';
      const isKeyMismatch = message.includes('کلید اشتباه') || message.includes('ناموفق');
      setStatus({
        type: isKeyMismatch ? 'warning' : 'error',
        message: isKeyMismatch ? `عدم تطابق کلید: ${message}` : message,
      });
      setPlaintext('');
    } finally {
      setLoading(null);
    }
  };

  const handleClear = () => {
    setPlaintext('');
    setKey('');
    setCiphertext('');
    setStatus(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <TextArea
        label="متن اصلی"
        value={plaintext}
        onChange={setPlaintext}
        placeholder="متن اصلی را اینجا وارد کنید…"
      />

      {/* ── Middle controls ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-4">
        <KeyInput value={key} onChange={setKey} label="کلید رمزنگاری / رمزگشایی" />

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={persianMode}
              onChange={(e) => setPersianMode(e.target.checked)}
              className="accent-indigo-500"
            />
            <span className="text-xs text-slate-400">عبارت فارسی</span>
          </label>
          {persianMode && (
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={withEmojis}
                onChange={(e) => setWithEmojis(e.target.checked)}
                className="accent-indigo-500"
              />
              <span className="text-xs text-slate-400">شکلک</span>
            </label>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ActionButton
            label="رمزنگاری"
            icon={<ArrowDown size={15} />}
            onClick={handleEncrypt}
            loading={loading === 'encrypt'}
          />
          <ActionButton
            label="رمزگشایی"
            icon={<ArrowUp size={15} />}
            onClick={handleDecrypt}
            loading={loading === 'decrypt'}
            variant="secondary"
          />
          <ActionButton label="پاک کردن" onClick={handleClear} variant="ghost" className="ms-auto" />
        </div>

        {status && <StatusBanner type={status.type} message={status.message} />}
      </div>

      <TextArea
        label="متن رمزنگاری شده"
        value={ciphertext}
        onChange={setCiphertext}
        placeholder="متن رمزنگاری شده را اینجا وارد کنید…"
      />
    </div>
  );
}

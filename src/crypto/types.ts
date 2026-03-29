export type Algorithm = 'AES-256-GCM' | 'AES-128-GCM';

export interface CryptoResult {
  success: boolean;
  data?: string;
  error?: string;
}

export interface AlgorithmConfig {
  name: Algorithm;
  label: string;
  keyLength: number; // bits
  ivLength: number;  // bytes
}

export const ALGORITHMS: AlgorithmConfig[] = [
  { name: 'AES-256-GCM', label: 'AES-256-GCM (پیشنهادی)', keyLength: 256, ivLength: 12 },
  { name: 'AES-128-GCM', label: 'AES-128-GCM', keyLength: 128, ivLength: 12 },
];

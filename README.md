# VaultKeeper

**رمزنگاری و رمزگشایی متن در مرورگر — بدون ارسال داده به سرور**

VaultKeeper is a client-side, privacy-first text encryption tool built with React + Vite + TypeScript. All cryptographic operations run entirely in the browser using the Web Crypto API; no text or keys ever leave your device.

## Features

- 🔐 **AES-256-GCM** and **AES-128-GCM** encryption (selectable)
- 🔑 Key derivation via **PBKDF2** (310 000 iterations, SHA-256) — brute-force resistant
- 🌐 **Fully client-side** — zero server storage of text or keys
- 🧭 **Persian (RTL)** interface with Vazirmatn font
- ✅ Visual feedback for success, errors, and key mismatches
- 📋 One-click copy-to-clipboard for output
- 📦 Modular codebase — crypto utilities are independently importable

## Usage

1. **Encrypt**: Enter plaintext in the top area, type a key, click **رمزنگاری ↓**. The ciphertext appears in the bottom area.
2. **Decrypt**: Paste ciphertext in the bottom area, enter the same key, click **رمزگشایی ↑**. The plaintext appears in the top area.
3. Switch algorithms via the dropdown at the top.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run lint     # lint
```

## Security notes

- Random 16-byte salt + 12-byte IV are generated per encryption; both are embedded in the Base64 payload.
- AES-GCM provides authenticated encryption — tampered ciphertext or wrong keys are detected and reported.
- The application never makes network requests; no analytics, no telemetry.

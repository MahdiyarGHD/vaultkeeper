/**
 * Derives a CryptoKey from a user-supplied passphrase using PBKDF2.
 * A random salt is generated for encryption; the salt is stored alongside the ciphertext.
 */
async function deriveKey(
  passphrase: string,
  salt: Uint8Array,
  keyLengthBits: number,
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as ArrayBuffer,
      iterations: 310_000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: keyLengthBits },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Encode ArrayBuffer → Base64 string. */
function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/** Decode Base64 string → Uint8Array. */
function base64ToBuf(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// ─── Payload format ─────────────────────────────────────────────────────────
// Base64( salt[16] | iv[12] | ciphertext )
// ─────────────────────────────────────────────────────────────────────────────

const SALT_LENGTH = 16; // bytes

/**
 * Encrypt `plaintext` with `passphrase` using AES-GCM.
 * Returns a Base64-encoded payload containing salt + IV + ciphertext.
 */
export async function encrypt(
  plaintext: string,
  passphrase: string,
  keyLengthBits: number,
  ivLength: number,
): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(ivLength));

  const key = await deriveKey(passphrase, salt, keyLengthBits);
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext),
  );

  // Combine salt | iv | ciphertext
  const combined = new Uint8Array(SALT_LENGTH + ivLength + cipherBuffer.byteLength);
  combined.set(salt, 0);
  combined.set(iv, SALT_LENGTH);
  combined.set(new Uint8Array(cipherBuffer), SALT_LENGTH + ivLength);

  return bufToBase64(combined.buffer);
}

/**
 * Decrypt a Base64-encoded payload produced by `encrypt`.
 * Throws on wrong key or corrupted data.
 */
export async function decrypt(
  ciphertext: string,
  passphrase: string,
  keyLengthBits: number,
  ivLength: number,
): Promise<string> {
  let combined: Uint8Array;
  try {
    combined = base64ToBuf(ciphertext.trim());
  } catch {
    throw new Error('داده رمزنگاری شده نامعتبر است.');
  }

  if (combined.length <= SALT_LENGTH + ivLength) {
    throw new Error('داده رمزنگاری شده بسیار کوتاه است یا خراب است.');
  }

  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + ivLength);
  const cipherBuffer = combined.slice(SALT_LENGTH + ivLength);

  const key = await deriveKey(passphrase, salt, keyLengthBits);

  try {
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherBuffer,
    );
    return new TextDecoder().decode(plainBuffer);
  } catch {
    throw new Error('رمزگشایی ناموفق بود — کلید اشتباه یا داده خراب است.');
  }
}

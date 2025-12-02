// [ID: X7Z9Q2W] - Client-Side Encryption Logic
// We use Web Crypto API (AES-GCM) - No external libraries needed

// 1. Convert Password to a Cryptographic Key
async function getKey(password: string, salt: string) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// 2. ENCRYPT Function
export async function encryptData(secretText: string, password: string) {
  const salt = "legacy-vault-static-salt"; // In production, store unique salt per user
  const key = await getKey(password, salt);
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Random initialization vector
  const encoded = new TextEncoder().encode(secretText);

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoded
  );

  // Convert ArrayBuffers to Base64 strings for storage
  const encryptedBlob = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  const ivString = btoa(String.fromCharCode(...new Uint8Array(iv)));

  return { encryptedBlob, iv: ivString };
}

// 3. DECRYPT Function (For viewing later)
export async function decryptData(encryptedBlob: string, ivString: string, password: string) {
  try {
    const salt = "legacy-vault-static-salt";
    const key = await getKey(password, salt);
    
    // Convert Base64 back to ArrayBuffers
    const encryptedData = Uint8Array.from(atob(encryptedBlob), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivString), c => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    throw new Error("Wrong Password or Corrupted Data");
  }
}
// src/utils/api.ts

// Automatically picks localhost for dev, or the real URL for prod
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getApiUrl = (path: string) => {
  // Removes double slashes if path starts with /
  return `${API_URL}${path.startsWith("/") ? path : "/" + path}`;
};
export interface ApiResponse<T> {
  response: T | null;
  errors: ApiError[] | null;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

// Environment-based paths
export const PATH = {
  API_BASE: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
  WS_BASE: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:1337",
};

// API Endpoints
export const ENDPOINT = {
  AUTH: {
    LOGIN: "/api/auth/local",
    REGISTER: "/api/auth/local/register",
    REFRESH: "/api/auth/refresh-token",
    ME: "/api/users/me",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  USERS: {
    BASE: "/api/users",
    BY_ID: (id: number) => `/api/users/${id}`,
  },
};

/**
 * Extract user ID from JWT token
 */
export function getUserIdFromToken(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.id || decoded.sub || null;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export class TokenService {
  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  static setAccessToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  }

  static setTokens(accessToken: string, refreshToken?: string): void {
    this.setAccessToken(accessToken);
    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  }

  static clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  static hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return false;
      // Consider token expired 60 seconds before actual expiry
      return Date.now() >= (decoded.exp * 1000) - 60000;
    } catch {
      return true;
    }
  }

  static decodeToken<T = Record<string, unknown>>(token: string): T | null {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  static getUserIdFromToken(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;
    const decoded = this.decodeToken<{ id?: number; sub?: number }>(token);
    return decoded?.id || decoded?.sub || null;
  }
}

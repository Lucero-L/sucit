import { PATH } from "./BaseService";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  withAuth?: boolean;
}

const DEFAULT_TIMEOUT = 30000;

export class HttpClient {
  private static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  private static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  }

  private static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  }

  private static buildHeaders(config?: RequestConfig, isFormData?: boolean): HeadersInit {
    const headers: Record<string, string> = {
      ...(config?.headers || {}),
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (config?.withAuth !== false) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private static async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${PATH.API_BASE}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.accessToken) {
          this.setToken(data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
          }
          return true;
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }

    return false;
  }

  static async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const url = endpoint.startsWith("http") ? endpoint : `${PATH.API_BASE}${endpoint}`;
    const isFormData = data instanceof FormData;
    const timeout = config?.timeout || DEFAULT_TIMEOUT;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const fetchOptions: RequestInit = {
      method,
      headers: this.buildHeaders(config, isFormData),
      signal: controller.signal,
    };

    if (data && method !== "GET") {
      fetchOptions.body = isFormData ? data : JSON.stringify(data);
    }

    try {
      let response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      // Handle 401/403 with token refresh retry
      if ((response.status === 401 || response.status === 403) && config?.withAuth !== false) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry with new token
          const retryOptions: RequestInit = {
            ...fetchOptions,
            headers: this.buildHeaders(config, isFormData),
          };
          response = await fetch(url, retryOptions);
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpError(response.status, errorData.message || response.statusText, errorData);
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return {} as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof HttpError) throw error;
      if ((error as Error).name === "AbortError") {
        throw new HttpError(408, "Request timeout");
      }
      throw new HttpError(0, (error as Error).message || "Network error");
    }
  }

  static get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, config);
  }

  static post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  static put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  static patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  static delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, config);
  }
}

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

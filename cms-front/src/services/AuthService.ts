import { HttpClient } from "./HttpClient";
import { TokenService } from "./TokenService";
import { ENDPOINT, type ApiResponse } from "./BaseService";
import type { AuthResponse, LoginRequest, UserInfo } from "@/src/app/lib/model/auth-model";

export class AuthService {
  static async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      // Strapi uses 'identifier' instead of 'username'
      const response = await HttpClient.post<{ jwt: string; user: UserInfo }>(
        ENDPOINT.AUTH.LOGIN,
        {
          identifier: credentials.username,
          password: credentials.password,
        },
        { withAuth: false }
      );

      const authResponse: AuthResponse = {
        accessToken: response.jwt,
        user: response.user,
      };

      // Store token
      TokenService.setAccessToken(response.jwt);

      return { response: authResponse, errors: null };
    } catch (error) {
      return {
        response: null,
        errors: [{ code: "AUTH_ERROR", message: (error as Error).message }],
      };
    }
  }

  static async logout(): Promise<void> {
    TokenService.clearTokens();
  }

  static async getCurrentUser(): Promise<ApiResponse<UserInfo>> {
    try {
      const response = await HttpClient.get<UserInfo>(ENDPOINT.AUTH.ME);
      return { response, errors: null };
    } catch (error) {
      return {
        response: null,
        errors: [{ code: "USER_ERROR", message: (error as Error).message }],
      };
    }
  }

  static async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await HttpClient.post<{ jwt: string; user: UserInfo }>(
        ENDPOINT.AUTH.REGISTER,
        data,
        { withAuth: false }
      );

      const authResponse: AuthResponse = {
        accessToken: response.jwt,
        user: response.user,
      };

      TokenService.setAccessToken(response.jwt);

      return { response: authResponse, errors: null };
    } catch (error) {
      return {
        response: null,
        errors: [{ code: "REGISTER_ERROR", message: (error as Error).message }],
      };
    }
  }

  static isAuthenticated(): boolean {
    return TokenService.hasValidToken();
  }
}

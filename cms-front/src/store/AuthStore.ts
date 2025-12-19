import { makeObservable, observable, action, computed } from "mobx";
import { BaseStore } from "./BaseStore";
import { AuthService, TokenService } from "@/src/services";
import type { UserInfo, LoginRequest } from "@/src/app/lib/model/auth-model";

export class AuthStore extends BaseStore {
  @observable user: UserInfo | null = null;
  @observable isAuthenticated = false;

  private onLoginSuccessCallback?: (user: UserInfo) => void;

  constructor() {
    super();
    makeObservable(this);
    this.initializeAuth();
  }

  @action
  private initializeAuth(): void {
    if (typeof window === "undefined") return;
    
    const token = TokenService.getAccessToken();
    if (token && !TokenService.isTokenExpired(token)) {
      this.isAuthenticated = true;
      this.fetchCurrentUser();
    }
  }

  @computed
  get token(): string | null {
    return TokenService.getAccessToken();
  }

  @computed
  get refreshToken(): string | null {
    return TokenService.getRefreshToken();
  }

  @computed
  get userId(): number | null {
    return this.user?.id || TokenService.getUserIdFromToken();
  }

  onLoginSuccess(callback: (user: UserInfo) => void): void {
    this.onLoginSuccessCallback = callback;
  }

  @action
  async login(credentials: LoginRequest): Promise<boolean> {
    this.setLoading(true);
    this.clearError();

    try {
      const result = await AuthService.login(credentials);

      if (result.response) {
        this.isAuthenticated = true;
        if (result.response.user) {
          this.user = result.response.user;
          this.onLoginSuccessCallback?.(result.response.user);
        } else {
          await this.fetchCurrentUser();
        }
        this.setLoading(false);
        return true;
      }

      if (result.errors?.length) {
        this.setError(result.errors[0].message);
      }
      this.setLoading(false);
      return false;
    } catch (error) {
      this.setError((error as Error).message);
      this.setLoading(false);
      return false;
    }
  }

  @action
  async logout(): Promise<void> {
    await AuthService.logout();
    this.user = null;
    this.isAuthenticated = false;
  }

  @action
  async fetchCurrentUser(): Promise<void> {
    const result = await AuthService.getCurrentUser();
    if (result.response) {
      this.user = result.response;
      this.onLoginSuccessCallback?.(result.response);
    }
  }

  @action
  setUser(user: UserInfo | null): void {
    this.user = user;
    this.isAuthenticated = !!user;
  }
}

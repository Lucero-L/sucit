import { makeObservable, observable, action } from "mobx";
import { BaseStore } from "./BaseStore";

export type ToastSeverity = "success" | "info" | "warn" | "error";

export interface ToastMessage {
  severity: ToastSeverity;
  summary: string;
  detail?: string;
  life?: number;
}

export class UiStore extends BaseStore {
  @observable sidebarVisible = true;
  @observable darkMode = false;
  @observable toastMessage: ToastMessage | null = null;
  @observable confirmDialogVisible = false;
  @observable globalLoading = false;

  constructor() {
    super();
    makeObservable(this);
    this.initializeDarkMode();
  }

  @action
  private initializeDarkMode(): void {
    if (typeof window === "undefined") return;
    
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      this.darkMode = stored === "true";
    } else {
      this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  }

  @action
  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  @action
  setSidebarVisible(visible: boolean): void {
    this.sidebarVisible = visible;
  }

  @action
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(this.darkMode));
    }
  }

  @action
  setDarkMode(dark: boolean): void {
    this.darkMode = dark;
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(dark));
    }
  }

  @action
  showToast(message: ToastMessage): void {
    this.toastMessage = message;
  }

  @action
  showSuccess(summary: string, detail?: string): void {
    this.showToast({ severity: "success", summary, detail });
  }

  @action
  showError(summary: string, detail?: string): void {
    this.showToast({ severity: "error", summary, detail });
  }

  @action
  showWarn(summary: string, detail?: string): void {
    this.showToast({ severity: "warn", summary, detail });
  }

  @action
  showInfo(summary: string, detail?: string): void {
    this.showToast({ severity: "info", summary, detail });
  }

  @action
  clearToast(): void {
    this.toastMessage = null;
  }

  @action
  setGlobalLoading(loading: boolean): void {
    this.globalLoading = loading;
  }
}

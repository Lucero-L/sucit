import { makeObservable, observable, action } from "mobx";

export abstract class BaseStore {
  @observable isLoading = false;
  @observable error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  @action
  setError(error: string | null): void {
    this.error = error;
  }

  @action
  clearError(): void {
    this.error = null;
  }
}

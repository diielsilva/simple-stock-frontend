import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ErrorService {
  private hasErrors: boolean = false;

  constructor() { }

  public getHasErrors(): boolean {
    return this.hasErrors;
  }

  public displayErrors(): void {
    this.hasErrors = true;
  }

  public hiddenErrors(): void {
    this.hasErrors = false;
  }
}

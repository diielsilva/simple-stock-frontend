import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class DialogService {
  private display: boolean = false;

  constructor() { }

  public getDisplayDialog(): boolean {
    return this.display;
  }

  public displayDialog(): void {
    this.display = true;
  }

  public hiddenDialog(): void {
    this.display = false;
  }

}

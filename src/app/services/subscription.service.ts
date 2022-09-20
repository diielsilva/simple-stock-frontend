import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'any'
})
export class SubscriptionService {
  private subscriptions$: Subscription[] = [];

  constructor() { }

  public addSubscription(subscription$: Subscription): void {
    this.subscriptions$.push(subscription$);
  }

  public cleanSubscriptions(): void {
    for (let subscription$ of this.subscriptions$) { subscription$.unsubscribe(); }
    this.resetSubscriptions();
  }

  private resetSubscriptions(): void {
    this.subscriptions$ = [];
  }
}
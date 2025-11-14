import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'danger' | 'info' | 'warning';

export interface Alert {
  message: string;
  type: AlertType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alerts$ = this.alertSubject.asObservable();

  show(message: string, type: AlertType = 'info', duration: number = 3000) {
    this.alertSubject.next({ message, type, duration });
    setTimeout(() => this.clear(), duration);
  }

  success(msg: string, duration?: number) { this.show(msg, 'success', duration); }
  error(msg: string, duration?: number) { this.show(msg, 'danger', duration); }
  info(msg: string, duration?: number) { this.show(msg, 'info', duration); }
  warning(msg: string, duration?: number) { this.show(msg, 'warning', duration); }

  clear() { this.alertSubject.next(null); }
}

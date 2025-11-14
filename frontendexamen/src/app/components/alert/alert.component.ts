import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Alert, AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `
    <div *ngIf="alert" class="toast" [ngClass]="alert.type">
      {{ alert.message }}
      <button class="close-btn" (click)="dismiss()">×</button>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: bold;
      color: white;
      min-width: 250px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      animation: fadeIn 0.3s;
    }
    .success { background-color: #28a745; }
    .danger { background-color: #dc3545; }
    .info { background-color: #17a2b8; }
    .warning { background-color: #ffc107; color: black; }
    .close-btn { background: transparent; border: none; color: inherit; cursor: pointer; font-size: 1.2rem; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AlertComponent {
  alert: Alert | null = null;

  constructor(private alertService: AlertsService) {
    this.alertService.alerts$.subscribe(a => this.alert = a);
  }

  dismiss() { this.alertService.clear(); }
}

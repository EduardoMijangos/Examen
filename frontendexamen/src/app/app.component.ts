import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DpendenciaListComponent } from "./components/dpendencia-list/dpendencia-list.component";
import { DpendenciaFormComponent } from './components/dpendencia-form/dpendencia-form.component';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DpendenciaListComponent,
    DpendenciaFormComponent,
    AlertComponent
  ],
  template: `
    <!-- GLOBAL ALERTS -->
    <app-alert></app-alert>

    <div class="app-container">
      <h1 class="title">Gestión de Dependencias</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container { max-width: 800px; margin: 2rem auto; font-family: sans-serif; }
    .title { text-align: center; margin-bottom: 2rem; color: #333; }
  `]
})
export class AppComponent {}

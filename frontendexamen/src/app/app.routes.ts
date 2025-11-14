import { Routes } from '@angular/router';
import { DpendenciaListComponent } from './components/dpendencia-list/dpendencia-list.component';
import { DpendenciaFormComponent } from './components/dpendencia-form/dpendencia-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dependencias', pathMatch: 'full' },
  { path: 'dependencias', component: DpendenciaListComponent },
  { path: 'dependencias/nueva', component: DpendenciaFormComponent },
  { path: 'dependencias/editar/:id', component: DpendenciaFormComponent },
  { path: '**', redirectTo: 'dependencias' }
];

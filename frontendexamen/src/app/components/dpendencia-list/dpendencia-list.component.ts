import { Component, OnInit } from '@angular/core';
import { Dependencia, DependenciaService, Page } from '../../services/dependecia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DpendenciaFormComponent } from '../dpendencia-form/dpendencia-form.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dpendencia-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dpendencia-list.component.html',
  styleUrl: './dpendencia-list.component.css'
})
export class DpendenciaListComponent implements OnInit {

  dependencias: Dependencia[] = [];
  filtro: string = '';
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  cargando = false;
  error = '';

  constructor(private service: DependenciaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDependencias();
  }

  cargarDependencias(): void {
    this.cargando = true;
    this.error = '';
    this.service.getDependencias(this.filtro, this.page, this.size).subscribe({
      next: (data: Page<Dependencia>) => {
        this.dependencias = data.content;
        this.totalPages = data.totalPages;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar dependencias';
        this.cargando = false;
      }
    });
  }

  buscar(): void {
    this.page = 0;
    this.cargarDependencias();
  }

  cambiarPagina(delta: number): void {
    const nueva = this.page + delta;
    if (nueva >= 0 && nueva < this.totalPages) {
      this.page = nueva;
      this.cargarDependencias();
    }
  }

  irANuevo(): void {
    this.router.navigate(['/dependencias/nueva']);
  }

  editar(id: number): void {
    this.router.navigate(['/dependencias/editar', id]);
  }

  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar esta dependencia?')) return;
    this.service.eliminar(id).subscribe({
      next: () => this.cargarDependencias(),
      error: () => this.error = 'Error al eliminar dependencia'
    });
  }

  toggleActivo(dep: Dependencia): void {
    const obs = dep.activo ? this.service.desactivar(dep.id!) : this.service.activar(dep.id!);
    obs.subscribe({ next: () => this.cargarDependencias(), error: () => this.error = 'Error al cambiar estado' });
  }

  capitalize(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

formatPhone(num: string | number): string {
  if (!num) return '';
  const digits = num.toString().replace(/\D/g, '');
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

}
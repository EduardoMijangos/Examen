import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dependencia, DependenciaService } from '../../services/dependecia.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-dpendencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dpendencia-form.component.html',
  styleUrls: ['./dpendencia-form.component.css']
})
export class DpendenciaFormComponent implements OnInit {

  dependencia: Dependencia = {
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    activo: true
  };

  cargando: boolean = false;

  constructor(
    private service: DependenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargando = true;
      this.service.getById(+id).subscribe({
        next: (dep) => {
          this.dependencia = dep;
          this.cargando = false;
        },
        error: () => {
          this.alertService.error('No se pudo cargar la dependencia');
          this.cargando = false;
        }
      });
    }
  }

guardar(form: NgForm) {
  if (!form.valid) {
    this.alertService.error('Por favor revisa los campos obligatorios y su formato');
    return;
  }

  const obs = this.dependencia.id
    ? this.service.actualizar(this.dependencia.id, this.dependencia)
    : this.service.crear(this.dependencia);

  obs.subscribe({
    next: () => {
      this.alertService.success('Dependencia guardada correctamente');
      this.router.navigate(['/dependencias']);
    },
    error: () => this.alertService.error('Error al guardar dependencia')
  });
}


}

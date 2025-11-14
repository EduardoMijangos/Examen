import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dependencia {
  id?: number;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  fechaRegistro?: string;
  fechaActualizacion?: string;
  activo: boolean;
}


export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  private apiUrl = 'http://localhost:8080/dependencias';

  constructor(private http: HttpClient) { }

getDependencias(nombre: string, page: number, size: number): Observable<Page<Dependencia>> {
  return this.http.get<Page<Dependencia>>(
    `http://localhost:8080/dependencias?page=${page}&size=${size}&nombre=${nombre}`
  );
}


  getById(id: number) {
  return this.http.get<Dependencia>(`http://localhost:8080/dependencias/${id}`);
}

  crear(dependencia: Dependencia): Observable<Dependencia> {
    return this.http.post<Dependencia>(this.apiUrl, dependencia);
  }

  actualizar(id: number, dependencia: Dependencia): Observable<Dependencia> {
    return this.http.put<Dependencia>(`${this.apiUrl}/${id}`, dependencia);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }

  desactivar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }
}

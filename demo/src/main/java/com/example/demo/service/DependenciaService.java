package com.example.demo.service;

import com.example.demo.entity.Dependencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface DependenciaService {
    Dependencia crear(Dependencia dependencia);
    Dependencia actualizar(Long id, Dependencia dependencia);
    void activarDesactivar(Long id, boolean activo);
    void eliminar(Long id);
    Page<Dependencia> listar(String nombre, String correo, Boolean activo, Pageable pageable);
    Optional<Dependencia> obtenerPorId(Long id);
}

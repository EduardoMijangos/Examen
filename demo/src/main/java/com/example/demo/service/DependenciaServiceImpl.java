package com.example.demo.service;

import com.example.demo.entity.Dependencia;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.DependenciaRepository;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DependenciaServiceImpl implements DependenciaService {

    private final DependenciaRepository repo;

    public DependenciaServiceImpl(DependenciaRepository repo) {
        this.repo = repo;
    }

    @Override
    public Dependencia crear(Dependencia dependencia) {
        return repo.save(dependencia);
    }

    @Override
    public Dependencia actualizar(Long id, Dependencia dependencia) {
        Dependencia existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependencia no encontrada"));

        existing.setNombre(dependencia.getNombre());
        existing.setDireccion(dependencia.getDireccion());
        existing.setTelefono(dependencia.getTelefono());
        existing.setCorreo(dependencia.getCorreo());
        existing.setActivo(dependencia.isActivo());

        return repo.save(existing);
    }


    @Override
    public void activarDesactivar(Long id, boolean activo) {
        Dependencia dep = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependencia no encontrada"));
        dep.setActivo(activo);
        repo.save(dep);
    }

    @Override
    public void eliminar(Long id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("Dependencia no encontrada");
        repo.deleteById(id);
    }

    @Override
    public Page<Dependencia> listar(String nombre, String correo, Boolean activo, Pageable pageable) {
        Specification<Dependencia> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (nombre != null && !nombre.isEmpty())
                predicates.add(cb.like(cb.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
            if (correo != null) predicates.add(cb.like(cb.lower(root.get("correo")), "%" + correo.toLowerCase() + "%"));
            if (activo != null) predicates.add(cb.equal(root.get("activo"), activo));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        return repo.findAll(spec, pageable);
    }

    @Override
    public Optional<Dependencia> obtenerPorId(Long id) {
        return repo.findById(id);
    }
}

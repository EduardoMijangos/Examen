package com.example.demo.controller;

import com.example.demo.entity.Dependencia;
import com.example.demo.service.DependenciaService;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dependencias")
@CrossOrigin(origins = "http://localhost:4200") 
public class DependenciaController {

    private final DependenciaService service;

    public DependenciaController(DependenciaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Dependencia> crear(@Validated @RequestBody Dependencia dep) {
        return new ResponseEntity<>(service.crear(dep), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dependencia> actualizar(@PathVariable Long id, @Validated @RequestBody Dependencia dep) {
        return ResponseEntity.ok(service.actualizar(id, dep));
    }

    @PatchMapping("/{id}/activar")
    public ResponseEntity<Void> activar(@PathVariable Long id) {
        service.activarDesactivar(id, true);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {
        service.activarDesactivar(id, false);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<Dependencia>> listar(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String correo,
            @RequestParam(required = false) Boolean activo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return ResponseEntity.ok(service.listar(nombre, correo, activo, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dependencia> getById(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

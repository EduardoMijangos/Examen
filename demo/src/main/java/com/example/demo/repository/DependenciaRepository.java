package com.example.demo.repository;

import com.example.demo.entity.Dependencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DependenciaRepository extends JpaRepository<Dependencia, Long>,
        JpaSpecificationExecutor<Dependencia> {
}

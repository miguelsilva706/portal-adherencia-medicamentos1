package com.certus.adherencia.repository;

import com.certus.adherencia.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Optional<Paciente> findByUsuarioId(Long usuarioId);
    List<Paciente> findByCuidadorId(Long cuidadorId);
}

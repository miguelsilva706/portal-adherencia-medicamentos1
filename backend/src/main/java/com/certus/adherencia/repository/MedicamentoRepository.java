package com.certus.adherencia.repository;

import com.certus.adherencia.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
    List<Medicamento> findByPacienteId(Long pacienteId);
    List<Medicamento> findByPacienteIdAndActivoTrue(Long pacienteId);
}

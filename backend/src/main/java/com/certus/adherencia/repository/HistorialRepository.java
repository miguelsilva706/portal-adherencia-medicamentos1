package com.certus.adherencia.repository;

import com.certus.adherencia.entity.HistorialAdherencia;
import com.certus.adherencia.entity.HistorialAdherencia.EstadoAdherencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface HistorialRepository extends JpaRepository<HistorialAdherencia, Long> {

    List<HistorialAdherencia> findByMedicamentoId(Long medicamentoId);

    List<HistorialAdherencia> findByEstado(EstadoAdherencia estado);

    List<HistorialAdherencia> findByFechaHoraBetween(
            LocalDateTime inicio,
            LocalDateTime fin
    );

    List<HistorialAdherencia> findByMedicamentoIdAndEstado(
            Long medicamentoId,
            EstadoAdherencia estado
    );

}
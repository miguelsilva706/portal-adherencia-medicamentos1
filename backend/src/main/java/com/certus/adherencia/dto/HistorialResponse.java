package com.certus.adherencia.dto;

import com.certus.adherencia.entity.HistorialAdherencia.EstadoAdherencia;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HistorialResponse {

    private Long id;

    private Long recordatorioId;

    private Long medicamentoId;

    private String medicamentoNombre;

    private LocalDateTime fechaHora;

    private EstadoAdherencia estado;

    private String observacion;

}
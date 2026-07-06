package com.certus.adherencia.dto;

import com.certus.adherencia.entity.HistorialAdherencia.EstadoAdherencia;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HistorialRequest {

    @NotNull(message = "El recordatorio es obligatorio")
    private Long recordatorioId;

    @NotNull(message = "El medicamento es obligatorio")
    private Long medicamentoId;

    @NotNull(message = "El estado es obligatorio")
    private EstadoAdherencia estado;

    private String observacion;

}
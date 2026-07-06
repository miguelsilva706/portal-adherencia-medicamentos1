package com.certus.adherencia.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class RecordatorioResponse {

    private Long id;

    private Long medicamentoId;

    private String medicamentoNombre;

    private LocalTime hora;

    private String diasSemana;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private Boolean activo;
}
package com.certus.adherencia.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RecordatorioRequest {

    @NotNull
    private Long medicamentoId;

    @NotNull
    private LocalTime hora;

    @NotBlank
    private String diasSemana;

    @NotNull
    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private Boolean activo = true;
}
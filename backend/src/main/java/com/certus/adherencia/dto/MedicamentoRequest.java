package com.certus.adherencia.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MedicamentoRequest {

    @NotNull
    private Long pacienteId;

    @NotBlank
    private String nombre;

    private String categoria;

    @NotBlank
    private String dosis;

    @NotBlank
    private String frecuencia;

    private String instrucciones;

    private Boolean activo = true;
}
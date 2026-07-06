package com.certus.adherencia.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicamentoResponse {

    private Long id;

    private Long pacienteId;

    private String nombre;

    private String categoria;

    private String dosis;

    private String frecuencia;

    private String instrucciones;

    private Boolean activo;
}
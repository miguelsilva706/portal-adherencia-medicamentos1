package com.certus.adherencia.dto;

import lombok.Data;

@Data
public class PacienteRequest {

    private Long usuarioId;
    private Long cuidadorId; // opcional
    private String codigoPaciente;
    private String condicionesMedicas;
}
package com.certus.adherencia.dto;

import lombok.Data;

@Data
public class PacienteResponse {

    private Long id;
    private String codigoPaciente;
    private String condicionesMedicas;
    private Boolean cuentaActiva;
    private Long usuarioId;
    private Long cuidadorId;
}
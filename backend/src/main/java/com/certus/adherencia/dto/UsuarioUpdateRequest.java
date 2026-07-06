package com.certus.adherencia.dto;

import lombok.Data;

@Data
public class UsuarioUpdateRequest {
    private String nombreCompleto;
    private String telefono;
}
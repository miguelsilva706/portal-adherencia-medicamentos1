package com.certus.adherencia.dto;

import lombok.Data;

@Data
public class UsuarioResponse {
    private Long id;
    private String nombreCompleto;
    private String correo;
    private String telefono;
    private String rol;
    private Boolean activo;
}
package com.certus.adherencia.dto;

import lombok.Data;

@Data
public class PasswordRequest {
    private String passwordActual;
    private String passwordNueva;
}
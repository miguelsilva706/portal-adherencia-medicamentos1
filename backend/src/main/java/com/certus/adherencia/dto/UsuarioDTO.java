package com.certus.adherencia.dto;

import com.certus.adherencia.entity.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String nombreCompleto;
    private String correo;
    private String telefono;
    private LocalDate fechaNacimiento;
    private Rol rol;
    private Boolean activo;
}

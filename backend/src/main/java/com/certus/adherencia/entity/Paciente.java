package com.certus.adherencia.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Datos clínicos/administrativos del paciente, vinculados 1-a-1 con un Usuario
 * de rol PACIENTE. El cuidador asignado también es un Usuario (rol CUIDADOR).
 */
@Entity
@Table(name = "pacientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "cuidador_id")
    private Usuario cuidador;

    @Column(length = 20)
    private String codigoPaciente;

    @Column(columnDefinition = "TEXT")
    private String condicionesMedicas;

    @Column(nullable = false)
    @Builder.Default
    private Boolean cuentaActiva = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn;

    @PrePersist
    protected void alCrear() {
        creadoEn = LocalDateTime.now();
    }
}

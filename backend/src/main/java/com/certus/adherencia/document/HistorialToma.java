package com.certus.adherencia.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Documento MongoDB para el historial de cumplimiento / trazabilidad.
 * Se usa MongoDB (y no MySQL) porque estos registros crecen con alta
 * frecuencia (una entrada por cada toma/evento) y no requieren
 * relaciones estrictas, según el diseño de persistencia políglota
 * definido en la documentación de arquitectura.
 */
@Document(collection = "historial_tomas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialToma {

    @Id
    private String id;

    private Long pacienteId;
    private Long medicamentoId;
    private Long recordatorioId;

    private String nombreMedicamento;
    private String dosis;

    /** COMPLETADO, OMITIDO, RETRASADO */
    private String estado;

    private LocalDateTime horaProgramada;
    private LocalDateTime horaRegistrada;

    private String observaciones;

    private LocalDateTime creadoEn;
}

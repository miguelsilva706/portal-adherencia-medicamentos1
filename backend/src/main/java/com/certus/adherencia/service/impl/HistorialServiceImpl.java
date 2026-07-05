package com.certus.adherencia.service.impl;

import com.certus.adherencia.dto.HistorialRequest;
import com.certus.adherencia.dto.HistorialResponse;
import com.certus.adherencia.entity.HistorialAdherencia;
import com.certus.adherencia.entity.Medicamento;
import com.certus.adherencia.entity.Recordatorio;
import com.certus.adherencia.repository.HistorialRepository;
import com.certus.adherencia.repository.MedicamentoRepository;
import com.certus.adherencia.repository.RecordatorioRepository;
import com.certus.adherencia.service.HistorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistorialServiceImpl implements HistorialService {

    private final HistorialRepository historialRepository;
    private final MedicamentoRepository medicamentoRepository;
    private final RecordatorioRepository recordatorioRepository;

    @Override
    public List<HistorialResponse> listar() {
        return historialRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public HistorialResponse obtenerPorId(Long id) {
        HistorialAdherencia h = historialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historial no encontrado"));
        return mapToResponse(h);
    }

    @Override
    public HistorialResponse registrar(HistorialRequest request) {

        Medicamento medicamento = medicamentoRepository.findById(request.getMedicamentoId())
                .orElseThrow(() -> new RuntimeException("Medicamento no encontrado"));

        Recordatorio recordatorio = recordatorioRepository.findById(request.getRecordatorioId())
                .orElseThrow(() -> new RuntimeException("Recordatorio no encontrado"));

        HistorialAdherencia historial = HistorialAdherencia.builder()
                .medicamento(medicamento)
                .recordatorio(recordatorio)
                .estado(request.getEstado())
                .observacion(request.getObservacion())
                .fechaHora(LocalDateTime.now())
                .build();

        historial = historialRepository.save(historial);

        return mapToResponse(historial);
    }

    @Override
    public HistorialResponse actualizar(Long id, HistorialRequest request) {

        HistorialAdherencia historial = historialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historial no encontrado"));

        historial.setEstado(request.getEstado());
        historial.setObservacion(request.getObservacion());

        historial = historialRepository.save(historial);

        return mapToResponse(historial);
    }

    @Override
    public void eliminar(Long id) {
        historialRepository.deleteById(id);
    }

    @Override
    public List<HistorialResponse> listarPorEstado(HistorialAdherencia.EstadoAdherencia estado) {
        return historialRepository.findByEstado(estado)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private HistorialResponse mapToResponse(HistorialAdherencia h) {
        return HistorialResponse.builder()
                .id(h.getId())
                .medicamentoId(h.getMedicamento().getId())
                .medicamentoNombre(h.getMedicamento().getNombre())
                .recordatorioId(h.getRecordatorio().getId())
                .fechaHora(h.getFechaHora())
                .estado(h.getEstado())
                .observacion(h.getObservacion())
                .build();
    }
}
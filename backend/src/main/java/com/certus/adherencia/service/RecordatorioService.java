package com.certus.adherencia.service;

import com.certus.adherencia.dto.RecordatorioRequest;
import com.certus.adherencia.dto.RecordatorioResponse;
import com.certus.adherencia.entity.Medicamento;
import com.certus.adherencia.entity.Recordatorio;
import com.certus.adherencia.exception.RecursoNoEncontradoException;
import com.certus.adherencia.repository.MedicamentoRepository;
import com.certus.adherencia.repository.RecordatorioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordatorioService {

    private final RecordatorioRepository recordatorioRepository;
    private final MedicamentoRepository medicamentoRepository;

    public List<RecordatorioResponse> listarTodos() {

        return recordatorioRepository.findAll()
                .stream()
                .map(this::aResponse)
                .toList();
    }

    public RecordatorioResponse buscarPorId(Long id) {

        Recordatorio recordatorio = recordatorioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Recordatorio no encontrado"));

        return aResponse(recordatorio);
    }

    public RecordatorioResponse crear(RecordatorioRequest request) {

        Medicamento medicamento = medicamentoRepository.findById(request.getMedicamentoId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Medicamento no encontrado"));

        Recordatorio recordatorio = Recordatorio.builder()
                .medicamento(medicamento)
                .hora(request.getHora())
                .diasSemana(request.getDiasSemana())
                .fechaInicio(request.getFechaInicio())
                .fechaFin(request.getFechaFin())
                .activo(request.getActivo())
                .build();

        recordatorio = recordatorioRepository.save(recordatorio);

        return aResponse(recordatorio);
    }

    public RecordatorioResponse actualizar(Long id, RecordatorioRequest request) {

        Recordatorio recordatorio = recordatorioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Recordatorio no encontrado"));

        Medicamento medicamento = medicamentoRepository.findById(request.getMedicamentoId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Medicamento no encontrado"));

        recordatorio.setMedicamento(medicamento);
        recordatorio.setHora(request.getHora());
        recordatorio.setDiasSemana(request.getDiasSemana());
        recordatorio.setFechaInicio(request.getFechaInicio());
        recordatorio.setFechaFin(request.getFechaFin());
        recordatorio.setActivo(request.getActivo());

        recordatorio = recordatorioRepository.save(recordatorio);

        return aResponse(recordatorio);
    }

    public void eliminar(Long id) {

        Recordatorio recordatorio = recordatorioRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Recordatorio no encontrado"));

        recordatorioRepository.delete(recordatorio);
    }

    private RecordatorioResponse aResponse(Recordatorio recordatorio) {

        return RecordatorioResponse.builder()
                .id(recordatorio.getId())
                .medicamentoId(recordatorio.getMedicamento().getId())
                .medicamentoNombre(recordatorio.getMedicamento().getNombre())
                .hora(recordatorio.getHora())
                .diasSemana(recordatorio.getDiasSemana())
                .fechaInicio(recordatorio.getFechaInicio())
                .fechaFin(recordatorio.getFechaFin())
                .activo(recordatorio.getActivo())
                .build();
    }
}
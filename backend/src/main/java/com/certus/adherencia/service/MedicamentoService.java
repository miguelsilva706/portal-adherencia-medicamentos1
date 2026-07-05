package com.certus.adherencia.service;

import com.certus.adherencia.dto.MedicamentoRequest;
import com.certus.adherencia.dto.MedicamentoResponse;
import com.certus.adherencia.entity.Medicamento;
import com.certus.adherencia.entity.Paciente;
import com.certus.adherencia.exception.RecursoNoEncontradoException;
import com.certus.adherencia.repository.MedicamentoRepository;
import com.certus.adherencia.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;
    private final PacienteRepository pacienteRepository;

    public List<MedicamentoResponse> listarTodos() {
        return medicamentoRepository.findAll()
                .stream()
                .map(this::aResponse)
                .toList();
    }

    public MedicamentoResponse buscarPorId(Long id) {

        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Medicamento no encontrado"));

        return aResponse(medicamento);
    }

    public MedicamentoResponse crear(MedicamentoRequest request) {

        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Paciente no encontrado"));

        Medicamento medicamento = Medicamento.builder()
                .paciente(paciente)
                .nombre(request.getNombre())
                .categoria(request.getCategoria())
                .dosis(request.getDosis())
                .frecuencia(request.getFrecuencia())
                .instrucciones(request.getInstrucciones())
                .activo(request.getActivo())
                .build();

        medicamento = medicamentoRepository.save(medicamento);

        return aResponse(medicamento);
    }

    public MedicamentoResponse actualizar(Long id, MedicamentoRequest request) {

        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Medicamento no encontrado"));

        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Paciente no encontrado"));

        medicamento.setPaciente(paciente);
        medicamento.setNombre(request.getNombre());
        medicamento.setCategoria(request.getCategoria());
        medicamento.setDosis(request.getDosis());
        medicamento.setFrecuencia(request.getFrecuencia());
        medicamento.setInstrucciones(request.getInstrucciones());
        medicamento.setActivo(request.getActivo());

        medicamento = medicamentoRepository.save(medicamento);

        return aResponse(medicamento);
    }

    public void eliminar(Long id) {

        Medicamento medicamento = medicamentoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Medicamento no encontrado"));

        medicamentoRepository.delete(medicamento);
    }

    private MedicamentoResponse aResponse(Medicamento medicamento) {

        return MedicamentoResponse.builder()
                .id(medicamento.getId())
                .pacienteId(medicamento.getPaciente().getId())
                .nombre(medicamento.getNombre())
                .categoria(medicamento.getCategoria())
                .dosis(medicamento.getDosis())
                .frecuencia(medicamento.getFrecuencia())
                .instrucciones(medicamento.getInstrucciones())
                .activo(medicamento.getActivo())
                .build();
    }
}
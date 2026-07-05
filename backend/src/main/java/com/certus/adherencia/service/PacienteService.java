package com.certus.adherencia.service;

import com.certus.adherencia.dto.PacienteRequest;
import com.certus.adherencia.dto.PacienteResponse;

import java.util.List;

public interface PacienteService {

    PacienteResponse crear(PacienteRequest request);

    List<PacienteResponse> listar();

    PacienteResponse obtenerPorId(Long id);
}
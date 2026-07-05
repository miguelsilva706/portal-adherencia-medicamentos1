package com.certus.adherencia.service;

import com.certus.adherencia.dto.HistorialRequest;
import com.certus.adherencia.dto.HistorialResponse;
import com.certus.adherencia.entity.HistorialAdherencia.EstadoAdherencia;

import java.util.List;

public interface HistorialService {

    List<HistorialResponse> listar();

    HistorialResponse obtenerPorId(Long id);

    HistorialResponse registrar(HistorialRequest request);

    HistorialResponse actualizar(Long id, HistorialRequest request);

    void eliminar(Long id);

    Object listarPorEstado(EstadoAdherencia estado);

}
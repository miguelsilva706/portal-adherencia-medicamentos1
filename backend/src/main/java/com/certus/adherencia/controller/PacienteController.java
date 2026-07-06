package com.certus.adherencia.controller;

import com.certus.adherencia.dto.PacienteRequest;
import com.certus.adherencia.dto.PacienteResponse;
import com.certus.adherencia.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public PacienteResponse crear(@RequestBody PacienteRequest request) {
        return pacienteService.crear(request);
    }

    @GetMapping
    public List<PacienteResponse> listar() {
        return pacienteService.listar();
    }

    @GetMapping("/{id}")
    public PacienteResponse obtener(@PathVariable Long id) {
        return pacienteService.obtenerPorId(id);
    }
}
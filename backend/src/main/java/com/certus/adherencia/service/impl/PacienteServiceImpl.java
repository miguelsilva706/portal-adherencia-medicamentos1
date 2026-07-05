package com.certus.adherencia.service.impl;

import com.certus.adherencia.dto.PacienteRequest;
import com.certus.adherencia.dto.PacienteResponse;
import com.certus.adherencia.entity.Paciente;
import com.certus.adherencia.entity.Usuario;
import com.certus.adherencia.repository.PacienteRepository;
import com.certus.adherencia.repository.UsuarioRepository;
import com.certus.adherencia.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public PacienteResponse crear(PacienteRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Usuario cuidador = null;

        if (request.getCuidadorId() != null) {
            cuidador = usuarioRepository.findById(request.getCuidadorId())
                    .orElseThrow(() -> new RuntimeException("Cuidador no encontrado"));
        }

        Paciente paciente = Paciente.builder()
                .usuario(usuario)
                .cuidador(cuidador)
                .codigoPaciente(request.getCodigoPaciente())
                .condicionesMedicas(request.getCondicionesMedicas())
                .cuentaActiva(true)
                .build();

        paciente = pacienteRepository.save(paciente);

        PacienteResponse response = new PacienteResponse();
        response.setId(paciente.getId());
        response.setCodigoPaciente(paciente.getCodigoPaciente());
        response.setCondicionesMedicas(paciente.getCondicionesMedicas());
        response.setCuentaActiva(paciente.getCuentaActiva());
        response.setUsuarioId(usuario.getId());
        response.setCuidadorId(cuidador != null ? cuidador.getId() : null);

        return response;
    }

    @Override
    public List<PacienteResponse> listar() {
        return pacienteRepository.findAll().stream().map(p -> {
            PacienteResponse r = new PacienteResponse();
            r.setId(p.getId());
            r.setCodigoPaciente(p.getCodigoPaciente());
            r.setCondicionesMedicas(p.getCondicionesMedicas());
            r.setCuentaActiva(p.getCuentaActiva());
            r.setUsuarioId(p.getUsuario().getId());
            r.setCuidadorId(p.getCuidador() != null ? p.getCuidador().getId() : null);
            return r;
        }).toList();
    }

    @Override
    public PacienteResponse obtenerPorId(Long id) {
        Paciente p = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        PacienteResponse r = new PacienteResponse();
        r.setId(p.getId());
        r.setCodigoPaciente(p.getCodigoPaciente());
        r.setCondicionesMedicas(p.getCondicionesMedicas());
        r.setCuentaActiva(p.getCuentaActiva());
        r.setUsuarioId(p.getUsuario().getId());
        r.setCuidadorId(p.getCuidador() != null ? p.getCuidador().getId() : null);

        return r;
    }
}
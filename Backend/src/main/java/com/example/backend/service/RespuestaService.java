package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.stereotype.Service;

@Service
public class RespuestaService {

    private final RespuestaRepository respuestaRepository;
    private final PreguntaRepository preguntaRepository;
    private final OpcionRepository opcionRepository;
    private final UsuarioRepository usuarioRepository;

    public RespuestaService(RespuestaRepository respuestaRepository, PreguntaRepository preguntaRepository, OpcionRepository opcionRepository, UsuarioRepository usuarioRepository)
    {
        this.respuestaRepository = respuestaRepository;
        this.preguntaRepository = preguntaRepository;
        this.opcionRepository = opcionRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public boolean registrarRespuesta(RespuestaRequest request, String username) throws Exception {
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(() -> new Exception("Usuario no encontrado"));

        if (respuestaRepository.existsByUsuarioIdAndPreguntaId(usuario.getId(), request.getPreguntaId()))
        {
            throw new Exception("Esta pregunta ya fue respondida");
        }

        Pregunta pregunta = preguntaRepository.findById(request.getPreguntaId()).orElseThrow(() -> new Exception("Pregunta no encontrada"));
        Opcion opcion = opcionRepository.findById(request.getOpcionId()).orElseThrow(() -> new Exception("Opción no encontrada"));

        boolean correcta = opcion.isEsCorrecta();

        respuestaRepository.save(new Respuesta(usuario, pregunta, opcion, correcta));

        return correcta;
    }

    public EstadisticasResponse obtenerEstadisticas(String username) throws Exception {
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(() -> new Exception("Usuario no encontrado"));
        long aciertos = respuestaRepository.countByUsuarioIdAndCorrectaTrue(usuario.getId());
        long fallos = respuestaRepository.countByUsuarioIdAndCorrectaFalse(usuario.getId());

        return new EstadisticasResponse(aciertos, fallos);
    }
}
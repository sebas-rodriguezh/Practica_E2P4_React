package com.example.backend.service;

import com.example.backend.model.Opcion;
import com.example.backend.model.Pregunta;
import com.example.backend.model.Usuario;
import com.example.backend.repository.PreguntaRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;
    private final UsuarioRepository usuarioRepository;

    public PreguntaService(PreguntaRepository preguntaRepository, UsuarioRepository usuarioRepository)
    {
        this.preguntaRepository = preguntaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Pregunta> buscarPorTopico(String topico, String username) throws Exception {
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(() -> new Exception("Usuario no encontrado"));
        return preguntaRepository.buscarPorTopicoExcluyendoRespondidas(topico, usuario.getId());
    }

    @Transactional
    public List<Opcion> obtenerOpciones(Long preguntaId) throws Exception {
        Pregunta pregunta = preguntaRepository.findById(preguntaId).orElseThrow(() -> new Exception("Pregunta no encontrada"));
        pregunta.getOpciones().size();
        return pregunta.getOpciones();
    }
}
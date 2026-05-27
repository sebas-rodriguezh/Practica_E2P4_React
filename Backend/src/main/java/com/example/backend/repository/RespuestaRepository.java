package com.example.backend.repository;

import com.example.backend.model.Respuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {
    boolean existsByUsuarioIdAndPreguntaId(Long usuarioId, Long preguntaId);
    long countByUsuarioId(Long usuarioId);
    long countByUsuarioIdAndCorrectaTrue(Long usuarioId);
    long countByUsuarioIdAndCorrectaFalse(Long usuarioId);
}
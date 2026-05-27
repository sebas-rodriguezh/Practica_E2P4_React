package com.example.backend.repository;

import com.example.backend.model.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreguntaRepository extends JpaRepository<Pregunta, Long> {
    @Query("""
            SELECT p FROM Pregunta p
            WHERE LOWER(p.topico) LIKE LOWER(CONCAT('%', :topico, '%'))
            AND p.id NOT IN (
                SELECT r.pregunta.id FROM Respuesta r
                WHERE r.usuario.id = :usuarioId
            )
           """)
    List<Pregunta> buscarPorTopicoExcluyendoRespondidas(@Param("topico") String topico, @Param("usuarioId") Long usuarioId);
}

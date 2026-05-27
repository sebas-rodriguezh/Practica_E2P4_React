package com.example.backend.model;

// Lo que el frontend envía al responder una pregunta.

public class RespuestaRequest {
    private Long preguntaId;
    private Long opcionId;

    public RespuestaRequest() {}

    public Long getPreguntaId() { return preguntaId; }
    public void setPreguntaId(Long preguntaId) { this.preguntaId = preguntaId; }

    public Long getOpcionId() { return opcionId; }
    public void setOpcionId(Long opcionId) { this.opcionId = opcionId; }
}
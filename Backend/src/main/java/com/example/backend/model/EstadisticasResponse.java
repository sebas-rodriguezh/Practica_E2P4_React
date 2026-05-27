package com.example.backend.model;

public class EstadisticasResponse {
    private long aciertos;
    private long fallos;
    private double nota;

    public EstadisticasResponse(long aciertos, long fallos) {
        this.aciertos = aciertos;
        this.fallos = fallos;
        long total = aciertos + fallos;
        this.nota = total == 0 ? 0 : Math.round((aciertos * 100.0 / total) * 10.0) / 10.0;
    }

    public long getAciertos() { return aciertos; }
    public long getFallos() { return fallos; }
    public double getNota() { return nota; }
}
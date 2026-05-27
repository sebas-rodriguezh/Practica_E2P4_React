import { useState, useEffect, useCallback } from "react";
import PreguntaModal from "../components/PreguntaModal";

const API = "http://localhost:8080";

function Preguntas({ usuario }) {
    const [topico, setTopico] = useState("");
    const [preguntas, setPreguntas] = useState([]);
    const [estadisticas, setEstadisticas] = useState({ aciertos: 0, fallos: 0, nota: 0 });
    const [preguntaActiva, setPreguntaActiva] = useState(null);
    const [buscado, setBuscado] = useState(false);

    const headers = { Authorization: `Bearer ${usuario.token}` };

    const cargarEstadisticas = useCallback(() => {
        fetch(`${API}/api/respuestas/estadisticas`, { headers })
            .then((r) => r.json())
            .then(setEstadisticas)
            .catch(() => {});
    }, [usuario.token, headers]);

    useEffect(() => {
        cargarEstadisticas();
    }, [cargarEstadisticas]);

    async function buscar() {
        if (!topico.trim()) return;
        try {
            const res = await fetch(
                `${API}/api/preguntas/buscar?topico=${encodeURIComponent(topico)}`,
                { headers }
            );
            const data = await res.json();
            setPreguntas(data);
            setBuscado(true);
        } catch (e) {
            console.error(e);
        }
    }

    function onRespondida() {
        buscar();
        cargarEstadisticas();
    }

    return (
        <div>
            <h4>Preguntas de Autoevaluación</h4>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <label className="me-2">Tópico:</label>
                    <input
                        type="text"
                        value={topico}
                        onChange={(e) => setTopico(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && buscar()}
                    />
                    <button className="btn btn-primary btn-sm ms-2" onClick={buscar}>Buscar</button>
                </div>
                <div>
                    <strong>Estadísticas:</strong> Aciertos: {estadisticas.aciertos} | Fallos: {estadisticas.fallos} | Nota: {estadisticas.nota}
                </div>
            </div>
            {!buscado ? (
                <p>Realice una búsqueda por tópico.</p>
            ) : preguntas.length === 0 ? (
                <p>No se encontraron resultados.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                    <tr className="table-light">
                        <th>ID</th>
                        <th>Pregunta</th>
                        <th>Tópico</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {preguntas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.pregunta}</td>
                            <td>{p.topico}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setPreguntaActiva(p)}
                                >
                                    Responder
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {preguntaActiva && (
                <PreguntaModal
                    pregunta={preguntaActiva}
                    usuario={usuario}
                    cerrar={() => setPreguntaActiva(null)}
                    onRespondida={onRespondida}
                />
            )}
        </div>
    );
}

export default Preguntas;
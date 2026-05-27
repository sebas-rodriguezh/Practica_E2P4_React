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
        <div className="container mt-4">
            <div className="row mb-4 align-items-end">
                <div className="col-md-5">
                    <label className="form-label fw-bold">Tópico:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej. Prog. Languages"
                            value={topico}
                            onChange={(e) => setTopico(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && buscar()}
                        />
                        <button className="btn btn-primary" onClick={buscar}>Buscar</button>
                    </div>
                </div>
                <div className="col-md-7 text-md-end mt-3 mt-md-0">
                    <div className="p-2 bg-white border rounded shadow-sm d-inline-block">
                        <span className="me-3">✅ Aciertos: <span className="badge bg-success">{estadisticas.aciertos}</span></span>
                        <span className="me-3">🔴 Fallos: <span className="badge bg-danger">{estadisticas.fallos}</span></span>
                        <span className="fw-bold">NOTA: <span className="badge bg-info text-dark">{estadisticas.nota}</span></span>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    {!buscado ? (
                        <div className="p-4 text-center text-muted">
                            <em>No hay datos que mostrar, ejecute una búsqueda con un tópico adecuado.</em>
                        </div>
                    ) : preguntas.length === 0 ? (
                        <div className="p-4 text-center text-danger">
                            No se encontraron preguntas disponibles para este tópico.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0">
                                <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Pregunta</th>
                                    <th>Tópico</th>
                                    <th className="text-center">Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {preguntas.map((p) => (
                                    <tr key={p.id}>
                                        <td className="align-middle">{p.id}</td>
                                        <td className="align-middle">{p.pregunta}</td>
                                        <td className="align-middle">{p.topico}</td>
                                        <td className="text-center align-middle">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => setPreguntaActiva(p)}
                                                title="Responder"
                                            >
                                                ✏️ Responder
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

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
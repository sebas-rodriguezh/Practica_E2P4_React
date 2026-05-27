import { useState, useEffect } from "react";

const API = "http://localhost:8080";

function PreguntaModal({ pregunta, usuario, cerrar, onRespondida }) {
    const [opciones, setOpciones] = useState([]);
    const [seleccionada, setSeleccionada] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API}/api/preguntas/${pregunta.id}/opciones`, {
            headers: { Authorization: `Bearer ${usuario.token}` },
        })
            .then((r) => r.json())
            .then(setOpciones)
            .catch(() => setError("Error al cargar opciones"));
    }, [pregunta.id, usuario.token]);

    async function handleRegistrar() {
        if (!seleccionada) {
            setError("Seleccione una opción");
            return;
        }
        setError("");
        try {
            const res = await fetch(`${API}/api/respuestas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usuario.token}`,
                },
                body: JSON.stringify({ preguntaId: pregunta.id, opcionId: seleccionada }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al registrar");
                return;
            }
            onRespondida();
            cerrar();
        } catch (e) {
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
            <div className="card shadow-lg" style={{ width: "400px" }}>
                <div className="card-body">
                    <h5 className="card-title text-primary mb-3">Responde la pregunta:</h5>
                    <p className="fw-bold mb-4">{pregunta.pregunta}</p>

                    <div className="mb-4">
                        {opciones.map((op) => (
                            <div key={op.id} className="form-check mb-2 border rounded p-2 bg-light">
                                <input
                                    className="form-check-input ms-1"
                                    type="radio"
                                    name="opcion"
                                    id={`opcion-${op.id}`}
                                    value={op.id}
                                    checked={seleccionada === op.id}
                                    onChange={() => setSeleccionada(op.id)}
                                />
                                <label className="form-check-label ms-2 w-100 cursor-pointer" htmlFor={`opcion-${op.id}`}>
                                    {op.texto}
                                </label>
                            </div>
                        ))}
                    </div>

                    {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" onClick={cerrar}>Cancelar</button>
                        <button className="btn btn-success" onClick={handleRegistrar}>Registrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreguntaModal;
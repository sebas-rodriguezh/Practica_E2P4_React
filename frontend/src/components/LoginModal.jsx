import { useState } from "react";

const API = "http://localhost:8080";

function LoginModal({ setUsuario, cerrar }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        setError("");
        try {
            const res = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al ingresar");
                return;
            }
            setUsuario({ token: data.token, username: data.username, name: data.name });
            cerrar();
        } catch (e) {
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
            <div className="card shadow-lg" style={{ width: "320px" }}>
                <div className="card-body">
                    <h4 className="card-title text-center mb-4">Iniciar Sesión</h4>

                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Clave</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                    </div>

                    {error && <div className="alert alert-danger py-2 mb-3" role="alert">{error}</div>}

                    <div className="d-grid gap-2 mt-4">
                        <button className="btn btn-primary" onClick={handleLogin}>Ingresar</button>
                        <button className="btn btn-secondary" onClick={cerrar}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
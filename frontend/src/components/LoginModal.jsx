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
             style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>

            <div className="bg-white p-4 border rounded" style={{ width: "300px" }}>
                <h5>Login</h5>

                <div className="mb-2">
                    <label>Usuario</label>
                    <input
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Clave</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div>
                    <button className="btn btn-primary btn-sm me-2" onClick={handleLogin}>Ingresar</button>
                    <button className="btn btn-secondary btn-sm" onClick={cerrar}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
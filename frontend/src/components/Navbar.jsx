// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar({ usuario, setUsuario }) {
    const [mostrarLogin, setMostrarLogin] = useState(false);

    function cerrarSesion() {
        setUsuario(null);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <span className="navbar-brand fw-bold">🌐 Sistema de Autoevaluación</span>

                    <div className="d-flex align-items-center">
                        <Link to="/" className="nav-link text-white me-3">Inicio</Link>

                        {usuario ? (
                            <>
                                <Link to="/questions" className="nav-link text-white me-3">Preguntas</Link>
                                <Link to="/xxx" className="nav-link text-white me-3">Página XXX</Link>
                                <Link to="/yyy" className="nav-link text-white me-3">Página YYY</Link>
                                <button className="btn btn-outline-light btn-sm ms-2" onClick={cerrarSesion}>
                                    👤 {usuario.username} (Salir)
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-primary btn-sm ms-2"
                                onClick={() => setMostrarLogin(true)}
                            >
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {mostrarLogin && (
                <LoginModal
                    setUsuario={setUsuario}
                    cerrar={() => setMostrarLogin(false)}
                />
            )}
        </>
    );
}

export default Navbar;
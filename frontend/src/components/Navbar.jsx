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
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">Sistema de Autoevaluación</Link>

                    <div>
                        <Link to="/" className="text-white me-3 text-decoration-none">Inicio</Link>

                        {usuario ? (
                            <>
                                <Link to="/questions" className="text-white me-3 text-decoration-none">Preguntas</Link>
                                <Link to="/xxx" className="text-white me-3 text-decoration-none">Página XXX</Link>
                                <Link to="/yyy" className="text-white me-3 text-decoration-none">Página YYY</Link>
                                <button className="btn btn-secondary btn-sm" onClick={cerrarSesion}>
                                    Salir ({usuario.username})
                                </button>
                            </>
                        ) : (
                            <button className="btn btn-light btn-sm" onClick={() => setMostrarLogin(true)}>
                                Iniciar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {mostrarLogin && (
                <LoginModal setUsuario={setUsuario} cerrar={() => setMostrarLogin(false)} />
            )}
        </>
    );
}

export default Navbar;
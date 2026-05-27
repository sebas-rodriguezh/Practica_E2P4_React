// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Preguntas from "./pages/Preguntas";
import PageXXX from './pages/PageXXX';
import PageYYY from './pages/PageYYY';

function App() {
    const [usuario, setUsuario] = useState(null);

    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100 bg-light">
                <Navbar usuario={usuario} setUsuario={setUsuario} />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route
                            path="/questions"
                            element={usuario ? <Preguntas usuario={usuario} /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/xxx"
                            element={usuario ? <PageXXX /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/yyy"
                            element={usuario ? <PageYYY /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
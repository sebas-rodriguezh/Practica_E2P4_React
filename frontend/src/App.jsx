import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Preguntas from "./pages/Preguntas";

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
      <BrowserRouter>
        <Navbar usuario={usuario} setUsuario={setUsuario} />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
              path="/questions"
              element={usuario ? <Preguntas usuario={usuario} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

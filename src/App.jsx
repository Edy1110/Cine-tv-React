import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Favoritos from './pages/Favoritos';
import Descripcion from './pages/Descripcion';
import './index.css'; 

export default function App() {
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (pelicula) => {
    const yaExiste = favoritos.some(peli => peli.imdbID === pelicula.imdbID);
    if (yaExiste) {
      setFavoritos(favoritos.filter(peli => peli.imdbID !== pelicula.imdbID));
    } else {
      setFavoritos([...favoritos, pelicula]);
    }
  };

  return (
    <Router>
      <header>CINE.TV</header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio favoritos={favoritos} onToggleFavorito={toggleFavorito} />} />
        <Route path="/favoritos" element={<Favoritos favoritos={favoritos} onToggleFavorito={toggleFavorito} />} />
        <Route path="/descripcion/:id" element={<Descripcion />} />
      </Routes>

      <footer>
        &copy; {new Date().getFullYear()} CINE.TV - Todos los derechos reservados.
      </footer>
    </Router>
  );
}
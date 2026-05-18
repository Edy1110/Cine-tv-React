import React, { useState, useEffect } from 'react';
import { getData } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function Inicio({ favoritos, onToggleFavorito }) {
  const [movies, setMovies] = useState([]);
  const [busqueda, setBusqueda] = useState(() => {
    return JSON.parse(sessionStorage.getItem('busqueda')) || "batman";
  });
  const [inputVal, setInputVal] = useState(busqueda);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    async function cargarPeliculas() {
      // Corregido: 'deLaApi' todo junto sin espacios
      const deLaApi = await getData(busqueda, pagina); 
      setMovies(deLaApi);
    }
    cargarPeliculas();
    sessionStorage.setItem('busqueda', JSON.stringify(busqueda));
  }, [busqueda, pagina]);

  const handleSearch = (e) => {
    e.preventDefault();
    setBusqueda(inputVal);
    setPagina(1);
  };

  return (
    <main className="movies">
      <section className="hero">
        <h1>Películas</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
            type="search" 
            placeholder="Buscar por nombre..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </section>

      <section id="movies-section">
        {movies.map((peli) => {
          const esFav = favoritos.some(f => f.imdbID === peli.imdbID);
          return (
            <MovieCard 
              key={peli.imdbID} 
              pelicula={peli} 
              esFavorito={esFav} 
              onToggleFavorito={onToggleFavorito}
            />
          );
        })}
      </section>

      <section className="section-paginacion">
        <button 
          onClick={() => setPagina(p => Math.max(p - 1, 1))} 
          className={pagina === 1 ? "nav-pag-ant" : ""}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
        >
          ← Página anterior
        </button>
        <button 
          onClick={() => setPagina(p => p + 1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold' }}
        >
          Página siguiente →
        </button>
      </section>
    </main>
  );
}
import React from 'react';
import MovieCard from '../components/MovieCard';

export default function Favoritos({ favoritos, onToggleFavorito }) {
  return (
    <main>
      <section id="seccion-favoritos">
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          Mis Películas Favoritas
        </h2>
        <div id="contenedor-favoritos" className="movies-grid" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {favoritos.length === 0 ? (
            <h3 style={{ color: 'white', width: '100%', textAlign: 'center' }}>
              No tienes películas en favoritos.
            </h3>
          ) : (
            favoritos.map((peli) => (
              <MovieCard 
                key={peli.imdbID} 
                pelicula={peli} 
                esFavorito={true} 
                onToggleFavorito={onToggleFavorito}
                esVistaFavoritos={true}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
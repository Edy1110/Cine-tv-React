import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ pelicula, esFavorito, onToggleFavorito, esVistaFavoritos }) {
  const navigate = useNavigate();

  // Reemplazo de portada si no existe
  const posterUrl = pelicula.Poster === "N/A" 
    ? "https://placehold.co/300x445?text=Portada+no+encontrada" 
    : pelicula.Poster;

  const handleDescriptionClick = () => {
    // En React pasamos el ID por la URL en lugar de usar localStorage
    navigate(`/descripcion/${pelicula.imdbID}`);
  };

  return (
    <article className="movie-card">
      <img 
        src={posterUrl} 
        alt={`Portada de ${pelicula.Title}`}
        onError={(e) => { e.target.src = "https://placehold.co/300x445?text=Portada+no+encontrada" }}
      />
      <div className="movie-info">
        <h3>{pelicula.Title}</h3>
        <div className="contenedor-botones">
          {esVistaFavoritos ? (
            <button className="btn-borrar" onClick={() => onToggleFavorito(pelicula)}>
              Eliminar
            </button>
          ) : (
            <>
              <button className="btn-desc" onClick={handleDescriptionClick}>
                Descripción
              </button>
              <button 
                className={`favorites-button btn-ver ${esFavorito ? 'btn-fav-selec' : ''}`}
                onClick={() => onToggleFavorito(pelicula)}
              >
                {esFavorito ? "Es favorito" : "Favoritos"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
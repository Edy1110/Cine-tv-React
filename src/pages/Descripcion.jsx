import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDataDescripcion } from '../services/api';

// Obtener la ID atraves de la URL
export default function Descripcion() {
  const { id } = useParams(); 
  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerDetalles() {
      const datos = await getDataDescripcion(id);
      setPelicula(datos);
      setCargando(false);
    }
    obtenerDetalles();
  }, [id]);

  if (cargando) return <h2 style={{ textAlign: 'center', color: 'white' }}>Cargando...</h2>;
  if (!pelicula) return <h2 style={{ textAlign: 'center', color: 'white' }}>No se encontró la película.</h2>;

  const posterUrl = pelicula.Poster === "N/A" 
    ? "https://placehold.co/375x300?text=Portada+no+encontrada" 
    : pelicula.Poster;

  return (
    <main className="movies">
      <section id="movies-section">
        <div className="description__wrapper">
          <img 
            className="description__img" 
            src={posterUrl} 
            alt={`Poster de ${pelicula.Title}`} 
          />
          <div className="description__info">
            <h2 className="description__title">{pelicula.Title} ({pelicula.Year})</h2>
            <p className="description__rating">⭐ IMDb: {pelicula.imdbRating}</p>
            <p className="description__meta">{pelicula.Genre} · {pelicula.Runtime}</p>
            <p className="description__meta"><strong>Director: </strong>{pelicula.Director}</p>
            <p className="description__meta"><strong>Reparto: </strong>{pelicula.Actors}</p>
            <div className="description__desc-box">
              <p className="description__desc">{pelicula.Plot}</p>
            </div>
            <a 
              className="description__link" 
              href={`https://www.imdb.com/title/${pelicula.imdbID}/`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver en IMDb
            </a>
          </div>
        </div>
      </section>
      <Link to="/" className="section-volver">Volver</Link>
    </main>
  );
}
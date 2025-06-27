import React from 'react';
import AnimeItem from './AnimeItem';
import './AnimeList.css';

function AnimeList({ animes, onAnimeClick, showNota = true }) {
  return (
    <div className="scroll-wrapper">
      <div className="anime-list">
        {animes.map(anime => {
          if (!anime) return null;
          const titulo = anime.title || anime.titulo || '';
          return (
          <AnimeItem
              key={anime.mal_id || anime._id}
              image={anime.images?.jpg?.image_url || anime.cover_url}
              title={titulo.length > 18 ? titulo.slice(0, 18) + '...' : titulo}
              nota={showNota ? (anime.score !== undefined ? anime.score : anime.nota) : undefined}
              onClick={() => onAnimeClick(anime.mal_id || anime._id)}
          />
          );
        })}
      </div>
    </div>
  );
}

export default AnimeList;
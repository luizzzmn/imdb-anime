import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../API/getAnime.js'
import './AnimePage.css';

function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAnime(id); // id já vem da URL
        setAnime(data);
      } catch (err) {
        console.error("Erro ao buscar anime:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!anime) return <p>Anime não encontrado.</p>;

  const descricao = anime.synopsis?.replace(/<br>/g, '\n') || "Descrição indisponível.";
  const bestEpisode = anime.streamingEpisodes?.[0];

  return (
    <div className="anime-page">
      {anime.pictures && (
        <img className="anime-banner" src={anime.pictures} alt="Banner do anime" />
      )}

      <div className="anime-content">
        <h1 className="anime-title">{anime.title_english || anime.title}</h1>

        <div className="anime-info">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} className="anime-cover" />
          <div className="anime-description">
            <h2>Descrição</h2>
            <p>{descricao}</p>
            <p><strong>Nota média:</strong> {anime.score}/10</p>
            {anime.synonyms?.length > 0 && (
              <p><strong>Títulos alternativos:</strong> {anime.titles.map(t => t.title).join(', ')}</p>
            )}
          </div>
        </div>

        {bestEpisode && (
          <div className="best-episode">
            <h2>Episódio melhor avaliado</h2>
            <a href={bestEpisode.url} target="_blank" rel="noopener noreferrer">
              <img src={bestEpisode.thumbnail} alt={bestEpisode.title} />
              <p>{bestEpisode.title}</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimePage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AnimePage.css';

function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          title {
            romaji
          }
          description(asHtml: false)
          bannerImage
          coverImage {
            large
          }
          averageScore
          streamingEpisodes {
            title
            thumbnail
            url
          }
          synonyms
        }
      }
    `;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ query, variables: { id: Number(id) } })
    })
      .then(res => res.json())
      .then(data => {
        setAnime(data.data.Media);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar dados do anime:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!anime) return <p>Anime não encontrado.</p>;

  const descricao = anime.description?.replace(/<br>/g, '\n') || "Descrição indisponível.";
  const bestEpisode = anime.streamingEpisodes?.[0];

  return (
    <div className="anime-page">
      {anime.bannerImage && (
        <img className="anime-banner" src={anime.bannerImage} alt="Banner do anime" />
      )}

      <div className="anime-content">
        <h1 className="anime-title">{anime.title.romaji}</h1>

        <div className="anime-info">
          <img src={anime.coverImage.large} alt={anime.title.romaji} className="anime-cover" />
          <div className="anime-description">
            <h2>Descrição</h2>
            <p>{descricao}</p>
            <p><strong>Nota média:</strong> {anime.averageScore}/100</p>
            {anime.synonyms?.length > 0 && (
              <p><strong>Títulos alternativos:</strong> {anime.synonyms.join(', ')}</p>
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

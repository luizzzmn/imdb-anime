import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../API/getAnime.js';
import './AnimePage.css';

function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null);
  const [bestEpisode, setBestEpisode] = useState(null);

  useEffect(() => {
    async function fetchAnimeData() {
      try {
        const animeData = await getAnime(id);
        setAnime(animeData);

        // Banner (usa imagem do trailer como banner alternativo)
        const bannerUrl = animeData.trailer?.images?.maximum_image_url || null;
        setBanner(bannerUrl);
      } catch (err) {
        console.error("Erro ao buscar anime:", err);
      } finally {
        setLoading(false);
      }
    }

    //função para pegar melhor episodio
    async function fetchBestEpisode() {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          const best = data.data.reduce((a, b) => (b.score || 0) > (a.score || 0) ? b : a);
          setBestEpisode(best);
        }
      } catch (err) {
        console.error("Erro ao buscar episódios:", err);
      }
    }

    fetchAnimeData();
    fetchBestEpisode();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!anime) return <p>Anime não encontrado.</p>;

  const descricao = anime.synopsis?.replace(/<br>/g, '\n') || "Descrição indisponível.";

  return (
    <div className="anime-page">
      {banner && <img className="anime-banner" src={banner} alt="Banner do anime" />}

      <div className="anime-content">
        <h1 className="anime-title">{anime.title_english || anime.title}</h1>

        <div className="anime-info">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="anime-cover"
          />
          <div className="anime-description">
            <h2>Descrição</h2>
            <p>{descricao}</p>
            <p><strong>Nota média:</strong> {anime.score || "N/A"}/10</p>
            {anime.titles?.length > 1 && (
              <p>
                <strong>Títulos alternativos:</strong>{" "}
                {anime.titles.map(t => t.title).join(', ')}
              </p>
            )}
          </div>
        </div>

        {bestEpisode && (
          <div className="best-episode">
            <h2>Episódio melhor avaliado</h2>
            {bestEpisode.images?.jpg?.image_url && (
              <img src={bestEpisode.images.jpg.image_url} alt={bestEpisode.title} />
            )}
            <h3>{bestEpisode.title}</h3>
            <p><strong>Score:</strong> {bestEpisode.score || "N/A"}</p>
            <p>{bestEpisode.synopsis || "Sem descrição disponível."}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimePage;

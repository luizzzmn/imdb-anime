import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../API/getAnime';
import { getAniListInfoByMalId } from '../API/anilist';
import './AnimePage.css';

function AnimePage() {
  const { id } = useParams();
  const [animeJikan, setAnimeJikan] = useState(null);
  const [animeAnilist, setAnimeAnilist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const jikanData = await getAnime(id);
        setAnimeJikan(jikanData);

        const anilistData = await getAniListInfoByMalId(id);
        setAnimeAnilist(anilistData);
      } catch (err) {
        console.error("Erro ao buscar anime:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!animeJikan) return <p>Anime não encontrado.</p>;

  const descricao = animeAnilist?.description?.replace(/<br>/g, '\n') || animeJikan.synopsis || "Descrição indisponível.";
  const bestEpisode = animeJikan.streamingEpisodes?.[0];

  return (
    <div className="anime-page">
      {animeAnilist?.bannerImage && (
        <img className="anime-banner" src={animeAnilist.bannerImage} alt="Banner do anime" />
      )}

      <div className="anime-content">
        <h1 className="anime-title">{animeJikan.title_english || animeJikan.title}</h1>

        <div className="anime-info">
          <img
            src={animeJikan.images?.jpg?.large_image_url}
            alt={animeJikan.title}
            className="anime-cover"
          />
          <div className="anime-description">
            <h2>Descrição</h2>
            <p>{descricao}</p>
            <p><strong>Nota média:</strong> {animeJikan.score || animeAnilist?.averageScore / 10}/10</p>
            {animeJikan.synonyms?.length > 0 && (
              <p><strong>Títulos alternativos:</strong> {animeJikan.titles.map(t => t.title).join(', ')}</p>
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

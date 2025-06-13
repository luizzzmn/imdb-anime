import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../API/getAnime';
import { getAniListInfoByMalId } from '../API/anilist';
import api from '../backend-services/api'; // Importa o api.js
import './AnimePage.css';

function TextoLimitado({ texto, limite = 20 }) {
  if (!texto) return null;
  return <h1 className="anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h1>;
}

function AnimePage() {
  const { id } = useParams();
  const [animeJikan, setAnimeJikan] = useState(null);
  const [animeAnilist, setAnimeAnilist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adicionado, setAdicionado] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const jikanData = await getAnime(id).then((anime) => setAnimeJikan(anime));
        //setAnimeJikan(jikanData);

        console.log(animeJikan);
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

  useEffect(() => {
    // Verifica se já está nos favoritos
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuario && usuario.favoritos) {
      setAdicionado(usuario.favoritos.some(fav => fav.mal_id === Number(id)));
    }
  }, [id]);

  const handleAdicionarFavorito = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
      alert('Você precisa estar logado para favoritar um anime.');
      return;
    }
    try {
      const animeFavorito = {
  mal_id: animeJikan.mal_id,
  title: animeJikan.title_english || animeJikan.title || animeJikan.title_japanese,
  image_url: animeJikan.images?.jpg?.large_image_url || animeJikan.images?.jpg?.image_url,
};

      const userId = usuario.id || usuario._id;
      const response = await api.patch(`/usuarios/${userId}/favoritos`, animeFavorito);
      localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
      setAdicionado(true);
    } catch (error) {
      alert('Erro ao adicionar aos favoritos.');
      console.error(error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!animeJikan) return <p>Anime não encontrado.</p>;

  const descricao = animeJikan.synopsis || "Descrição não encontrada.";
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
            <button
              className="favoritar-btn"
              onClick={handleAdicionarFavorito}
              disabled={adicionado}
              style={{ marginTop: '16px' }}
            >
              {adicionado ? 'Já está nos Favoritos' : 'Adicionar aos Favoritos'}
            </button>
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


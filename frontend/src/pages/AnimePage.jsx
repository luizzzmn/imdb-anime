import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnime } from '../API/getAnime';
import { getAniListInfoByMalId } from '../API/anilist';
import api from '../backend-services/api'; // Importa o api.js
import AnimeReviews from '../components/AnimeReviews';
import ReviewForm from '../components/ReviewForm';
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
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const jikanData = await getAnime(id);
        setAnimeJikan(jikanData.data);
        
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
      setAdicionado(usuario.favoritos.includes(id));
    }
  }, [id]);

  function atualizarReviews() {
    setRefreshReviews(prev => prev + 1);
  }

  const handleAdicionarFavorito = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuario) {
      alert('Você precisa estar logado para favoritar um anime.');
      return;
    }
    try {
      const userId = usuario._id;
      const response = await api.patch(`/usuarios/${userId}/favoritos`, { animeId: id });
      localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
      setAdicionado(response.data.favoritos.includes(id));
    } catch (error) {
      alert('Erro ao adicionar aos favoritos.');
      console.error(error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!animeJikan) return <p>Anime não encontrado.</p>;

  const descricao = animeJikan.synopsis;

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
              style={{ marginTop: '16px', cursor: 'pointer' }}
            >
              {adicionado ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </button>
          </div>
        </div>

        <div className="reviews-section">
          <div className="review-input-container">
            <h2 style={{ color: '#0f0c29' }}>Escreva sua review:</h2>
            <ReviewForm animeId={id} onReviewSaved={atualizarReviews} />
          </div>
          <div className="reviews-container">
            <AnimeReviews animeId={id} refresh={refreshReviews} onReviewDeleted={atualizarReviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimePage;


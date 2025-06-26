import React, { useEffect, useState } from 'react';
import api from '../backend-services/api';
import './AnimeReviews.css';

const URL_PADRAO = "https://cdn-icons-png.freepik.com/512/12225/12225935.png";

function UserReviews({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [animes, setAnimes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserReviews() {
      setLoading(true);
      try {
        // Busca todas as reviews feitas pelo usuário
        const res = await api.get(`/reviews/reviewer/${userId}`);
        setReviews(res.data);

        // Busca os animes correspondentes às reviews
        const animeIds = [...new Set(res.data.map(r => r.anime_id))];
        const animesData = {};
        await Promise.all(animeIds.map(async (id) => {
          try {
            // Ajuste a rota conforme sua API
            const animeRes = await api.get(`/animes/${id}`);
            animesData[id] = animeRes.data;
          } catch {
            animesData[id] = { titulo: "Anime não encontrado", imagem: URL_PADRAO };
          }
        }));
        setAnimes(animesData);
      } catch (err) {
        setReviews([]);
      }
      setLoading(false);
    }
    if (userId) fetchUserReviews();
  }, [userId]);

  if (loading) return <div className="anime-reviews-list">Carregando suas reviews...</div>;
  if (!reviews.length) return <div className="anime-reviews-list">Você ainda não fez nenhuma review.</div>;

  return (
    <div className="anime-reviews-list">
      <h2>Suas Reviews</h2>
      {reviews.map((review) => {
        const anime = animes[review.anime_id] || {};
        return (
          <div className="review-box" key={review._id}>
            <img
              className="review-user-photo"
              src={anime.cover_url || URL_PADRAO}
              alt={anime.titulo || "Anime"}
            />
            <div className="review-content">
              <div className="review-user-name">{anime.titulo || "Anime não encontrado"}</div>
              <div className="review-text">{review.review}</div>
              {typeof review.nota === "number" && (
                <div className="review-score">Nota: {review.nota}/10</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserReviews;
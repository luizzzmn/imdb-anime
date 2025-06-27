import React, { useEffect, useState } from 'react';
import api from '../backend-services/api';
import { FaTrash } from 'react-icons/fa';
import './AnimeReviews.css';

const URL_PADRAO = "https://cdn-icons-png.freepik.com/512/12225/12225935.png";
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

function AnimeReviews({ animeId, refresh, onReviewDeleted }) {
  const [reviews, setReviews] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function handleDelete(reviewId) {
    try {
      await api.delete(`/reviews/${reviewId}`);
      // Remove a review também da lista de reviews do usuário
      if (usuarioLogado && usuarioLogado._id) {
        await api.patch(`/usuarios/${usuarioLogado._id}/toggle-review`, { reviewId });
      }
      setConfirmDeleteId(null);
      if (typeof onReviewDeleted === 'function') onReviewDeleted();
    } catch {
      alert('Erro ao deletar review.');
    }
  }

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        // Busca todas as reviews do anime
        const res = await api.get(`/reviews/anime/${animeId}`);
        setReviews(res.data);

        // Busca os dados dos usuários das reviews
        const reviewerIds = [...new Set(res.data.map(r => r.reviewer_id))];
        const usuariosData = {};
        await Promise.all(reviewerIds.map(async (id) => {
          try {
            const userRes = await api.get(`/usuarios/${id}`);
            usuariosData[id] = userRes.data;
          } catch {
            usuariosData[id] = { nome: "Usuário desconhecido", pfp_url: URL_PADRAO };
          }
        }));
        setUsuarios(usuariosData);
      } catch (err) {
        setReviews([]);
      }
      setLoading(false);
    }
    if (animeId) fetchReviews();
  }, [animeId, refresh]);

  if (loading) return <div className="anime-reviews-list">Carregando reviews...</div>;
  if (!reviews.length) return (
    <div className="anime-reviews-list">
        <h2>Reviews:</h2>
        <h3>Nenhuma review encontrada. Seja o primeiro!</h3>
    </div>
  )

  return (
    <div className="anime-reviews-list">
      <h2>Reviews dos usuários</h2>
      {reviews.map((review) => {
        const user = usuarios[review.reviewer_id] || {};
        const isOwner = usuarioLogado._id === review.reviewer_id;
        return (
          <div className="review-box" key={review._id} style={{ position: 'relative' }}>
            <img
              className="review-user-photo"
              src={user.pfp_url || URL_PADRAO}
              alt={user.nome || "Usuário"}
            />
            <div className="review-content">
              <div className="review-user-name">{user.nome || "Usuário desconhecido"}</div>
              <div className="review-text">{review.review}</div>
              {typeof review.nota === "number" && (
                <div className="review-score">Nota: {review.nota}/10</div>
              )}
            </div>
            {isOwner && (
              <div className="review-delete-btn">
                {confirmDeleteId === review._id ? (
                  <button
                    className="review-trash-btn confirm"
                    onClick={() => handleDelete(review._id)}
                    title="Clique novamente para confirmar"
                  >
                    <FaTrash />
                  </button>
                ) : (
                  <button
                    className="review-trash-btn"
                    onClick={() => setConfirmDeleteId(review._id)}
                    title="Deletar review"
                  >
                    <FaTrash />
                  </button>
                )}
                {confirmDeleteId === review._id && (
                  <span className="review-delete-msg">Clique novamente para confirmar</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AnimeReviews;
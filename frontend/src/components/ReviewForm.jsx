// ReviewForm.jsx
import React, { useState } from 'react';
import api from '../backend-services/api';
import './ReviewForm.css';

const URL_PADRAO = "https://cdn-icons-png.freepik.com/512/12225/12225935.png";

function ReviewForm({ animeId, onReviewSaved }) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const [review, setReview] = useState('');
  const [nota, setNota] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    if (!review.trim() || !nota) {
      setErro('Preencha a review e a nota.');
      return;
    }
    if (nota < 0 || nota > 10) {
      setErro('A nota deve ser entre 0 e 10.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/reviews', {
        anime_id: animeId,
        reviewer_id: usuario._id,
        review,
        nota: Number(nota)
      });
      setReview('');
      setNota('');
      // Adiciona o id da review ao usuário
      if (res.data && res.data._id) {
        await api.patch(`/usuarios/${usuario._id}/toggle-review`, { reviewId: res.data._id });
      }
      if (onReviewSaved) onReviewSaved();
    } catch (err) {
      setErro('Erro ao salvar review.');
    }
    setLoading(false);
  };

  return (
    <form className="review-form-box" onSubmit={handleSubmit}>
      <img
        className="review-form-user-photo"
        src={usuario?.pfp_url || URL_PADRAO}
        alt={usuario?.nome || "Usuário"}
      />
      <div className="review-form-fields">
        <textarea
          className="review-form-textarea"
          placeholder="Escreva sua review..."
          value={review}
          onChange={e => setReview(e.target.value)}
          rows={3}
          maxLength={600}
        />
        <div className="review-form-bottom">
          <input
            className="review-form-score"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Nota (0-10)"
            value={nota}
            onChange={e => setNota(e.target.value)}
          />
          <button
            className="review-form-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Review'}
          </button>
        </div>
        {erro && <div className="review-form-erro">{erro}</div>}
      </div>
    </form>
  );
}

export default ReviewForm;
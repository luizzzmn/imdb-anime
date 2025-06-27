import React from 'react';
import './AnimeItem.css';

function AnimeItem({ image, title, nota, onClick }) {

  // Função para definir a cor da nota
  const getNotaClass = (nota) => {
    if (nota >= 9) return "nota-verde-escuro"
    if (nota >= 8) return "nota-verde";
    if (nota >= 6) return "nota-amarela";
    return "nota-vermelha";
  };

  return (
    <div className="anime-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} />
      <h5 className="home-anime-title">{title}</h5>
      {nota !== undefined &&(
        <div className={`anime-nota ${getNotaClass(nota)}`}>
          {nota}
        </div>
      )}
    </div>
  );
}

export default AnimeItem;
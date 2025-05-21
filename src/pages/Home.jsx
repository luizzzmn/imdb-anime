import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← importa o hook
import {getTopAnime} from '../API/getTopAnime.js'
import './Home.css';

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ← inicializa o hook

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTopAnime(10);
        setAnimes(data.data);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // ← função para ir à página do anime
  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="scroll-highlight-container">
      <h2 className="scroll-title">Em Destaque</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="scroll-wrapper">
          <div className="anime-list">
            {animes.map((anime) => (
              <div
                key={anime.mal_id}
                className="anime-item"
                onClick={() => handleAnimeClick(anime.mal_id)} // ← clique chama navegação
                style={{ cursor: 'pointer' }} // ← estilo visual de botão
              >
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
                <p>Nota: {anime.score}/10</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="extra-content">
        <h2>Últimas obras avaliadas:</h2>
        <p>Esse espaço pode ser usado para recomendações, resenhas ou outros conteúdos.</p>
      </div>

      <div className="extra-content">
        <h2>Progresso Pessoal:</h2>
        <p>Esse espaço pode ser usado para recomendações, resenhas ou outros conteúdos.</p>
      </div>

    </div>
  );
};

export default Home;

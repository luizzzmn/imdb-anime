import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← importa o hook
import './Home.css';

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ← inicializa o hook

  useEffect(() => {
    const query = `
      query {
        Page(perPage: 20) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
            }
            coverImage {
              extraLarge
            }
            averageScore
          }
        }
      }
    `;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.data.Page.media);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar animes:", err);
        setLoading(false);
      });
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
                key={anime.id}
                className="anime-item"
                onClick={() => handleAnimeClick(anime.id)} // ← clique chama navegação
                style={{ cursor: 'pointer' }} // ← estilo visual de botão
              >
                <img src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                <h3>{anime.title.romaji}</h3>
                <p>Nota: {anime.averageScore}/100</p>
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

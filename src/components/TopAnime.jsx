import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← importa o hook
import {getTopAnime} from '../API/getTopAnime.js'
import './AnimeList.css';

function TextoLimitado({ texto, limite = 20 }) {
  if (!texto) return null;
  return <h5 className="anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h5>;
}

const TopAnime = () => {
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
  
  return (<div>{loading ? (
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
                <TextoLimitado texto={anime.title} limite={12}></TextoLimitado>
                <p>Nota: {anime.score}/10</p>
              </div>
            ))}
          </div>
        </div>
      )}</div>);
};

export default TopAnime;
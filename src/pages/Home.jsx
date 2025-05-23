import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← importa o hook
import {getTopAnime} from '../API/getTopAnime.js'
import './Home.css';
import Footer from '../components/Footer';

function TextoLimitado({ texto, limite = 20 }) {
  if (!texto) return null;
  return <h5 className="anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h5>;
}

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

   <div className="page-container">
    <main className="content">

    

      <div className="scroll-highlight-container">

        <div className="destaques">
          <h2>Animes em Destaque</h2>
          <p>Lorem ipsum...</p>
        </div>

        <h2 className="scroll-title">Obras com maiores notas:</h2>
        {loading ? (
         <p>Carregando...</p>
        ) : (
          <div className="scroll-wrapper">
            <div className="anime-list">
              {animes.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="anime-item"
                  onClick={() => handleAnimeClick(anime.mal_id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={anime.images.jpg.image_url} alt={anime.title} />
                  <TextoLimitado texto={anime.title} limite={12}></TextoLimitado>
                  <p>Nota: {anime.score}/10</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="proximos-lancamentos">
          <h2>Próximos Lançamentos</h2>
          <p>Lorem ipsum...</p>
        </div>

        <div className="progresso-pessoal">
          <h2>Progresso Pessoal</h2>
          <p>Lorem ipsum...</p>
        </div>
      </div>
    </main>

    <Footer />
  </div>

  );
};

export default Home;

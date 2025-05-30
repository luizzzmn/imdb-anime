import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopAnime } from '../API/getTopAnime.js';
import { getUpcomingAnime } from '../API/getUpcomingAnime.js';
import { getTrendingAnime } from '../API/getTrendingAnime.js';
import './Home.css';
import Footer from '../components/Footer';

function TextoLimitado({ texto, limite = 20 }) {
  if (!texto) return null;
  return <h5 className="anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h5>;
}

const Home = () => {
  const [TrendingAnimes, setTrendingAnimes] = useState([]);
  const [TopAnimes, setTopAnimes] = useState([]);
  const [UpcomingAnimes, setUpcomingAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrendingAnime();
        setTrendingAnimes(data.data);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      } finally {
        setLoading(false);
      }
      
      await delay(2000)

      try {
        const data = await getTopAnime();
        console.log(data)
        setTopAnimes(data.data);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      } finally {
        setLoading(false);
      }

      await delay(2000)

      try {
        const data = await getUpcomingAnime();
        console.log(data)
        setUpcomingAnimes(data.data);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="page-container">
      <main className="content">
        <div className="scroll-highlight-container">
          <div className="destaques">
            <h2 className="scroll-title">Animes em Destaque:</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="scroll-wrapper">
                <div className="anime-list">
                  {TrendingAnimes.map((anime) => (
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
          </div>

          <div className="destaques">
            <h2 className="scroll-title">Obras com maiores notas:</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="scroll-wrapper">
                <div className="anime-list">
                  {TopAnimes.map((anime) => (
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
          </div>

          <div className="destaques">
            <h2 className="scroll-title">Próximos lançamentos:</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div className="scroll-wrapper">
                <div className="anime-list">
                  {UpcomingAnimes.map((anime) => (
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
          </div>

          <div className="progresso-pessoal">
            <h2>Progresso Pessoal</h2>
            <p>carregando...</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

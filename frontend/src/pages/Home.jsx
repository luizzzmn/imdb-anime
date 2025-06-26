import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../API/getData';
import api from '../backend-services/api';
import './Home.css';
import Footer from '../components/Footer';
import AnimeList from '../components/AnimeList';

function TextoLimitado({ texto, limite = 20 }) {
  if (!texto) return null;
  return <h5 className="home-anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h5>;
}

let data = await getData()

const Home = () => {
  const [TrendingAnimes, setTrendingAnimes] = useState([]);
  const [TopAnimes, setTopAnimes] = useState([]);
  const [UpcomingAnimes, setUpcomingAnimes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLogado = !localStorage.getItem('token');

  // Ao entrar na Home
  useEffect(() => {
    async function fetchData() {
      try {
        //const data = await getTrendingAnime();
        setTrendingAnimes(data.TrendingAnime);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      } finally {
        setLoading(false);
      }

      try {
        //const data = await getTopAnime();
        setTopAnimes(data.TopAnime);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      }

      try {
        //const data = await getUpcomingAnime();
        setUpcomingAnimes(data.UpcomingAnime);
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      }
    }

    fetchData();
  }, []);

  // Quando o usuário faz login
  useEffect(() => {
    async function fetchFavoritos() {
      const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
      if (usuario && Array.isArray(usuario.favoritos) && usuario.favoritos.length > 0) {
        try {
          // Busca todos os animes favoritos pelo id
          const promises = usuario.favoritos.map(animeId =>
            api.get(`/animes/${animeId}`).then(res => res.data)
          );
          const animesFavoritos = await Promise.all(promises);
          console.log(animesFavoritos);
          setFavoritos(animesFavoritos);
        } catch (err) {
          setFavoritos([]);
          console.error("Erro ao buscar animes favoritos:", err);
        }
      } else {
        setFavoritos([]);
      }
    }

    if (isLogado) {
      fetchFavoritos();
    } else {
      setFavoritos([]);
    }
  }, [isLogado]);

  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="page-container">
      <main className="content">
        <div className="scroll-highlight-container">


          {isLogado && (
            <div className="progresso-pessoal">
              <h2>Progresso Pessoal</h2>
              <p>Comece a avaliar suas obras!</p>

              {favoritos.length > 0 ? (
                <AnimeList
                  animes={favoritos}
                  onAnimeClick={handleAnimeClick}
                  showNota={true}
                />
              ) : (
                <p>Você ainda não favoritou nenhum anime.</p>
              )}

            </div>
          )}

          <div className="destaques">
            <h2 className="scroll-title">Animes em Destaque:</h2>
            {loading ? <p>Carregando...</p> :
              <AnimeList animes={TrendingAnimes} onAnimeClick={handleAnimeClick} />
            }
          </div>

          <div className="maiores-notas">
            <h2 className="scroll-title">Obras com maiores notas:</h2>
            {loading ? <p>Carregando...</p> :
              <AnimeList animes={TopAnimes} onAnimeClick={handleAnimeClick} />
            }
          </div>

          <div className="proximos-lancamentos" id="proximos-lancamentos">
            <h2 className="scroll-title">Próximos lançamentos:</h2>
            {loading ? <p>Carregando...</p> :
              <AnimeList animes={UpcomingAnimes} onAnimeClick={handleAnimeClick} showNota={false} />
            }
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
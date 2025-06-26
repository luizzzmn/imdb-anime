import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../backend-services/api';
import AnimeItem from '../components/AnimeItem';
import './SearchResult.css';

const SearchResult = () => {
  const { termo } = useParams();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function buscar() {
      setLoading(true);
      try {
        const res = await api.get(`/animes/titulos/${termo}`);
        setAnimes(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (err) {
        setAnimes([]);
      }
      setLoading(false);
    }
    buscar();
  }, [termo]);

  // manda pra página do anime
  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="result-page-container">
        <div className="resultados-container">
        <h2 className="resultados-title">Resultados para "{termo}"</h2>
        {loading ? (
            <p>Carregando...</p>
        ) : animes.length > 0 ? (
          <div className="results-anime-list">
            {animes.map(anime => (
                <AnimeItem
                key={anime._id}
                image={anime.cover_url}
                title={anime.titulo_ingles || anime.titulo}
                nota={anime.nota}
                onClick={() => handleAnimeClick(anime._id)}
              />
            ))}
            </div>
        ) : (
            <p>Nenhum anime encontrado.</p>
        )}
        </div>
    </div>
  );
};

export default SearchResult;
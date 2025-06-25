import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../backend-services/api';
import './SearchResult.css';

function TextoLimitado({ texto, limite = 18 }) {
  if (!texto) return null;
  return <h5 className="anime-title">{texto.length > limite ? texto.slice(0, limite) + '...' : texto}</h5>;
}

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
                <div
                key={anime._id}
                className="result-anime-item"
                onClick={() => handleAnimeClick(anime._id)}
                >
                <img
                    src={anime.cover_url}
                    alt={anime.titulo_ingles || anime.titulo}
                />
                <TextoLimitado texto={anime.titulo_ingles || anime.titulo} limite={18} />
                {anime.score && <p>Nota: {anime.score}/10</p>}
                </div>
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
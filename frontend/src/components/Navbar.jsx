import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import './Navbar.css';
import logo1 from '../imagens/logo4.png';

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuario(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (busca.trim()) {
      navigate(`/search/${busca}`);
      setBusca('');
    }
  };

  return (
    <nav id="navbar">
      <Link to="/" className="logo">
        <img src={logo1} alt="Logo" className="navbar-logo" />
      </Link>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Busque um anime"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      <div className="nav-buttons">
        {location.pathname === "/" && (
          <a
            href="#proximos-lancamentos"
            className="plain-link"
            onClick={() => {
              // rola suavemente até a seção
              const el = document.getElementById('proximos-lancamentos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Novidades
          </a>
        )}

        {usuario ? (
          <>
            {location.pathname === "/perfil" && (
              <button
                className="plain-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => {
                  const el = document.getElementById('user-reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Minhas Reviews
              </button>
            )}
            {location.pathname !== "/perfil" && (
              <Link to="/perfil" className="plain-link">Perfil</Link>
            )}
            <button className="logout-button" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="plain-link">Cadastrar</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

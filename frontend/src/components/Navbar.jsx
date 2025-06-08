import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import './Navbar.css';
import logo1 from '../imagens/logo4.png';

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuarioLogado'); // opcional, mas bom limpar
  alert('Você saiu da conta.');
  navigate('/login');
};

  return (
    <nav id="navbar">
      <Link to="/" className="logo">
        <img src={logo1} alt="Logo" className="navbar-logo" />
      </Link>

      <form className="search-form">
        <input type="text" placeholder="Busque um anime" />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      <div className="nav-buttons">
        <Link to="/novidade" className="plain-link">Novidades</Link>

        {usuario ? (
          <>
            <Link to="/perfil" className="plain-link">Perfil</Link>
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

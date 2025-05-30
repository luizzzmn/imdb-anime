import { Link } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2 className="logo">
        <Link to="/">ANIME DB</Link>
      </h2>

      <form className="search-form">
        <input type="text" placeholder="Busque um anime" />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      <div className="nav-buttons">
        <Link to="/novidade" className="plain-link">Novidades</Link>
        <Link to="/login" className="login-button">Login</Link>
        <Link to="/register" className="plain-link">Cadastrar</Link>
      </div>
    </nav>
  );
};

export default Navbar;

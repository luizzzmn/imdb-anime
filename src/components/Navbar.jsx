import { Link } from 'react-router-dom';
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi";

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2 className="logo">
        <Link to="/imdb-anime/">ANIME IMDB</Link>
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
      </div>
    </nav>
  )
}
export default Navbar
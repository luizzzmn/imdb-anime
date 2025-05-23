import { Link, useNavigate } from 'react-router-dom';
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi";
import { useEffect, useState } from 'react';


const Navbar = () => {
  

  return (
    <nav id="navbar">
      <h2 className="logo">
        <Link to="">ANIME IMDB</Link>
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
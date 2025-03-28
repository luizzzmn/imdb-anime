import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav id="navbar">
        <h2>
        <Link to="/imdb-anime/">AnimeIMDB</Link>
        </h2>
        <Link to="/anime/1">Anime</Link>
        <Link to="/search">Search</Link>
      </nav>
  )
}

export default Navbar
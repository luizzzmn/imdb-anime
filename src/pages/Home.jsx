import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query {
        Page(perPage: 10) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
            }
            coverImage {
              extraLarge
            }
            bannerImage 
            averageScore
          }
        }
      }
    `;

    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimes(data.data.Page.media);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar animes:", err);
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? animes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === animes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="highlight-container">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="highlight-image-wrapper">
            <button className="nav-button left" onClick={handlePrev}>&lt;</button>

            <Link to={`/anime/${animes[currentIndex].id}`}>
            <img
              src={animes[currentIndex].coverImage.extraLarge}
              alt={animes[currentIndex].title.romaji}
              className="highlight-img"
            />
            </Link>
          
            
            <button className="nav-button right" onClick={handleNext}>&gt;</button>
          </div>

          <div className="highlight-info">
            <h2>Em Destaque: </h2> 
            <h2>{animes[currentIndex].title.romaji}</h2>
            <p>Nota: {animes[currentIndex].averageScore}/100</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

console.log('Home.jsx carregado');

import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';

const animeURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query {
        Page(perPage: 10) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            description(asHtml: false)
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

  return (
    <div className="App">
      <h1>Trending Animes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="anime-scroll">
          {animes.map((anime) => (
            <div key={anime.id} className="anime-card">
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <h3>{anime.title.romaji}</h3>
              <p>Nota: {anime.averageScore}/100</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home


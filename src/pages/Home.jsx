console.log('Home.jsx carregado');

import React from 'react';
import { useState, useEffect } from 'react';

const animeURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

  const [topAnimes, setTopAnimes] = useState([])
  const getTopRatedAnimes = async(url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopAnimes(data.results);

    console.log(data);
  }

  useEffect(() => {

    const topRatedUrl = `${animeURL}top_rated?${apiKey}`; //implementar de acordo com a API do ANILIST ainda 
    
    getTopRatedAnimes(topRatedUrl);

  }, [])

  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home


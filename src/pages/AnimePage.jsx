import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AnimePage.css';

function AnimePage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
          }
          bannerImage
          description
          averageScore
        }
      }
    `;

    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { id: parseInt(id) }
      })
    })
      .then(res => res.json())
      .then(data => setAnime(data.data.Media));
  }, [id]);

  if (!anime) return <p>Carregando...</p>;

  return (
    <div className='anime-banner-container'>
      <h1>{anime.title.romaji} ({anime.averageScore}/100)</h1>
      <img src={anime.bannerImage} alt={anime.title.romaji} />
      <p dangerouslySetInnerHTML={{ __html: anime.description }}></p>
    </div>
  );
}

export default AnimePage;

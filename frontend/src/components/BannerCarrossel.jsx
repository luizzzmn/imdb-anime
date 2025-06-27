/*import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './BannerCarrossel.css'; // certifique-se de que o arquivo existe

import { getTopAnimes } from '../API/getAnime'; // função Jikan
import { getAniListInfoByMalId } from '../API/anilist'; // função AniList

const BannerCarrossel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const topAnimes = await getTopAnimes(1); // pega top animes da Jikan
        const bannersCompletos = await Promise.all(
          topAnimes.slice(0, 5).map(async (anime) => {
            const anilistData = await getAniListInfoByMalId(anime.mal_id);
            return {
              title: anime.title,
              banner: anilistData?.bannerImage,
            };
          })
        );
        // Remove banners nulos
        setBanners(bannersCompletos.filter(item => item.banner));
      } catch (err) {
        console.error('Erro ao buscar banners:', err);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="home-banner-carousel">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.banner}
              alt={item.title}
              className="home-banner-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarrossel;

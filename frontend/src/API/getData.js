import { getTrendingAnime } from './getTrendingAnime.js'
import { getTopAnime } from './getTopAnime.js'
import { getUpcomingAnime } from './getUpcomingAnime.js'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getData(){
    let APIdata = {}

    await delay(500)

    try {
        const data = await getTrendingAnime();
        APIdata["TrendingAnime"] = data.data;
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      }

      await delay(500)

      try {
        const data = await getTopAnime();
        APIdata["TopAnime"] = data.data;
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      }

      await delay(500)

      try {
        const data = await getUpcomingAnime();
        APIdata["UpcomingAnime"] = data.data;
      } catch (err) {
        console.error("Erro ao buscar dados do anime:", err);
      }
      return APIdata;
}

export { getData }
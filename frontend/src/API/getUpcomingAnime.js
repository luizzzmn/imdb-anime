async function getUpcomingAnime() {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?status=upcoming&order_by=start_date&sort=asc&limit=10`);
    const json = await response.json();
    console.log(json)
    // const mapa = new Map();
    //   for (const anime of json.data) {
    //     mapa.set(anime.mal_id, anime); // sobrescreve duplicados com mesmo mal_id
    //   }
    return json;
  } catch (error) {
    console.error("Erro ao buscar próximos animes:", error);
    return [];
  }
}

export {getUpcomingAnime}
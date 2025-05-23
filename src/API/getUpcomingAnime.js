async function getUpcomingAnime(limit = 10) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?status=upcoming&order_by=start_date&sort=asc&limit=10`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Erro ao buscar próximos animes:", error);
    return [];
  }
}

export {getUpcomingAnime}
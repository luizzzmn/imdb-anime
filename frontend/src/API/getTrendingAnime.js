async function getTrendingAnime() {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Erro ao buscar próximos animes:", error);
    return [];
  }
}

export {getTrendingAnime}
async function getTopAnime(limit = 10) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Erro ao buscar top animes:", error);
    return [];
  }
}

export {getTopAnime}
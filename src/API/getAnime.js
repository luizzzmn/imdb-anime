
async function getAnime(id = 0) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    let json = await response.json();
    
    return json;
  } catch (error) {
    console.error("Erro ao buscar top animes:", error);
    return [];
  }
}

// console.log(await getAnime(5114))

export {getAnime}
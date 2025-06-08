
async function getAnime(id = 0) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const responsePic = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos`);
    let json = await response.json();
    let jsonPic = await responsePic.json();
    json = json.data
    json["pictures"] = jsonPic.data.episodes[0].images.jpg.image_url
    return json;
  } catch (error) {
    console.error("Erro ao buscar top animes:", error);
    return [];
  }
}

// console.log(await getAnime(5114))

export {getAnime}
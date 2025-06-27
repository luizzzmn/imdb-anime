async function getUpcomingAnime() {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?status=upcoming&order_by=start_date&sort=asc&limit=20`);
    const json = await response.json();
    console.log(json)
    
    //Filtragem de Animes duplicados
    json.data = json.data.filter((o, index, arr) =>
    arr.findIndex(item => JSON.stringify(item) === JSON.stringify(o)) === index
    );

    return json;
  } catch (error) {
    console.error("Erro ao buscar próximos animes:", error);
    return [];
  }
}

export {getUpcomingAnime}
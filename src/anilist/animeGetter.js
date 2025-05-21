
function get_Trending_Anime(){
fetch("https://api.jikan.moe/v4/anime/519/videos")
  .then(res => res.json())
  .then(data => {
    console.log(data.episodes);
  })
  .catch(err => console.error("Erro na Jikan API:", err));

}

get_Trending_Anime()

function get_Trending_Anime(query){
    let url = "https://graphql.anilist.co"
    const htmlString = `
    query {
        Page(perPage: 10) {
        media(type: ANIME, sort: FAVOURITES_DESC) {
            id
            title {
            romaji
            english
            native
            }
            coverImage {
            large
            }
            description
            averageScore
            popularity
        }
        }
    }
    `;
    const variables = {
    search: query
    };

    fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        query: htmlString,
        variables: variables
    })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.data.Page.media);
    })
    .catch(err => {
        console.error("Erro na requisição:", err);
    });

}

get_Trending_Anime("Jujutsu Kaisen")
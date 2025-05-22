// src/API/anilist.js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://graphql.anilist.co';
const client = new GraphQLClient(endpoint);

export async function getAniListInfoByMalId(malId) {
  const query = gql`
    query ($malId: Int) {
      Media(idMal: $malId, type: ANIME) {
        title {
          romaji
          english
          native
        }
        bannerImage
        description(asHtml: false)
        averageScore
        episodes
      }
    }
  `;

  const variables = { malId: malId };

  try {
    const data = await client.request(query, variables);
    return data.Media;
  } catch (err) {
    console.error('Erro na API AniList:', err);
    return null;
  }
}

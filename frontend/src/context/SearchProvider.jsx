import { useState, useEffect } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const timeoutId = setTimeout(() => {
      const fetchResults = async () => {
        const gqlQuery = {
          query: `
            query ($search: String) {
              Page(perPage: 10) {
                media(search: $search, type: ANIME) {
                  id
                  title {
                    romaji
                  }
                  coverImage {
                    large
                  }
                }
              }
            }
          `,
          variables: { search: query },
        };

        const res = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(gqlQuery),
        });

        const data = await res.json();
        setResults(data.data.Page.media);
      };

      fetchResults();
    }, 500); // debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results }}>
      {children}
    </SearchContext.Provider>
  );
}

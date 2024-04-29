import axios from "axios";
import { useEffect, useState } from "react";

import { AlbumFromSearch, SongFromSearch, ArtistFromSearch } from "../utils/index.tsx";

export interface SearchResults {
    artists: ArtistFromSearch[];
    songs: SongFromSearch[];
    albums: AlbumFromSearch[];
  }

export default function useSearchResults(filter:string) {
    const baseUrl = `http://localhost:4000/api/search?query=${filter}`;
    const [searchResults, setSearchResults] = useState({
      songs: [],
      artists: [],
      albums: [],
    });
  
    useEffect(() => {
      if (!filter) return;
  
      const getSearch = async () => {
        try {
            const response = await axios.get(baseUrl);
            setSearchResults(response.data.data);
        } catch (err) {
          console.error("Failed to fetch data:", err);
          setSearchResults({
            songs: [],
            artists: [],
            albums: [],
          });
        }
      };
  
      getSearch();
    }, [baseUrl, filter]);
  
    return searchResults;
  }
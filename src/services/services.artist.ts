import axios from "axios";
import { useEffect, useState } from "react";

interface TrackData {
  id: number;
  name: string;
  thumbnail: string;
}

interface Track {
  Track: TrackData;
}

interface AlbumData {
  id: number;
  name: string;
  imageUrl: string;
}

interface Album {
  Album: AlbumData;
}

export interface Artist {
  first_name: string;
  img: string;
  ArtistTracks: Track[];
  AlbumArtist: Album[];
}

export interface ArtistInfo {
  artist: Artist[];
}

export default function useArtist(userId: string) {
  const baseUrl = `http://localhost:4000/api/artist/${userId}`;
  
  const [artistInfo, setArtistInfo] = useState({
    artist: [],
  });
 

  useEffect(() => {
     if (!userId) return;

    const getArtist = async () => {
      try {
        console.log("dentro");
        const response = await axios.get(baseUrl);
        console.log(response);
        setArtistInfo(response.data.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setArtistInfo({
          artist: [],
        });
      }
    };

    getArtist();
  }, [baseUrl]);

  console.log(artistInfo.artist[0]);

  return artistInfo.artist[0];
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAlbums, getArtists } from "../../contexts/GetTrack";
import {
  getFollowedPlaylistsByUserId,
  getPlaylists,
} from "../../services/services.playlist";

interface Albums {
  id: number;
  name: string;
  imageUrl: string;
  artist: string;
}

export function TopAlbums() {
  const [albums, setAlbums] = useState<Albums[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsData = await getAlbums();
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error al obtener los álbumes:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="flex gap-8">
      {albums.map((album) => (
        <div key={album.id} className="w-40">
          <Link to={`/album/${album.id}`}>
            <img
              className="rounded-2xl"
              src={album.imageUrl}
              alt={album.name}
            />
          </Link>
          <p className="text-tops">{album.name}</p>
          <p className="text-names">{album.artist}</p>
        </div>
      ))}
    </div>
  );
}

interface Artists {
  id: number;
  name: string;
  photoUrl: string;
}

export function TopArtist() {
  const [artists, setArtists] = useState<Artists[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistsData = await getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error al obtener los artistas:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="flex gap-8">
      {artists.length > 0 &&
        artists.map((artist) => (
          <div key={artist.id} className="w-40">
            <img
              className="rounded-2xl"
              src={artist.photoUrl}
              alt={artist.name}
            />

            <p className="text-white">{artist.name}</p>
          </div>
        ))}
    </div>
  );
}

interface Playlist {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
}

export function TopPlaylist() {
  const [playslits, setMovies] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getFollowedPlaylistsByUserId(3);
      if (playlistData) {
        setMovies(playlistData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex gap-8">
      {playslits.length > 0 &&
        playslits.map((playlist) => (
          <div key={playlist.id} className="w-40">
            <Link to={`/playlist/${playlist.id}`}>
              <img
                className="rounded-2xl"
                src={playlist.imageUrl}
                alt={playlist.name}
              />
            </Link>

            <p className="text-white">{playlist.name}</p>
          </div>
        ))}
    </div>
  );
}

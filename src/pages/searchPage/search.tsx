import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFilter } from "../../contexts/FilterContext";
import debounce from "lodash/debounce";
import {
  AlbumFromSearch,
  ArtistFromSearch,
  SearchResult,
  SongFromSearch,
} from "../../utils/index.tsx";
import { PublicRoutes } from "../../types/routes.ts";
import { Link } from "react-router-dom";

export default function SearchBarPage() {
  const { filter, handleSetFilter } = useFilter();
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = (e: any) => {
    const newFilter = e.target.value;

    handleSetFilter(newFilter);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleFilter = useCallback(
    debounce((newValue) => handleSetFilter(newValue), 50),
    [handleSetFilter]
  );

  const baseUrl = `http://localhost:4000/api/search?query=${filter}`;

  const [searchResults, setSearchResults] = useState<SearchResult>({
    songs: [],
    artists: [],
    albums: [],
  });

  useEffect(() => {
    if (!filter) return;
    const getSearch = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSearchResults(data.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setSearchResults({
          songs: [],
          artists: [],
          albums: [],
        }); 
      } finally {
        setLoading(false);
      }
    };

    if (filter) {
      getSearch();
    }
  }, [baseUrl, filter]);
  
  const artists = searchResults.artists;
  const songs = searchResults.songs;
  const albums = searchResults.albums;



  return (
    <div className="flex flex-col bg-background h-screen">
      <form className="mt-10 ml-10 lg:ml-20">
        <label className="text-tops text-4xl lg:ml-40">Search</label>
        <br />
        <input
          className="input p-1.5 rounded mt-5 bg-names lg:ml-40"
          type="text"
          placeholder="Artist, song or album"
          value={filter}
          onChange={(e) => debouncedHandleFilter(e.target.value)}
        />
      </form>

      {!filter || filter.length < 4 ? (
        <p className="text-tops text-2xl mt-10 ml-12 lg:ml-80">Top songs</p>
      ) : (
        <>
          {songs?.length > 0 ? (
            <div className="lg:ml-5">
              <h3 className="text-tops text-lg ml-5 lg:ml-80">Songs</h3>
              {songs.map((song) => (
                <SearchResultSong
                  song={song}
                  key={song.id}
                  setSelectedSongId={setSelectedSongId}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 ml-5 lg:ml-80">No songs found</div>
          )}

          {artists?.length > 0 ? (
            <div className="lg:ml-80">
              <h3 className="text-tops text-lg ml-5">Artists</h3>
              {artists.map((artist) => (
                <SearchResultArtist artist={artist} key={artist.id} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 ml-5 lg:ml-80">No artists found</div>
          )}

          {albums?.length > 0 ? (
            <div className="lg:ml-80">
              <h3 className="text-tops text-lg ml-5">Albums</h3>
              {albums.map((album) => (
                <SearchResultAlbum album={album} key={album.id} />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 ml-5 lg:ml-80">No albums found</div>
          )}
        </>
      )}
    </div>
  );
}

export function SearchResultSong({
  song,
  setSelectedSongId,
}: {
  song: SongFromSearch;
  setSelectedSongId: (id: number | null) => void;
}) {
  const handleClick = () => {
    setSelectedSongId(song.id);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-btn my-2 mx-5 rounded flex cursor-pointer lg:ml-80 lg:max-w-80"
    >
      <img className="w-8 h-8 m-2" src={song.thumbnail} />
      <div>
        <p className="text-black ml-5">{song.name}</p>
        <p className="text-black ml-5">{song.artist}</p>
      </div>
    </div>
  );
}
export function SearchResultArtist({ artist }: { artist: ArtistFromSearch }) {
  return (
    <Link to={PublicRoutes.SONG}>
      <div className="bg-btn my-2 mx-5 rounded flex  lg:max-w-80">
        <img className="w-8 h-8 m-2" src={artist.profilePicture} />
        <p className="text-black ml-5">{artist.first_name}</p>
      </div>
    </Link>
  );
}

export function SearchResultAlbum({ album }: { album: AlbumFromSearch }) {
  return (
    <Link to={PublicRoutes.SONG}>
      <div className="bg-btn my-2 mx-5 rounded flex  lg:max-w-80">
        <img src={album.imageUrl} className="w-8 h-8 m-2" />
        <div>
          <p className="text-black ml-5">{album.name}</p>
          <p className="text-black ml-5">{album.artist}</p>
        </div>
      </div>
    </Link>
  );
}

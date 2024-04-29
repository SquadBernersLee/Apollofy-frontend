import { useCallback } from "react";
import { useFilter } from "../../contexts/FilterContext.tsx";
import debounce from "lodash/debounce";
import {
  AlbumFromSearch,
  ArtistFromSearch,
  SearchResult,
  SongFromSearch,
} from "../../utils/index.tsx";

import { Link } from "react-router-dom";
import { NavBar } from "../../components/navbar/index.tsx";
import useSearchResults from "../../services/services.search.ts";

export default function SearchBarPage() {
  const { filter, handleSetFilter } = useFilter();
  const searchResults: SearchResult = useSearchResults(filter);
  console.log(searchResults);

  const debouncedHandleFilter = useCallback(
    debounce((newValue) => handleSetFilter(newValue), 50),
    [handleSetFilter]
  );

  const artists = searchResults.artists;
  const songs = searchResults.songs;
  const albums = searchResults.albums;
  return (
    <>
      <div className="flex flex-col bg-background h-screen">
        <form className="mt-10 ml-10 mb-5 lg:ml-20">
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

        {!filter || filter.length < 3 ? (
          <p className="text-tops text-2xl mt-10 ml-12 lg:ml-80">
            Search your favourite music!
          </p>
        ) : (
          <>
            {songs?.length > 0 ? (
              <div className="lg:ml-5">
                <h3 className="text-tops text-lg ml-5 lg:ml-80">Songs</h3>
                {songs.map((song) => (
                  <SearchResultSong
                    song={song}
                    key={song.id}
                    //setSelectedSongId={setSelectedSongId}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 ml-5 mt-3 lg:ml-80">
                No songs found
              </div>
            )}

            {artists?.length > 0 ? (
              <div className="lg:ml-80">
                <h3 className="text-tops text-lg ml-5">Artists</h3>
                {artists.map((artist) => (
                  <SearchResultArtist artist={artist} key={artist.id} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 ml-5 mt-3 lg:ml-80">
                No artists found
              </div>
            )}

            {albums?.length > 0 ? (
              <div className="lg:ml-80">
                <h3 className="text-tops text-lg ml-5">Albums</h3>
                {albums.map((album) => (
                  <SearchResultAlbum album={album} key={album.id} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 ml-5 mt-3 lg:ml-80">
                No albums found
              </div>
            )}
          </>
        )}
      </div>

      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </>
  );
}

export function SearchResultSong({
  song,
  //setSelectedSongId,
}: {
  song: SongFromSearch;
  //setSelectedSongId: (id: number | null) => void;
}) {
  const handleClick = () => {
    // setSelectedSongId(song.id);
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
  console.log(artist.id);
  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="bg-btn my-2 mx-5 rounded flex  lg:max-w-80">
        <img className="w-8 h-8 m-2" src={artist.img} />
        <p className="text-black ml-5">{artist.first_name}</p>
      </div>
    </Link>
  );
}

export function SearchResultAlbum({ album }: { album: AlbumFromSearch }) {
  return (
    <Link to={`/album/${album.id}`}>
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

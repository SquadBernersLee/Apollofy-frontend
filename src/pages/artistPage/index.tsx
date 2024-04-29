import { useParams } from "react-router";
import { NavBar } from "../../components/navbar";
import useArtist, { Artist } from "../../services/services.artist";



export default function ArtistPage() {
  const { userId } = useParams<{ userId?: string }>();
  const artist = useArtist(userId ?? "") as Artist | undefined;

  if (!userId || !artist) {
    return <div>No artist found. Please provide a valid ID.</div>;
  }
  
  return (
    <div className="flex flex-col bg-background h-screen">
      <h1 className="text-names text-3xl flex justify-center mt-6 ">
        {artist.first_name}
      </h1>
      <div className="flex justify-center m-5">
        <img className="w-25 h-25 justify-center" src={artist.img} />
      </div>
      <h2 className="m-3 ml-10 text-names text-xl">Albums</h2>
      <div>
        {artist.AlbumArtist.map((album) => (
          <div className="bg-btn my-2 mx-5 rounded flex  lg:max-w-80">
            <img src={album.Album.imageUrl} className="w-8 h-8 m-2" />
            <div>
              <p className="text-black ml-5">{album.Album.name}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="m-3 ml-10 text-names text-xl">Songs</h2>
      <div>
        {artist.ArtistTracks.map((song) => (
          <div className="bg-btn my-2 mx-5 rounded flex  lg:max-w-80">
            <img src={song.Track.thumbnail} className="w-8 h-8 m-2" />
            <div>
              <p className="text-black ml-5">{song.Track.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
}

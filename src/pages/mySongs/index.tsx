// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar";
// import { useAuth } from "../../contexts/AuthContext";
// import { usePlayer } from "../../contexts/AudioPlayerContext";
// import VerticalScrollLayout from "../../layouts/verticalScroll";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { getAllLikedTracks } from "../../services/services.tracks";
import VerticalScrollLayout from "../../layouts/verticalScroll";
import IndividualMySong from "../../components/individualMySong";
import { usePlayer } from "../../contexts/AudioPlayerContext";
// import IndividualMySong from "../../components/individualMySong";

// interface Song {
//   id: number;
//   name: string;
//   artist: string;
//   url: string;
//   thumbnail: string;
//   genre: string;
//   liked: boolean;
// }
interface Track {
  id: number;
  name: string;
  url: string;
  genreId: number;
  albumId: number;
  thumbnail: string;
}

export function MySongs() {
  /*   const { user } = useAuth();
   */
  const { setUsingLiked, setSongs, setCurrentSongIndex } = usePlayer();
  /*   const [likedSongs] = useState<Song[]>();
   */
  /*  useEffect(() => {
    const filteredSongs = songs.filter((song) =>
    user.likedSongs.includes(song.id)
   );
   setLikedSongs(filteredSongs);
}, [songs, user]); */

  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);

  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      const userid = 3; // Replace with the actual user ID
      const response = await getAllLikedTracks(userid);
      setLikedTracks(response);
      console.log(response); // Logging the likedTracks data
    };
    fetchLikedTracks();
  }, []);

  return (
    <div className="bg-background h-screen w-screen relative">
      <div className="pt-10 pl-20 lg:ml-5/12">
        <img
          src="src/assets/images/liked.jpeg"
          alt=""
          className="w-52 ml-10 top-20 left-20 rounded-xl"
        />
      </div>

      <div className=" pt-10 pl-5 pb-5 ml-7 lg:ml-40">
        <p className="text-names text-3xl lg:ml-5/12">My songs</p>
      </div>

      <VerticalScrollLayout height="30rem">
        <div className="ml-5">
          {likedTracks?.map((song) => {
            const isSelected = song.id === selectedSongId;
            const handleSongClick = () => {
              setSelectedSongId(song.id);
              setUsingLiked(true);
              setCurrentSongIndex(0);
              setSongs(likedTracks);
            };
            return (
              <IndividualMySong
                key={song.id}
                songName={song.name}
                groupName={"song.artist"}
                isSelected={false}
                onClick={handleSongClick}
              />
            );
          })}
        </div>
      </VerticalScrollLayout>

      {/* <VerticalScrollLayout height="30rem"> */}
      {/* <div className="ml-5">
          {likedSongs?.map((song) => {
            const isSelected = song.id === selectedSongId;
            const handleSongClick = () => {
              setSelectedSongId(song.id);
              setUsingLiked(true);
              setCurrentSongIndex(0);
              setSongs(likedSongs);
            };
            return (
              <IndividualMySong
                key={song.id}
                songName={song.name}
                groupName={song.artist}
                isSelected={isSelected}
                onClick={handleSongClick}
              />
            );
          })}
        </div> */}
      {/* </VerticalScrollLayout> */}

      <div className="absolute bottom-14 w-screen">
        <SmallShowPlaySong selectedSongId={null} />
        {/* selectedSongId={selectedSongId} */}
      </div>
      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
}

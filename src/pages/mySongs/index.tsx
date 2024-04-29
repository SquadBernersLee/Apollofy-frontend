
import { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { getAllLikedTracks } from "../../services/services.tracks";
import VerticalScrollLayout from "../../layouts/verticalScroll";
import IndividualMySong from "../../components/individualMySong";
import { usePlayer } from "../../contexts/AudioPlayerContext";

interface Track {
  id: number;
  name: string;
  url: string;
  genreId: number;
  albumId: number;
  thumbnail: string;
}

export function MySongs() {

  const { setUsingLiked, setSongs, setCurrentSongIndex } = usePlayer();


  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);

  const [likedTracks, setLikedTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchLikedTracks = async () => {
      const userid = 3;
      const response = await getAllLikedTracks(userid);
      setLikedTracks(response);
      console.log(response);
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

      <div className="absolute bottom-14 w-screen">
        <SmallShowPlaySong selectedSongId={null} />
      </div>
      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
}

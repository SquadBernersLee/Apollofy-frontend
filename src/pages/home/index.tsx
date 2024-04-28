// import { AvatarGenerator } from "random-avatar-generator";
import HorizontalScrollLayout from "../../layouts/horizontalScroll";
import VerticalScrollLayout from "../../layouts/verticalScroll";
import { NavBar } from "../../components/navbar";
import { AllPlaylist, TopAlbums, TopArtist } from "../../common/musicProfile";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { useEffect, useState } from "react";
import { usePlayer } from "../../contexts/AudioPlayerContext";
import { getSongs } from "../../contexts/GetTrack";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
} from "../../services/services.playlist";
// import { useAuth } from "../../contexts/AuthContext";

interface Playlist {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
}

const HomePage = () => {
  const { setSongs } = usePlayer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsData = await getSongs();
        setSongs(songsData);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchData();
  }, [setSongs]);

  const [playslits, setPlaylist] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylists();
      if (playlistData) {
        setPlaylist(playlistData);
      }
    };

    fetchData();
  }, []);

  const newPlaylist = async () => {
    const newPlaylistData = {
      name: "My New Playlist",
      imageUrl: "https://example.com/image.jpg",
      description: "This is my new playlist",
      primaryColor: "#ff0000",
      userId: 3,
    };

    try {
      const response = await createPlaylist(newPlaylistData);
      if (response) {
        setPlaylist((prevPlaylists) => [...prevPlaylists, response]);
      }
    } catch (error) {
      console.error("Error creating new playlist:", error);
    }
  };

  const changedPlaylist = async () => {
    const playlistId = 1;
    const newPlaylistName = "changeFronfront";

    try {
      const response = await updatePlaylist({
        id: playlistId,
        name: newPlaylistName,
        imageUrl: "asfasdfasdf",
        description: "descri",
        primaryColor: "red",
        userId: 1,
      });
      if (response) {
        setPlaylist((prevPlaylists) =>
          prevPlaylists.map((playlist) => {
            if (playlist.id === playlistId) {
              return { ...playlist, name: newPlaylistName };
            }
            return playlist;
          })
        );
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };
  return (
    <div className="relative h-screen bg-background">
      <div className="lg:ml-12">
        <div className="relative flex">
          <svg
            className="h-12 absolute top-5 right-5"
            data-slot="icon"
            data-darkreader-inline-stroke=""
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          ></svg>
        </div>

        <VerticalScrollLayout height="42rem">
          <div className="ml-20"></div>
          <div className="mt-5 ml-5">
            <h2 className="text-2xl mb-5 text-tops">Top Albums</h2>
            <HorizontalScrollLayout>
              <TopAlbums />
            </HorizontalScrollLayout>
          </div>
          <div className="mt-5 ml-5 ">
            <h2 className="text-2xl mb-5 text-tops">Top Artists</h2>
            <HorizontalScrollLayout>
              <TopArtist />
            </HorizontalScrollLayout>
          </div>
          <div className="mt-5 ml-5 ">
            <h2 className="text-2xl mb-5 text-tops">Top Playlists</h2>
            <HorizontalScrollLayout>
              <AllPlaylist />
            </HorizontalScrollLayout>
          </div>
        </VerticalScrollLayout>
      </div>
      <div className="absolute bottom-14 w-screen">
        <SmallShowPlaySong selectedSongId={null} />
      </div>
      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
};

export default HomePage;

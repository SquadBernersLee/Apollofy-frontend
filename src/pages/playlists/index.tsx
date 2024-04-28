import React, { useEffect, useState } from "react";
import { NavBar } from "../../components/navbar";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
} from "../../services/services.playlist";
import HorizontalScrollLayout from "../../layouts/horizontalScroll";
import { FollowedPlaylist } from "../../common/musicProfile";
import VerticalScrollLayout from "../../layouts/verticalScroll";
import CreatePlaylist from "../../components/createPlaylist";

interface Playlist {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
}

const PlaylistsPage = () => {
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
    <div className="bg-black h-screen w-screen relative">
      <div className="absolute top-12">
        <h2 className="text-2xl mb-5 text-tops">Your Playlists</h2>
        <div className="">
          <CreatePlaylist />
        </div>

        <div className="mt-12">
          <FollowedPlaylist />
        </div>
      </div>

      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
};

export default PlaylistsPage;

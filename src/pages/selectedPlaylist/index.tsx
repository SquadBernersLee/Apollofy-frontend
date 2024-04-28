import React, { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { NavBar } from "../../components/navbar";
import {
  followUnfollow,
  getPlaylistById,
  getSongsByPlaylistId,
} from "../../services/services.playlist";
import { useNavigate, useParams } from "react-router";
import VerticalScrollLayout from "../../layouts/verticalScroll";

export interface Track {
  id: number;
  name: string;
  url: string;
  genreId: number;
  albumId: number;
  thumbnail: string;
}

interface Playlist {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
}
3;

const SelectedPlaylist = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { playlistid } = useParams<{ playlistid?: string }>();
  const number = parseInt(playlistid || "");
  const [currePlaylist, setCurrePlaylist] = useState<Playlist | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getSongsByPlaylistId(number);
      if (playlistData) {
        setTracks(playlistData);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currePlaylist = await getPlaylistById(number);
      if (currePlaylist) {
        setCurrePlaylist(currePlaylist);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const checkIfFollowing = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistid}/followers/contains`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setIsFollowing(data[0]);
  };

  useEffect(() => {
    checkIfFollowing();
  }, []);

  const handleFollowUnfollow = async () => {
    try {
      const response = await followUnfollow(3, parseInt(playlistid!));
      if (response) {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black h-screen w-screen relative">
      <button onClick={goBack}>
        <IoChevronBackSharp className="text-2xl text-white ml-3 mt-3 hover:text-accent" />
      </button>
      <div className="pt-10 pl-20">
        <img
          src={currePlaylist?.imageUrl}
          alt=""
          className="w-52  top-20 left-20 rounded-xl"
        />
        <div>
          <button
            className="text-white"
            style={{ backgroundColor: isFollowing ? "red" : "green" }}
            onClick={handleFollowUnfollow}
          >
            {isFollowing ? "Not Following" : "Following"}
          </button>
        </div>
      </div>

      <div className="pt-10 pl-5 ">
        <p className="text-white text-3xl">{currePlaylist?.name}</p>
      </div>
      <div className="  pl-5 pb-10">
        <p className="text-white text-xl">{currePlaylist?.description}</p>
      </div>

      <VerticalScrollLayout height="25rem">
        <div className=" w-screen">
          {tracks.length > 0 &&
            tracks.map((track) => (
              <div key={track.id} className="w-40">
                <img className="rounded-2xl" src={track.url} alt={track.name} />

                <p className="text-white">{track.name}</p>
              </div>
            ))}
        </div>
      </VerticalScrollLayout>
      <div className="absolute bottom-14 w-screen">
        {/*         <SmallShowPlaySong selectedSongId={selectedSongId} />
         */}{" "}
      </div>
      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
};

export default SelectedPlaylist;

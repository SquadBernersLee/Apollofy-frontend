import { Link } from "react-router-dom";
import { PublicRoutes } from "../../types/routes";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import "../audioPlayer/audioPlayer.css";
import { usePlayer } from "../../contexts/AudioPlayerContext";

interface props {
  selectedSongId: number | null;
}
export function SmallShowPlaySong({ selectedSongId }: props) {
  const {
    playing,
    setPlaying,
    currentTime,
    setCurrentTime,
    currentSongIndex,
    setCurrentSongIndex,
    volume,
    songs,
  } = usePlayer();

  //played represent the progress in the input range
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  //initialCurrentTimeSet is the boolean that controls that the context currentTime value is loaded only when the page mounts
  const [initialCurrentTimeSet, setInitialCurrentTimeSet] = useState(false); // Add this state

  //playerRef reference to the ReactPlayer component
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (selectedSongId !== null && selectedSongId !== undefined) {
      const newSongIndex = songs.findIndex(
        (song) => song.id === selectedSongId
      );
      if (newSongIndex !== -1) {
        setCurrentSongIndex(newSongIndex);
      }
    }
  }, [selectedSongId, setCurrentSongIndex, songs]);

  //this useEffect updates the currentTime state while the audio is playing. It updates every second and does it if the song is playing so if playing state is changed. the return is to clear the interval when the component unmounts.
  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(playerRef.current?.getCurrentTime() || 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, setCurrentTime]);

  //every time a song in changed to set to 0 this values. So that when song change the next start from 0.
  useEffect(() => {
    playerRef.current?.seekTo(0);
    setPlayed(0);
    setCurrentTime(0);
  }, [currentSongIndex, setCurrentTime]);

  //ensures that when the component mounts, the initial current time of the audio player is set to the context's current time if it's available.  It helps synchronize the audio playback position with the stored current time value in the context, ensuring continuity between different sessions or when navigating between components.
  useEffect(() => {
    if (!initialCurrentTimeSet && currentTime !== 0) {
      playerRef.current?.seekTo(currentTime);
      setInitialCurrentTimeSet(true);
    }
  }, [currentTime, initialCurrentTimeSet]);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  //callback function that is triggered when the user interacts with the seek bar (input element) to change the playback position of the audio.
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekValue = parseFloat(e.target.value);
    setPlayed(seekValue);
    //set the time of the player to seekValue that is the one clicked
    playerRef.current?.seekTo(seekValue);
  };

  //this function controls the drag of the seek bar. so when you mouseup (stop clicking) the bar updates the time in the player.
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    playerRef.current?.seekTo(parseFloat(e.currentTarget.value));
  };

  //when you are moving the bar from left to right, this controls that the song stops and starts.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProgress = (state: any) => {
    if (!state.seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <section className="lg:bottom-0 lg:mt-10 lg:ml-12 mb-11 bg-black">
      <ReactPlayer
        width="1px"
        height="1px"
        ref={playerRef}
        url={
          songs.length > 0 && currentSongIndex !== null
            ? songs[currentSongIndex].url
            : ""
        }
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />

      <div className="show flex relative">
        {songs.length > 0 && currentSongIndex !== null && (
          <div className=" imgsmall">
            <img
              src={songs[currentSongIndex].thumbnail}
              alt={songs[currentSongIndex].name}
            />
          </div>
        )}

        <Link to={PublicRoutes.SONG}>
          <div>
            <p className="text-white ml-5 hover:text-btn">
              {songs.length > 0 && currentSongIndex !== null
                ? songs[currentSongIndex].name
                : ""}
            </p>
            <p className="text-white ml-5 text-sm hover:text-btn">
              {songs.length > 0 && currentSongIndex !== null
                ? songs[currentSongIndex].artist
                : ""}
            </p>
          </div>
        </Link>

        <div>
          <div className="absolute right-5 top-1">
            <button onClick={togglePlaying}>
              {playing ? (
                <IoPauseCircleOutline className="text-4xl text-white hover:text-btn" />
              ) : (
                <IoPlayCircleOutline className="text-4xl text-white hover:text-btn" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 flex h-2">
        <input
          className="w-screen"
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          style={{
            background: `linear-gradient(to right, green ${
              played * 100
            }%, transparent 0%)`,
            WebkitAppearance: "none",
          }}
        />
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import {
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoPlaySkipBackSharp,
  IoPlaySkipForward,
  IoHeart,
} from "react-icons/io5";
import { LiaRandomSolid } from "react-icons/lia";
import { MdOutlineRestartAlt } from "react-icons/md";
import "./audioPlayer.css";
import { usePlayer } from "../../contexts/AudioPlayerContext";

import { useAuth } from "../../contexts/AuthContext";
import {
  addSongToUserLikedSongs,
  // deleteSongFromUserLikedSongs,
} from "../../utils";
import { likeTrack } from "../../services/services.tracks";

const AudioPlayer = () => {
  const {
    playing,
    setPlaying,
    currentTime,
    setCurrentTime,
    currentSongIndex,
    setCurrentSongIndex,
    volume,
    setVolume,
    songs,
  } = usePlayer();

  const { user, updateUser } = useAuth();

  const handleAddSongClick = async () => {
    try {
      console.log("todata" + songs[currentSongIndex].id);
      const updatedUser = await likeTrack(3, songs[currentSongIndex].id);

      updateUser(updatedUser);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const [initialCurrentTimeSet, setInitialCurrentTimeSet] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        setCurrentTime(playerRef.current?.getCurrentTime() || 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, setCurrentTime]);

  useEffect(() => {
    playerRef.current?.seekTo(0);
    setPlayed(0);
    setCurrentTime(0);
  }, [currentSongIndex, setCurrentTime]);

  useEffect(() => {
    if (!initialCurrentTimeSet && currentTime !== 0) {
      playerRef.current?.seekTo(currentTime);
      setInitialCurrentTimeSet(true);
    }
  }, [currentTime, initialCurrentTimeSet]);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekValue = parseFloat(e.target.value);
    setPlayed(seekValue);
    playerRef.current?.seekTo(seekValue);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    playerRef.current?.seekTo(parseFloat(e.currentTarget.value));
  };
  const handleProgress = (state: any) => {
    if (!state.seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSkipBackward = () => {
    const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
  };

  const handleSkipForward = () => {
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <div className="bg-background relative">
        <div className="absolute right-5">
          {/* Button triggering the function */}
          <button onClick={handleAddSongClick}>
            <IoHeart
              className="text-white hover:text-btn"
              style={{ fontSize: "2em", cursor: "pointer" }}
            />
          </button>
        </div>
        <div className="mt-10">
          <p className="text-white">Volume:</p>
          <input
            className="w-20 appearance-none h-1 rounded-md"
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              background: `linear-gradient(to right, blue ${
                volume * 100
              }%, transparent 0%)`,
              WebkitAppearance: "none",
            }}
          />
        </div>
        <div>
          <ReactPlayer
            width="100%"
            height="80px"
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
        </div>
        <div className="bg-gray-300 flex">
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
              background: `linear-gradient(to right, blue ${
                played * 100
              }%, transparent 0%)`,
              WebkitAppearance: "none",
            }}
          />
        </div>
        <div className="relative">
          <span className="ml-5 text-white hover:text-btn">
            {formatTime(currentTime)}
          </span>
          <span className="absolute right-5 text-white hover:text-btn">
            {formatTime(duration)}
          </span>
        </div>
        <div className="w-screen flex gap-10 justify-center">
          {/*           <LiaRandomSolid className="text-4xl text-white hover:text-btn" />
           */}{" "}
          <button aria-label="Skip Back">
            <IoPlaySkipBackSharp
              className="text-4xl text-white hover:text-btn"
              onClick={handleSkipBackward}
            />
          </button>
          <button aria-label="Play Pause" onClick={togglePlaying}>
            {playing ? (
              <IoPauseCircleOutline data-testid="pause-icon" className="text-4xl text-white hover:text-btn" />
            ) : (
              <IoPlayCircleOutline data-testid="play-icon" className="text-4xl text-white hover:text-btn" />
            )}
          </button>
          <button aria-label="Skip Forward">
          <IoPlaySkipForward
            className="text-4xl text-white hover:text-btn"
            onClick={handleSkipForward}
          /></button>
          {/*           <MdOutlineRestartAlt className="text-4xl text-white hover:text-btn" />
           */}{" "}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;

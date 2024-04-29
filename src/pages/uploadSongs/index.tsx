import React, { useState } from "react";
import { NavBar } from "../../components/navbar";
import VerticalScrollLayout from "../../layouts/verticalScroll";
import { addAlbum } from "../../services/services.albums";
import { createTrack } from "../../services/services.tracks";

const UploadSongs = () => {
  const [trackData, setTrackData] = useState({
    name: "",
    url: "",
    genreId: 0,
    albumId: 0,
    thumbnail: "",
  });
  const [albumData, setAlbumData] = useState({
    name: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrackData({ ...trackData, [name]: value });
  };
  const handleAlbumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedTrackData = {
        ...trackData,
        genreId: 1,
        albumId: 2,
      };

      // Call createTrackService with trackData
      await createTrack(updatedTrackData);
      console.log("track data:" + JSON.stringify(updatedTrackData));
      // Reset form fields
      setTrackData({
        name: "",
        url: "",
        genreId: 0,
        albumId: 0,
        thumbnail: "",
      });
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };
  const handleAlbumSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the addAlbum service function
      await addAlbum(albumData);
      console.log("Album added successfully!");
      // Reset form fields
      setAlbumData({
        name: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  return (
    <div className="bg-black h-screen w-screen relative flex justify-center items-center">
      <VerticalScrollLayout height="50rem">
        <div className="max-w-md bg-gray-800 p-8 rounded-md">
          <h2 className="text-2xl mb-5 mt-8 text-white">Upload albums here:</h2>

          <form onSubmit={handleAlbumSubmit} className="space-y-2">
            <div>
              <label htmlFor="albumName" className="text-white">
                Album Name:
              </label>
              <input
                type="text"
                id="albumName"
                name="name"
                value={albumData.name}
                onChange={handleAlbumChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="text-white">
                Image URL:
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={albumData.imageUrl}
                onChange={handleAlbumChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Submit Album
            </button>
          </form>
        </div>
        <div className="max-w-md bg-gray-800 p-8 rounded-md mb-12">
          <h2 className="text-2xl mb-5 text-white">Upload songs here:</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={trackData.name}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="url" className="text-white">
                URL:
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={trackData.url}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="genreId" className="text-white">
                Genre ID:
              </label>
              <input
                type="number"
                id="genreId"
                name="genreId"
                value={trackData.genreId}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="albumId" className="text-white">
                Album ID:
              </label>
              <input
                type="number"
                id="albumId"
                name="albumId"
                value={trackData.albumId}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className="text-white">
                Thumbnail:
              </label>
              <input
                type="text"
                id="thumbnail"
                name="thumbnail"
                value={trackData.thumbnail}
                onChange={handleChange}
                className="w-full rounded-md bg-gray-700 text-white px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </VerticalScrollLayout>

      <div className="absolute bottom-0 w-screen">
        <NavBar />
      </div>
    </div>
  );
};

export default UploadSongs;

import React, { useState } from "react";
import { createPlaylist } from "../../services/services.playlist";

const CreatePlaylist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent page reload
    createPlaylist({
      name: playlistName,
      imageUrl: imageURL,
      description: description,
      primaryColor: "any",
      userId: 3,
    })
      .then((response) => {
        console.log("Playlist created successfully:", response);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
      });
  };

  return (
    <div className="flex justify-center items-center ">
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create Playlist
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white">
                  Name:
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(event) => setPlaylistName(event.target.value)}
                    className="form-input mt-1 block w-full text-black "
                  />
                </label>
              </div>
              <div>
                <label className="block text-white">
                  Image URL:
                  <input
                    type="text"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                    className="form-input mt-1 block w-full text-black"
                  />
                </label>
              </div>
              <div>
                <label className="block text-white">
                  Description:
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="form-textarea mt-1 block w-full text-black"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Playlist
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Playlist
        </button>
      )}
    </div>
  );
};

export default CreatePlaylist;

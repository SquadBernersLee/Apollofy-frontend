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
    <div>
      {isOpen ? (
        <div className="modal">
          <div className="modal-content ">
            <h2 className="text-white">Create Playlist</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(event) => setPlaylistName(event.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Image URL:
                  <input
                    type="text"
                    value={imageURL}
                    onChange={(event) => setImageURL(event.target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Description:
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </label>
              </div>
              <button type="submit">Create Playlist</button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={handleOpen}>Crear playlist</button>
      )}
    </div>
  );
};

export default CreatePlaylist;

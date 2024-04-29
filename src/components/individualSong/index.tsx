import { useState } from "react";
import { IoHeart, IoOptions } from "react-icons/io5";
import { deleteTrack } from "../../services/services.tracks";

interface props {
  songId: number;
  songName: string;
  groupName: string;
  isSelected: boolean;
  onClick: () => void;
}

const IndividualSong = ({
  songId,
  songName,
  groupName,
  isSelected,
  onClick,
}: props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleDeleteTrack = async () => {
    // Call the deleteTrack function with the songId
    const response = await deleteTrack(songId);
    if (response) {
      // Optionally handle success response
      console.log("Track deleted successfully:", response);
    } else {
      // Optionally handle error
      console.error("Failed to delete track");
    }
    setPopupVisible(false);
  };
  return (
    <div>
      <div
        className={`mb-12  w-screen relative ${isSelected ? "text-blue-600" : "text-white"}`}
        onClick={onClick}
      >
        <p className="text-xl">{songName}</p>
        <p className="text-xs">{groupName}</p>
        <div className="absolute right-10 top-1 flex gap-3">
          {/* Button triggering the function */}
          <button>
            <IoHeart
              className="text-white hover:text-accent"
              style={{ fontSize: "2em", cursor: "pointer" }}
            />
          </button>
          <button onClick={togglePopup}>
            <IoOptions
              className="text-white hover:text-accent"
              style={{ fontSize: "2em", cursor: "pointer" }}
            />
          </button>
        </div>
      </div>
      {isPopupVisible && (
        <div className="absolute right-18 top-12 bg-white p-4 border border-gray-300">
          <button
            className="mr-2 border border-gray-300 px-4 py-2"
            onClick={handleDeleteTrack}
          >
            Delete track
          </button>
          <button className="border border-gray-300 px-4 py-2">Button 2</button>
          <button
            className="mr-2 border border-gray-300 px-4 py-2"
            onClick={() => {
              setPopupVisible(false);
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default IndividualSong;

import axios from "axios";

const baseUrl = "http://localhost:4000/api/album";

export const addAlbum = async (albumData: {
  name: string;
  imageUrl: string;
}) => {
  try {
    const response = await axios.post(baseUrl, albumData);
    return response.data;
  } catch (err) {
    console.error("Error adding album:", err);
    throw err;
  }
};

export const getAlbums = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

const baseUrl2 = "http://localhost:4000/api/album/withTracks";

export const getAlbumsWithTracks = async () => {
  try {
    const response = await axios.get(baseUrl2);

    return response.data;
  } catch (err) {
    return null;
  }
};

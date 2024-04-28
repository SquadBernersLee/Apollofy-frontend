import axios from "axios";

const baseUrl = "http://localhost:4000/api/album";

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

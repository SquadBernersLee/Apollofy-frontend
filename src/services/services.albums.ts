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

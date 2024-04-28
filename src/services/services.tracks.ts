import axios from "axios";

const baseUrl = "http://localhost:4000/api/track";

type Track = {
  name: string;
  url: string;
  genreId: number;
  albumId: number;
  thumbnail: string;
};

export const createTrack = async ({
  name,
  url,
  genreId,
  albumId,
  thumbnail,
}: Track) => {
  try {
    const response = await axios.post(baseUrl, {
      name,
      url,
      genreId,
      albumId,
      thumbnail,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getAllLikedTracks = async (userid: number) => {
  try {
    const response = await axios.get(`${baseUrl}/likeTrack/${userid}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const getTracks = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const likeTrack = async (userid: number, trackid: number) => {
  try {
    const response = await axios.post(`${baseUrl}/likeTrack`, {
      userid,
      trackid,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const deleteTrack = async (trackId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${trackId}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

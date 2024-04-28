import axios from "axios";

const baseUrl = "http://localhost:4000/api/playlist";

export interface Playlist {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
  userId: number;
}

export interface newPlaylist {
  name: string;
  imageUrl: string;
  description: string;
  primaryColor: string;
  userId: number;
}

export const getPlaylists = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const isUserFollowingPlaylistService = async (
  userId: number,
  playlistId: number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/is-following-playlist/${userId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const followUnfollow = async (userId: number, playlistId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/followUnfollow/${userId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getPlaylistById = async (id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/individual/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getSongsByPlaylistId = async (playlistId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/songs/${playlistId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getFollowedPlaylistsByUserId = async (userId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/followedPlaylists/${userId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createPlaylist = async ({
  name,
  imageUrl,
  description,
  primaryColor,
  userId,
}: newPlaylist) => {
  try {
    const response = await axios.post(baseUrl, {
      name,
      imageUrl,
      description,
      primaryColor,
      userId,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const updatePlaylist = async ({
  id,
  name,
  imageUrl,
  description,
  primaryColor,
  userId,
}: Playlist) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, {
      name,
      imageUrl,
      description,
      primaryColor,
      userId,
    });
    return response.data;
  } catch (err) {
    return null;
  }
};

export const deletePlaylist = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const followPlaylist = async (id: number) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/follow`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const addSongPlaylist = async ({
  id,
  trackId,
}: {
  id: number;
  trackId: number;
}) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}`, { trackId });
    return response.data;
  } catch (err) {
    return null;
  }
};

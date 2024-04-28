export interface Artist {
  id: number;
  name: string;
  genres: string;
  popularity: number;
  photoUrl: string;
  songs: number[];
  album: string;
}

export interface Playlist {
  id: number;
  name: string;
  thumbnail: string;
  description: string;
  publicAccessible: boolean;
  primaryColor: string;
  songs: number[];
}

export interface Song {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
}

export interface User {
  id: number;
  rolId: number | null;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  password: string;
  gender: string;
  country: string;
  img: string;
  public_id_img?: string | null;
  dateOfBirth: string;
  genreId: number;
  popularity: number;
  // Roles: Roles;
  // Followers: Followers[];
  // Followed: Followers[];
  // LikedAlbums: LikedAlbums[];
  // FollowPlaylist: FollowPlaylist[];
  // Playlist: Playlist[];
  // AlbumArtist: AlbumArtist[];
}

export interface Album {
  id: number;
  name: string;
  imageUrl: string;
  artist: boolean;
  songs: number[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface Tracks {
  id: string;
  name: string;
}

export interface ArtistFromSearch {
  id: number;
  first_name: string;
  last_name: string;
  profilePicture: string;
}

export interface SongFromSearch {
  id: number;
  name: string;
  thumbnail: string;
  artist: string;
}

export interface AlbumFromSearch {
  id: number;
  name: string;
  imageUrl: string;
  artist: string;
}

export interface SearchResult {
  artists: ArtistFromSearch[];
  songs: SongFromSearch[];
  albums: AlbumFromSearch[];
}

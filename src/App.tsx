import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AlbumComponents from "./pages/albumPage";
import { SongPage } from "./pages/songPage";
import HomePage from "./pages/home";
import { UserPage } from "./pages/userPage";
import { PublicRoutes } from "./types/routes";
import SearchBarPage from "./pages/searchPage";
import { FilterProvider } from "./contexts/FilterContext";
import { AuthProvider } from "./contexts/AuthContext";

import { EditProfile } from "./pages/editProfile";
import { PlayerProvider } from "./contexts/AudioPlayerContext";
import { MySongs } from "./pages/mySongs";
import PlaylistsPage from "./pages/playlists";
import SelectedPlaylist from "./pages/selectedPlaylist";
import UploadSongs from "./pages/uploadSongs";
import LibraryPage from "./pages/LibraryPage";
import ArtistPage from "./pages/artistPage";

function App() {
  return (
    <>
      <PlayerProvider>
        <FilterProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path={PublicRoutes.HOME}
                  element={
                    // <PrivateRoute>
                    <HomePage />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.SEARCH}
                  element={
                    // <PrivateRoute>
                    <SearchBarPage />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.USER}
                  element={
                    // <PrivateRoute>
                    <UserPage />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.ALBUM}
                  element={
                    // <PrivateRoute>
                    <AlbumComponents />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.PLAYLISTS}
                  element={
                    // <PrivateRoute>
                    <PlaylistsPage />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.SELECTEDPLAYLISTS}
                  element={
                    // <PrivateRoute>
                    <SelectedPlaylist />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.SONG}
                  element={
                    // <PrivateRoute>
                    <SongPage />
                    // </PrivateRoute>
                  }
                />

                <Route
                  path={PublicRoutes.EDITPROFILE}
                  element={
                    // <PrivateRoute>
                    <EditProfile />
                    //  </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.MYSONGS}
                  element={
                    // <PrivateRoute>
                    <MySongs />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.LIBRARY}
                  element={
                    // <PrivateRoute>
                    <LibraryPage />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.UPLOAD}
                  element={
                    // <PrivateRoute>
                    <UploadSongs />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path={PublicRoutes.ARTIST}
                  element={
                    // <PrivateRoute>
                    <ArtistPage />
                    // </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </FilterProvider>
      </PlayerProvider>
    </>
  );
}

export default App;

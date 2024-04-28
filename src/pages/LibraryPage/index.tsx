import { Link } from "react-router-dom";
import { NavBar } from "../../components/navbar";
import { PublicRoutes } from "../../types/routes";
import { IoLibraryOutline } from "react-icons/io5";

const LibraryPage = () => {
  return (
    <div className="bg-black h-screen w-screen flex flex-col justify-between">
      <div className="mt-12 mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-white mb-5">Your Library</h2>
        <div className="space-y-6">
          <Link
            to={PublicRoutes.MYSONGS}
            className="flex items-center text-white hover:text-btn"
          >
            <h2 className="text-lg font-semibold">My Liked Songs</h2>
            <IoLibraryOutline className="w-6 h-6 ml-2" />
          </Link>
          <Link
            to={PublicRoutes.PLAYLISTS}
            className="flex items-center text-white hover:text-btn"
          >
            <h2 className="text-lg font-semibold">My Liked Playlists</h2>
            <IoLibraryOutline className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </div>

      <div className="w-full">
        <NavBar />
      </div>
    </div>
  );
};

export default LibraryPage;

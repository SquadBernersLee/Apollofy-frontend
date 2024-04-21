// import { IoSettingsOutline } from "react-icons/io5";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { NavBar } from "../../components/navbar";
import { Logout } from "../Login/logout";

export const UserPage = () => {

  return (
    <>
      <div className="bg-background h-screen">
        <div className="flex flex-col lg:border lg:border-solid lg:border-slate-900 lg:bg-zinc-700 ">
          <div className="flex justify-between gap-72 mx-5 mt-8 lg:mt-8">
            <Logout />
          </div>
          <div className="flex items-center justify-center flex-col mt-32">
            <div className="flex justify-center items-center size-44 m-8 lg:size-48">
              <p>imagen de la persona</p>
            </div>
            <div className="flex mt-4">
              <div className="flex flex-col">
                <p className="m-2  text-3xl text-names lg:text-4xl">
                  nombre e informacion de la persona
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col m-6  "></div> */}
        <div className="absolute bottom-14 w-screen">
          <SmallShowPlaySong selectedSongId={null} />
        </div>
        <div className="absolute bottom-0 w-screen">
          <NavBar />
        </div>
      </div>
    </>
  );
};

// import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { NavBar } from "../../components/navbar";
import { Logout } from "../Login/logout";
import CreateUserComponent from "./createUser";
import UpdateUserComponent from "./updateUser";
import { useEffect, useState } from "react";
import { User } from "../../utils";
import { getUser } from "../../services/UserServices";

export const UserPage = () => {

  const baseUrl = 'http://localhost:4000/api/user/account'

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/26`);
      console.log("User deleted:", response.data);
      // Aquí podrías realizar alguna acción adicional si lo necesitas
    } catch (err) {
      console.error("Error deleting user:", err);
      // Aquí podrías mostrar un mensaje de error o realizar alguna otra acción
    }
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getUser();
      if (playlistData) {
        setUsers(playlistData.data);
      }
    };

    fetchData();
  }, [setUsers]);

  return (
    <>
      <div className="bg-background h-screen">
        <div className="flex flex-col lg:border lg:border-solid lg:border-slate-900 lg:bg-zinc-700 ">
          <div className="flex justify-between gap-72 mx-5 mt-8 lg:mt-8">
            <Logout />
          </div>
            <div>
              <button className="text-xl">
                <p className="text-btn" onClick={deleteUser}>Delete User</p>
              </button>
            </div>
          <div>
            <CreateUserComponent />
          </div>
          <div>
            <UpdateUserComponent />
          </div>
          <div className="flex items-center justify-center flex-col mt-32">
          <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">{User.img}</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Hola {User.first_name} {User.last_name}, Bienvenido de nuevo!</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">email:{User.email}</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">From: {User.city}, {User.country}</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Gender: {User.gender}</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Date of Bitrh: {User.dateOfBirth}</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">WOW! you have {User.popularity} starts</p>
                  </li>
                  // Assuming each movie object has a 'title' property
                ))} 
              </ul>
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

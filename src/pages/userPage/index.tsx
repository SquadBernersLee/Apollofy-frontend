import axios from "axios";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { NavBar } from "../../components/navbar";
import { Logout } from "../Login/logout";
import UpdateUserComponent from "./updateUser";
import { useEffect, useState } from "react";
import { User } from "../../utils";
import { getUser } from "../../services/UserServices";

export const UserPage = () => {

  const baseUrl = 'http://localhost:4000/api/user/account'
  const [deletedMessage, setDeletedMessage] = useState<string>("");

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/32`);
      console.log("User deleted:", response.data);
      setDeletedMessage("User deleted successfully");

      setTimeout(() => {
        setDeletedMessage("");
      }, 2000);
    } catch (err) {
      console.error("Error deleting user:", err);
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
            <button className="text-xl" onClick={deleteUser}>
              <p className="text-btn">Delete User</p>
            </button>
            {deletedMessage && (
              <div className="text-red-400 mt-2">{deletedMessage}</div>
            )}
          </div>
          <div>
            <UpdateUserComponent />
          </div>
          <div className="flex flex-col mt-20">
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <img src={User.img} className="text-names" alt="User Avatar" />
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Hi {User.first_name}, Welcom Back!</p>
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">email:{User.email}</p>
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">From: {User.city}, {User.country}</p>
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Gender: {User.gender}</p>
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">Date of Bitrh: {User.dateOfBirth}</p>
                  </li>
                ))} 
              </ul>
            </div>
            <div className="ml-20 flex mt-4">
              <ul>
                {users.slice(0, 1).map((User, index) => (
                  <li key={index}>
                    <p className="text-names">WOW! you have {User.popularity} starts</p>
                  </li>
                ))} 
              </ul>
            </div>
          </div>
        </div>
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

import axios from "axios";
import { SmallShowPlaySong } from "../../components/SmallShowPlaySong";
import { NavBar } from "../../components/navbar";
import { Logout } from "../Login/logout";
import UpdateUserComponent from "./updateUser";
import { useEffect, useState } from "react";
import { User } from "../../utils";
import { getUser, getUserById } from "../../services/UserServices";

export const UserPage = () => {
  const baseUrl = "http://localhost:4000/api/user/account";
  const [deletedMessage, setDeletedMessage] = useState<string>("");

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/36`);
      console.log("User deleted:", response.data);
      setDeletedMessage("User deleted successfully");

      setTimeout(() => {
        setDeletedMessage("");
      }, 1000);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const [users, setUsers] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getUserById(33);
      console.log("dataA:" + playlistData);
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
            <div className="flex flex-col mt-20">
              <p className="text-names">Hi {users?.first_name}, Welcom Back!</p>
              <p className="text-names">{users?.email}</p>
            </div>
          </div>
          <div className="flex flex-col mt-20">
            <p></p>
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

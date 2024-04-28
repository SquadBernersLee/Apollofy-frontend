
import { useAuth0 } from "@auth0/auth0-react";
import { IoLogOutOutline } from "react-icons/io5";


export const Logout = () => {
    const { logout } = useAuth0();

    return (
            <button className="Logout" onClick={() => logout( { returnTo: window.location.origin } ) }>
            <IoLogOutOutline
                size={30}
                className="text-white mr-1 cursor-pointer hover:text-tops"
            /> 
            </button>
    );
};
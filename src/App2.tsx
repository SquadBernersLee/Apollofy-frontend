import { useAuth0 } from "@auth0/auth0-react";
import App from "./App";
import { Login } from "./pages/Login/Login";
import { Logout } from "./pages/Login/logout";



export default function App2() {
        const { isAuthenticated } = useAuth0();
        console.log(isAuthenticated)
    
    
        return (
            <>
            {isAuthenticated ?( 
            <>
                <App />
                <Logout />
            </> 
            ) : (
                
                <Login />
            )}
            </>
        );
}
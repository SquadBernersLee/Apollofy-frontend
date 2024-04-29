import { useAuth0 } from "@auth0/auth0-react";

export function Login() {


    const {loginWithRedirect} = useAuth0();

    return (
        <>
            <div className="h-screen bg-black flex flex-col  justify-center items-center p-1">
                <div className="lg:p-7 p-5  bg-gray-700 rounded-lg border border-solid border-slate-500">
                    <img
                        className=" lg:ml-6 lg:m-1 h-46 w-44 ml-6 mr-6 border-solid border border-transparent rounded-full"
                        src="src/assets/apollofyremovebg.png"
                    />
                    <div className="text-white ml-20">
                        <button className="border-2 rounded text-names border-tops p-2" onClick={ () => loginWithRedirect()}>Log In</button>
                    </div>
                </div>
            </div>
        </>
    );
}

// export const Login = () => {
//     const {loginWithRedirect} = useAuth0();

//     return (
//         <div>
//             <button  onClick={ () => loginWithRedirect()}>Log in</button>
//         </div>
//     );
// }
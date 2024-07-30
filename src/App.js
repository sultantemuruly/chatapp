import { useState, useRef } from "react";
import Authentication from "./components/Authentication";
import Cookies from 'universal-cookie';
import Chat from "./components/Chat";
import { signOut } from "firebase/auth"
import { auth } from "./firebaseconfig"

const cookies = new Cookies();

function App() {
  const [isAuth, setAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setAuth(false);
    setRoom(null);
  };

  if(!isAuth) {
    return (
      <div>
        <Authentication setAuth={setAuth}/>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      {
        room 
        ?
        <div>
          <Chat room={room}/>
        </div>
        :
        <div className="h-screen flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-6">
            <div>
              <label className="text-[20px] font-bold">Enter the Room:</label>
              <input 
                ref={roomInputRef} 
                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <button 
                onClick={() => setRoom(roomInputRef.current.value)} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded-[10px] font-semibold"
              >
                Start Chat
              </button>
            </div>

            <div>
              <button onClick={signUserOut} className="p-2 bg-red-500 text-white font-bold rounded-[6px]">Sign Out</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
import Authentication from "./components/Authentication";
import Cookies from 'universal-cookie';
import Chat from "./components/Chat";


const cookies = new Cookies();

function App() {
  const [isAuth, setAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if(!isAuth) {
    return (
      <div>
        <Authentication setAuth={setAuth}/>
      </div>
    );
  }

  return (
    <div>
      <div className="text-red-500">Yoooooo!</div>
      {
        room 
        ?
        <div>
          <Chat room={room}/>
        </div>
        :
        <div>
          <label>Enter Room:</label>
          <input ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Start Chat
          </button>
        </div>
      }
    </div>
  );
}

export default App;

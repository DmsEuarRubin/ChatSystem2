import { useState, React } from "react";
import socketIO from 'socket.io-client';
import RoutesApp from "./routes/Routes";
const socket = socketIO.connect('http://localhost:3001');

function App() {
    const [user, setUser] = useState();
    const handleSubmit = (e)=> {
        e.preventDefault();
        socket.emit('newUser', {jwt: "token", socketID: socket.id, user: user})
    }
  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit}>
        <h2>In chat</h2>
        <label htmlFor="user"></label>
        <input type="text" id='user' value={user} onChange={(e)=> {setUser(e.target.value)}}/>
        <button type="submit">in chat</button>
      </form> */}
      <RoutesApp />
    </div>
  );
}

export default App;

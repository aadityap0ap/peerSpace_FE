import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = async() => {
    try{
      const token = localStorage.getItem("token");
      // axios.post(URL, BODY, CONFIG)
      const response = await axios.post(
        "http://localhost:3000/room/createRoom",
        {},
        {
          headers:{
            Authorization : `Bearer ${token}`
          }
        }
      )
      setCreatedRoomId(response.data.roomId);
    }
    catch(error){
      console.log(error);
    }
  } 

  const joinRoom = async() => {
    /*
This validation ensures that the user cannot attempt to join a room with an empty Room ID.
The trim() method removes all leading and trailing spaces from the input string.
If the user enters an empty string ("") or only spaces ("     "), trim() converts it into an empty string.
In JavaScript, an empty string is considered a falsy value, so !roomId.trim() becomes true.
When this condition is true, the function immediately returns and stops further execution.
This prevents unnecessary API calls to the backend and ensures that only valid Room IDs are processed.
*/  
       if (!roomId.trim()) return;
       try{
        const token = localStorage.getItem("token")
        const response = await axios.post(
          "http://localhost:3000/room/findRoom",
          {
            roomId
          },
          {
            headers:{
            Authorization : `Bearer ${token}`
          }
          }
        );
        alert(response.data.message);
        setShowModal(false);
         navigate(`/chat/${roomId}`)
         setRoomId("");
       }
       catch(error : any){
        console.log(error.response?.data?.message || "Failed to join the room")
       }
  };

  return (
    <div className="h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-gray-800">
          PeerSpace
        </div>

        <div className="flex-1 p-4 space-y-2">
          <button className="w-full text-left p-3 rounded hover:bg-gray-800">
            Home
          </button>

          <button className="w-full text-left p-3 rounded hover:bg-gray-800">
            Recent Rooms
          </button>

          <button className="w-full text-left p-3 rounded hover:bg-gray-800">
            Settings
          </button>

          <button 
          onClick={() => navigate("/requests")}
          className="w-full text-left p-3 rounded hover:bg-gray-800">
            Requests
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-white text-xl font-semibold">
            Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <button
            onClick={() => navigate("/search")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
           Search
           </button>

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Join Room
            </button>

            <button 
            onClick={createRoom} 
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded">
              Create Room
            </button>

            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl font-bold mb-4">
            Welcome to Your Space
          </h1>

          <p className="text-gray-400 text-lg">
            Create a room or join an existing room to start chatting.
          </p>
        </div>
      </div>
      
       {createdRoomId && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
    
    <div className="bg-gray-900 p-8 rounded-2xl w-105 text-center shadow-2xl border border-purple-500">

      <div className="text-5xl mb-4">🎉</div>

      <h2 className="text-white text-2xl font-bold mb-2">
        Room Created Successfully
      </h2>

      <p className="text-gray-400 mb-5">
        Share this Room ID with your friends to join.
      </p>

      <div className="bg-gray-800 rounded-lg p-4 mb-5">
        <p className="text-gray-400 text-sm mb-2">
          Room ID
        </p>

        <p className="text-purple-400 text-2xl font-bold tracking-widest">
          {createdRoomId}
        </p>
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(createdRoomId);
        }}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mb-3"
      >
        Copy Room ID
      </button>

      <button
        onClick={() => setCreatedRoomId("")}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
      >
        Close
      </button>

    </div>

  </div>
)}

      {/* Join Room Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Join Room
            </h2>

            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white outline-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setRoomId("");
                }}
                className="flex-1 bg-gray-700 text-white py-3 rounded"
              >
                Cancel
              </button>

              <button
                onClick={joinRoom}
                className="flex-1 bg-purple-600 text-white py-3 rounded"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    if (!roomId.trim()) return;
    console.log("Joining room:", roomId);
    // navigate(`/chat/${roomId}`)
    setShowModal(false);
  };

  return (
    <div className="h-screen bg-black flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-gray-800">
          ChatApp
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
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-white text-xl font-semibold">
            Dashboard
          </h1>

          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl font-bold mb-4">
            Welcome to ChatApp
          </h1>


          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg"
          >
            Join Room
          </button>
        </div>
      </div>

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
                onClick={() => setShowModal(false)}
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
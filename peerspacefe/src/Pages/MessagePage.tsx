import { useParams } from "react-router-dom";

export default function MessagePage() {
  const { roomId } = useParams();

  return (
    <div className="h-screen bg-black flex flex-col">

      <div className="bg-gray-900 text-white p-4 text-lg font-semibold">
        Room: {roomId}
      </div>

      <div className="flex-1"></div>

      <div className="p-4 bg-gray-900 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded bg-gray-800 text-white outline-none"
        />

        <button className="bg-purple-600 px-5 py-3 rounded text-white">
          Send
        </button>
      </div>

    </div>
  );
}
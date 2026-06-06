export default function MessagePage() {
  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex-1"></div>
      <div className="p-4 bg-gray-900 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded bg-gray-800 text-white outline-none"
        />
        <button className="bg-purple-600 px-5 py-3 rounded text-white">
          Send it
        </button>
      </div>
    </div>
  );
}
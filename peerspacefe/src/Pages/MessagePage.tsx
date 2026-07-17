import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { WS_URL } from "../config/api";

export default function MessagePage() {
  const { roomId } = useParams();

  // Stores the current text in the input box
  const [message, setMessage] = useState("");

  // Stores all messages received
  const [messages, setMessages] = useState<string[]>([]);

  // Stores the WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);

  // Connect to WebSocket when the page loads
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    wsRef.current = ws;

    // Join the room after connection opens
    ws.onopen = () => {
      console.log("Connected to WebSocket");

      ws.send(
        JSON.stringify({
          type: "Join",
          payload: {
            roomId,
          },
        })
      );
    };

    // Receive messages from the server
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // Cleanup when leaving the page
    return () => {
      ws.close();
    };
  }, [roomId]);

  // Send a chat message
  function sendMessage() {
    if (message.trim() === "") {
      return;
    }

    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message,
        },
      })
    );

    // Clear the input after sending
    setMessage("");
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 text-lg font-semibold">
        Room: {roomId}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-purple-600 text-white p-3 rounded mb-2 w-fit"
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-900 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded bg-gray-800 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 px-5 py-3 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
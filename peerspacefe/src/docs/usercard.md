import { useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  uniqueId: string;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function sendFriendRequest() {
    try {
      setSending(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/friend/request",
        {
          receiverId: user.uniqueId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setSent(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to send friend request."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="w-96 bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold">
            {user.username}
          </h2>

          <p className="text-gray-400">
            @{user.uniqueId}
          </p>
        </div>

      </div>

      <button
        onClick={sendFriendRequest}
        disabled={sending || sent}
        className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
          sent
            ? "bg-green-600 cursor-not-allowed"
            : sending
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        } text-white`}
      >
        {sending
          ? "Sending..."
          : sent
          ? "Request Sent"
          : "Send Friend Request"}
      </button>

    </div>
  );
}
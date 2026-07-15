import { useState } from "react";
import axios from "axios";

export default function SearchPage(){
    const [uniqueId,setUniqueId] = useState("");
    const [user,setUser] = useState<any>(null);
    const [loading,setLoading] = useState(false);

    const search = async () => {
        if(!uniqueId.trim()){
            alert("Please enter a unique Id");
            return;
        }
        try{
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:3000/friend/search",{
                    params:{
                        uniqueId,
                    },
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
          setUser(response.data.user);  
        }
        catch (error: any) {
        setUser(null);
        alert(
        error.response?.data?.message || "User not found"
      );
    }
     finally{
        setLoading(false);
     }
    };

    const sendFriendRequest = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3000/friend/request",
                {
                    receiverId: user.uniqueId,
                },
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    },
                }
            );
            alert(response.data.message);
        }
        catch (error: any) {
        alert(error.response?.data?.message || "Unable to send friend request.");
      }
   };

   return (
    <div className="min-h-screen bg-black flex justify-center items-start pt-20">

      <div className="w-full max-w-xl">

        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          Search Users
        </h1>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
          />

          <button
            onClick={search}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-gray-400 mt-5 text-center">
            Searching...
          </p>
        )}

        {user && (
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
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
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Send Friend Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



import { useState,useEffect } from "react";
import axios from "axios";

interface Friend{
    _id : string,
    username : string,
    uniqueId : string
}

export default function FriendsPage(){
    const[friends,setFriends] = useState<Friend[]>([]);
    const [loading,setLoading] = useState(true)
    
    useEffect(() => {
        getFriends();
    },[]);

    async function getFriends(){
        try{
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "http://localhost:3000/friend/friendList",
                {
                    headers:{
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
            setFriends(response.data.friends);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen bg-black p-8">

      <h1 className="text-4xl text-white font-bold text-center mb-10">
        My Friends
      </h1>

      {loading && (
        <p className="text-center text-gray-400">
          Loading...
        </p>
      )}

      {!loading && friends.length === 0 && (
        <p className="text-center text-gray-400">
          No Friends Yet
        </p>
      )}

      <div className="space-y-5">

        {friends.map((friend) => (

          <div
            key={friend._id}
            className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {friend.username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-white text-xl">
                  {friend.username}
                </h2>

                <p className="text-gray-400">
                  @{friend.uniqueId}
                </p>
              </div>

            </div>

            <div className="flex gap-3">

              {/* <button
                onClick={() => openChat(friend._id)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
              >
                Chat
              </button>

              <button
                onClick={() => removeFriend(friend._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button> */}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
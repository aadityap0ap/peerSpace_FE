import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";


interface FriendRequest{
    _id : string,
    sender:{
        _id: string,
        username : string,
        uniqueId : string
    };
}

export default function FriendRequest(){
    const[requests,setRequests] = useState<FriendRequest[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        apiUrl("/friend/pending"),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
};
  
  async function acceptRequest(requestId : string){
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(
            apiUrl("/friend/accept"),
            {
                requestId,
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        );
        alert(response.data.message);
        getRequests();
    }
    catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  async function rejectRequest(requestId : string){
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(
            apiUrl("/friend/reject"),
            {
                requestId,
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            }
        );
        alert(response.data.message);
        getRequests();
    }
    catch(error : any){
        alert(error.response?.data?.message);
    }
  };

return (
    <div className="min-h-screen bg-black p-8">

      <h1 className="text-4xl text-white font-bold text-center mb-10">
        Friend Requests
      </h1>

      {loading && (
        <p className="text-center text-gray-400">
          Loading...
        </p>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-center text-gray-400">
          No Pending Requests
        </p>
      )}

      <div className="space-y-5">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex justify-between items-center"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {request.sender.username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-white text-xl">
                  {request.sender.username}
                </h2>

                <p className="text-gray-400">
                  @{request.sender.uniqueId}
                </p>
              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => acceptRequest(request._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Accept
              </button>

              <button
                onClick={() => rejectRequest(request._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Reject
              </button> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
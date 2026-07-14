import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function SignUp() {
  const navigate = useNavigate();
  const [uniqueId,setUinqueId] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  async function handleSignUp(){
    try{
      const response =  await axios.post(
        "http://localhost:3000/auth/signup",
        {
          uniqueId,
          email,
          username,
          password
        }
      );
      alert(response.data.message);
      setUinqueId("");
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/signin");
    }
    catch(error : any){
      alert(error.response?.data?.message ||"SignUp failed");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg border p-8 w-80 flex flex-col">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign Up
        </h2>
        
         <input
          value={uniqueId}
          onChange={(e) => setUinqueId(e.target.value)}
          className="px-4 py-2 border rounded mb-3 outline-none focus:border-blue-500"
          placeholder="UniqueId"
        /> 
         
         <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded mb-3 outline-none focus:border-blue-500"
          placeholder="Email"
        />

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded mb-3 outline-none focus:border-blue-500"
          placeholder="Username"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="px-4 py-2 border rounded mb-4 outline-none focus:border-blue-500"
          placeholder="Password"
        />

        <button
         onClick={handleSignUp}
         className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign Up
        </button>

      </div>
    </div>
  );
}
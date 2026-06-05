import { useState } from "react";
import axios from "axios";
export function SignIn() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  async function handleSignin(){
    try{
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
      {
        email,
        password
      }
      );
      alert(response.data.message);
      setEmail("");
      setPassword("");
    }
    catch(error : any){
      alert(error.response?.data?.message || "SignIn failed");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg border p-8 w-80 flex flex-col">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign In
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded mb-3 outline-none focus:border-blue-500"
          placeholder="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="px-4 py-2 border rounded mb-4 outline-none focus:border-blue-500"
          placeholder="Password"
        />

        <button 
         onClick={handleSignin}
         className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign In
        </button>

      </div>
    </div>
  );
}
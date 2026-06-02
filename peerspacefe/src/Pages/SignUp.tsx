export function SignUp() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg border p-8 w-80 flex flex-col">
        
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign Up
        </h2>

        <input
          className="px-4 py-2 border rounded mb-3 outline-none focus:border-blue-500"
          placeholder="Username"
        />

        <input
          type="password"
          className="px-4 py-2 border rounded mb-4 outline-none focus:border-blue-500"
          placeholder="Password"
        />

        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign Up
        </button>

      </div>
    </div>
  );
}
export function Signin() {
  
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-md border min-w-48 p-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>

        <input
          className="px-4 py-2 border rounded m-2"
          placeholder="Username"
        />

        <input
          className="px-4 py-2 border rounded m-2"
          placeholder="Password"
        />

        <div className="flex justify-center pt-4 w-full">
          <button></button>
        </div>
      </div>
    </div>
  );
}
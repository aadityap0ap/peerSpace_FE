export default function Home() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="border p-8 w-80 flex flex-col gap-4 rounded-lg shadow-lg bg-white">
                
                <p className="text-center">
                    New User?{" "}
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </p>

                <p className="text-center text-xl font-semibold">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Sign In
                    </button>
                </p>

            </div>
        </div>
    );
}
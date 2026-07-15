1. Import Statements
import { useState } from "react";
import axios from "axios";
Why useState?

React components need a way to remember values. Every time a component re-renders, normal variables are recreated.

For example:

let name = "";

Whenever React re-renders,

name = ""

again.

The value is lost.

Instead,

const [uniqueId, setUniqueId] = useState("");

stores the value inside React itself, so it survives re-renders.

Without useState, typing inside the input box would never work because React would immediately forget what the user typed.

Why Axios?

Your frontend and backend are two separate applications.

Frontend (React)
        │
        │ HTTP Request
        ▼
Backend (Express)
        │
        ▼
MongoDB

React cannot directly talk to MongoDB.

Instead it asks Express.

Axios is the library that sends HTTP requests.

Without Axios,

your frontend cannot

search users
login
signup
create rooms
send friend requests
2.
export default function SearchPage() {

Every page in React is simply a function.

When React visits

/search

it executes

SearchPage()

Whatever this function returns becomes the webpage.

3.
const [uniqueId, setUniqueId] = useState("");

This creates a state variable.

Initially

uniqueId = ""

Suppose user types

rahul123

React automatically updates

uniqueId = "rahul123"

using

setUniqueId(...)
Why do we need it?

Imagine this textbox

_____________________

Every key press

r
ra
rah
rahu
rahul

must be remembered.

That's exactly what this state does.

4.
const [user, setUser] = useState<any>(null);

Initially

user = null

because no search has happened yet.

After backend returns

{
   "_id":"...",
   "username":"Rahul",
   "uniqueId":"rahul123"
}

React stores

user = {
...
}

Now the UI knows

"Display Rahul."

Without this variable,

React would have nowhere to store the searched user.

5.
const [loading, setLoading] = useState(false);

Initially

loading = false

When user clicks Search

loading = true

The UI shows

Searching...

When request finishes

loading = false

The text disappears.

This improves user experience.

6.
const searchUser = async () => {

This creates a function.

It is called only when

Search Button

is clicked.

async

means

"I am going to perform something that takes time."

Searching a user means

React
    │
Internet
    │
Backend
    │
Database

This is not instant.

So JavaScript must wait.

7.
if (!uniqueId.trim()) {

Suppose user enters

"      "

or

""

Without this check

React would still ask the backend

Find user ""

which is unnecessary.

Instead

trim()

removes spaces

"      "

↓

""

Now

!uniqueId.trim()

becomes true

and the function stops.

This saves

server resources
API calls
database queries
8.
setLoading(true);

Immediately after clicking

Search

the UI becomes

Searching...

instead of looking frozen.

9.
const token = localStorage.getItem("token");

Remember

during Login

you stored

JWT Token

inside

localStorage

Now we retrieve it.

Without the token

backend says

401 Unauthorized

because your search endpoint uses

authMiddleware
10.
const response = await axios.get(...)

Axios sends

GET /friend/search

to Express.

Example

GET

/friend/search?uniqueId=rahul123

Backend searches MongoDB

↓

returns

{
"user":
{
...
}
}
Why await?

Without

await

JavaScript would continue immediately.

It would try

response.data.user

before the backend has replied.

This causes errors.

11.
params:{
uniqueId
}

Instead of writing

...?uniqueId=rahul123

Axios automatically builds it.

Suppose

uniqueId="rahul123"

Axios converts it into

GET

/friend/search?uniqueId=rahul123
12.
headers:{
Authorization:
Bearer token
}

Backend checks

Who is making this request?

JWT answers

It is Aditya.

Without Authorization

backend rejects the request.

13.
setUser(response.data.user);

Suppose backend sends

{
"user":
{
"username":"Rahul"
}
}

React stores

user = Rahul

Now UI re-renders automatically.

This is one of React's biggest features.

14.
catch(...)

Suppose backend returns

404

User Not Found

Instead of crashing

React enters

catch

and displays

User not found
15.
finally

Whether

success

or

error

always execute

setLoading(false)

Otherwise

Searching...

would stay forever.

16.
sendFriendRequest()

When user clicks

Add Friend

this function runs.

17.
await axios.post(...)

Sends

POST

/friend/request

to backend.

Body

{
"receiverId":"rahul123"
}

Backend

↓

creates

FriendRequest

inside MongoDB.

18.
setUser(null);

Removes

Rahul

from screen.

Otherwise

old search result would remain.

19.
setUniqueId("");

Clears textbox.

Instead of

rahul123

user sees

____________

ready for another search.

20.
return(
...
)

React now builds the UI.

Everything inside return

is simply HTML written in JSX.

21.
<input
value={uniqueId}
onChange={...}
/>

This is called a controlled component.

Flow

Keyboard

↓

onChange()

↓

setUniqueId()

↓

React State

↓

Input Value

React always knows what the user typed.

22.
<button
onClick={searchUser}
>

Button click

↓

calls

searchUser()

↓

Backend

↓

Database

↓

Result

↓

React updates UI.

23.
{loading && (...) }

This is conditional rendering.

Equivalent to

if(loading){

show this

}

If loading

true

React displays

Searching...

Otherwise

shows nothing.

24.
{user && (...) }

Another conditional rendering.

Initially

user = null

React displays nothing.

After search

user = Rahul

React displays

Rahul

@rahul123

Add Friend
Complete Flow of the Search Page
User opens Search Page
          │
          ▼
Types Unique ID
          │
          ▼
Clicks Search
          │
          ▼
searchUser() executes
          │
          ▼
Read JWT from localStorage
          │
          ▼
GET /friend/search
          │
          ▼
Express Backend
          │
          ▼
MongoDB searches User
          │
     ┌────┴────┐
     │         │
Found      Not Found
     │         │
     ▼         ▼
setUser()   Show Error
     │
     ▼
React Re-renders
     │
     ▼
Display User Card
     │
     ▼
Click "Send Friend Request"
     │
     ▼
POST /friend/request
     │
     ▼
FriendRequest stored in MongoDB
     │
     ▼
Success Message

This page is a good example of React's data flow: state holds the data, user actions trigger functions, Axios communicates with the backend, the backend queries MongoDB, and updating the state causes React to automatically re-render the UI. That's the core pattern you'll use throughout your application.


import { useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [uniqueId, setUniqueId] = useState("");
  const [user, setUser] = useState<any>(null);
  useState     <any>      (null)
   │            │          │
   │            │          └── Initial value
   │            └──────────── Generic Type
   └───────────────────────── React Hook
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    if (!uniqueId.trim()) {
      alert("Please enter a Unique ID");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/friend/search",
        {
          params: {
            uniqueId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error: any) {
      setUser(null);

      alert(
        error.response?.data?.message ||
          "User not found"
      );
    } finally {
      setLoading(false);
    }
    <!-- try {
   // Code that may succeed
}
catch(error) {
   // Runs only if an error occurs
}
finally {
   // Runs ALWAYS
} -->
  };

  const sendFriendRequest = async () => {
  try {
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
  } catch (error: any) {
    alert(
      error.response?.data?.message ||
      "Unable to send friend request."
    );
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
            onClick={searchUser}
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



import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

export default function SearchPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchUser = async (uniqueId: string) => {
    if (!uniqueId.trim()) {
      alert("Please enter a Unique ID");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/friend/search",
        {
          params: {
            uniqueId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error: any) {
      setUser(null);

      alert(
        error.response?.data?.message ||
          "User not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">

      <h1 className="text-4xl text-white font-bold text-center mb-10">
        Search Users
      </h1>

      <SearchBar onSearch={searchUser} />

      {loading && (
        <p className="text-center text-gray-400 mt-6">
          Searching...
        </p>
      )}

      {user && (
        <div className="mt-8 flex justify-center">
          <UserCard user={user} />
        </div>
      )}

    </div>
  );
}


import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const searchUser = async (uniqueId: string) => {
    if (!uniqueId.trim()) {
      alert("Please enter a Unique ID");
      return;
    }

    try {
      setLoading(true);
      setRequestSent(false);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/friend/search",
        {
          params: {
            uniqueId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error: any) {
      setUser(null);

      alert(
        error.response?.data?.message ||
          "User not found"
      );
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async () => {
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
      setRequestSent(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to send friend request."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">

      <h1 className="text-4xl text-white font-bold text-center mb-10">
        Search Users
      </h1>

      <SearchBar onSearch={searchUser} />

      {loading && (
        <p className="text-center text-gray-400 mt-6">
          Searching...
        </p>
      )}

      {user && (
        <div className="mt-8 flex justify-center">
          <div className="w-96 bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg">

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
              disabled={sending || requestSent}
              className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition ${
                requestSent
                  ? "bg-green-600 cursor-not-allowed"
                  : sending
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {sending
                ? "Sending..."
                : requestSent
                ? "Request Sent"
                : "Send Friend Request"}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
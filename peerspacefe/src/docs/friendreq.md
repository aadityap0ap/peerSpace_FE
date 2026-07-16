import { useEffect, useState } from "react";
import axios from "axios";

interface FriendRequest {
  _id: string;
  sender: {
    _id: string;
    username: string;
    uniqueId: string;
  };
}

export default function FriendRequest() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/friend/pending",
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
  }

  async function acceptRequest(requestId: string) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/friend/accept",
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      getRequests();
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  }

  async function rejectRequest(requestId: string) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/friend/reject",
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      getRequests();
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  }

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


1. Import statements
import { useEffect, useState } from "react";
import axios from "axios";
useState

Used to store data that can change while the component is running.

Here, it stores:

Friend requests
Loading status
useEffect

Runs code automatically when the component loads.

Here it is used to:

"As soon as the Friend Requests page opens, fetch all pending requests."

Without useEffect, the user would have to press a button to load requests.

axios

Used to communicate with your backend.

For example,

axios.get(...)

sends a GET request.

axios.post(...)

sends a POST request.

2. Interface
interface FriendRequest {
  _id: string;
  sender: {
    _id: string;
    username: string;
    uniqueId: string;
  };
}

This tells TypeScript the shape of each friend request.

One request looks like

{
    "_id":"6877....",

    "sender":{
        "_id":"6866...",
        "username":"Aditya",
        "uniqueId":"aditya123"
    }
}

So later,

request.sender.username

TypeScript already knows it exists.

3. Component
export default function FriendRequest() {

Creates the Friend Requests page.

4. State variables
const [requests, setRequests] = useState<FriendRequest[]>([]);

Initially

requests = []

No requests have been loaded.

After backend responds

requests = [
    {...},
    {...},
    {...}
]

Now React re-renders the page.

Loading state
const [loading, setLoading] = useState(true);

Initially

loading = true

Meaning

"We are waiting for the backend."

After backend responds

loading = false
5. useEffect
useEffect(() => {
    getRequests();
}, []);

Notice

[]

Empty dependency array.

It means

Run only once.

Flow

Page Opens

↓

FriendRequest component mounts

↓

useEffect executes

↓

getRequests()
6. getRequests()
async function getRequests() {

Responsible for talking to backend.

Turn loading ON
setLoading(true);

Now UI can show

Loading...

instead of blank page.

Read JWT
const token = localStorage.getItem("token");

Gets JWT saved after login.

Example

eyJhbGc.....
GET request
const response = await axios.get(
    "http://localhost:3000/friend/pending",

This calls

GET /friend/pending

Backend receives

Authorization

Bearer token

Middleware verifies user.

Headers
headers:{
Authorization:`Bearer ${token}`
}

Without this

Backend cannot know

Which user's requests should be returned.

Save requests
setRequests(response.data.requests);

Suppose backend returns

{
    "requests":[
        {
            "_id":"1",
            "sender":{
                "username":"Aditya",
                "uniqueId":"aditya123"
            }
        }
    ]
}

Now

requests =
[
   {
      ...
   }
]

React automatically updates the UI.

Finally
finally{
setLoading(false);
}

Even if backend crashes

Loading becomes

false

Otherwise

Loading...

would stay forever.

7. Accept Request
async function acceptRequest(requestId:string)

Receives

requestId

Example

687b8f....
POST request
await axios.post(
"/friend/accept"

Body

{
requestId
}

Backend changes

pending

↓

accepted

Adds both users to each other's friends array.

Refresh list
getRequests();

Suppose

Initially

Aditya

Rahul

Karan

Accepted

Rahul

Backend

Aditya

Karan

Instead of manually removing Rahul,

we simply fetch the latest list again.

Much simpler.

8. Reject Request

Exactly same idea.

Only endpoint changes.

POST

/friend/reject

Backend

pending

↓

rejected

Then

getRequests();

refreshes UI.

9. JSX
return(

Everything below is UI.

Loading
{loading && (
<p>Loading...</p>
)}

Equivalent to

if(loading){

show Loading...
}
Empty State
!loading && requests.length===0

Means

Loading finished

AND

No requests exist

Then show

No Pending Requests
Looping through requests
requests.map((request)=>

Suppose

requests

↓

Aditya

Rahul

Aman

React performs

Card

↓

Card

↓

Card

One card per request.

Key
key={request._id}

React uses it to uniquely identify each card.

Without keys

React shows warning.

Avatar
request.sender.username.charAt(0)

Suppose

username

Aditya

Returns

A

Displayed inside purple circle.

Username
request.sender.username

Displays

Aditya
Unique ID
request.sender.uniqueId

Displays

@aditya123
Accept button
onClick={()=>
acceptRequest(request._id)
}

Flow

Click Accept

↓

acceptRequest()

↓

POST /friend/accept

↓

Backend

↓

Accepted

↓

Refresh requests
Reject button

Exactly same

Click Reject

↓

rejectRequest()

↓

POST /friend/reject

↓

Refresh list
Overall Flow
FriendRequest Page Opens
          │
          ▼
     useEffect()
          │
          ▼
    getRequests()
          │
          ▼
 GET /friend/pending
          │
          ▼
     Backend returns
     pending requests
          │
          ▼
 setRequests(response.data.requests)
          │
          ▼
   React re-renders page
          │
          ▼
  Shows all pending requests
          │
     ┌────┴────┐
     ▼         ▼
 Accept      Reject
     │         │
     ▼         ▼
POST         POST
/accept      /reject
     │         │
     ▼         ▼
Backend updates request status
          │
          ▼
     getRequests()
          │
          ▼
Fresh pending list displayed

This page follows a common React pattern:

Load data when the component mounts (useEffect → getRequests()).
Store it in state (requests).
Render the state (requests.map(...)).
Perform an action (accept/reject).
Refresh the state by fetching the updated data again, which keeps the UI in sync with the backend
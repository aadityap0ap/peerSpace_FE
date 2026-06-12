
useState is a React Hook used to store data that can change over time.
The syntax:
const [messages, setMessages] = useState<string[]>([]);

can be understood as:
- messages -> the current state value (an array of chat messages).
- setMessages -> the function used to update that state.
- <string[]> -> a TypeScript type annotation that tells React this state
  will contain an array of strings (e.g. ["Hi", "Hello"]).
- [] -> the initial value, meaning the chat starts with no messages.

React uses array destructuring here because useState returns two values:
[currentState, updateFunction].

Whenever setMessages(...) is called, React updates the state and
automatically re-renders the component so the UI reflects the new data.
If we used a normal variable like:
let messages = [];
React would not know when it changes, and the screen would not update.

Example:
Initially:
messages = []

After:
setMessages(["Hello"]);

messages becomes:
["Hello"]

After:
setMessages(["Hello", "Hi"]);

messages becomes:
["Hello", "Hi"]

const [messages, setMessages] = useState<string[]>([]);

-----------------------------------------------------------------------------------------

useRef for storing a WebSocket connection
const wsRef = useRef<WebSocket | null>(null);
What is useRef?
useRef is a React Hook that stores a value which persists across component re-renders without causing the component to re-render when the value changes.
Breaking down the syntax
•	wsRef → The reference object returned by useRef.
•	wsRef.current → The actual value stored inside the reference.
•	<WebSocket | null> → A TypeScript type that says wsRef.current can either hold a WebSocket object or null.
•	null → The initial value, meaning there is no WebSocket connection yet.
Why use useRef here?
A WebSocket connection is not something that should be displayed on the screen. It is simply an object that needs to be accessed later for sending messages.
If we used:
let ws;
the variable would be recreated every time the component renders, and we could lose access to the connection.
If we used:
const [ws, setWs] = useState<WebSocket | null>(null);
every update to the socket would trigger a React re-render, even though the UI does not depend on the socket object itself.
useRef solves both problems:
•	It keeps the same value across renders.
•	Updating wsRef.current does not trigger a re-render.
How it is used
Initially:
wsRef.current = null;
After creating the connection:
const ws = new WebSocket("ws://localhost:3000");
wsRef.current = ws;
When sending a message:
wsRef.current?.send("Hello");
The ?. (optional chaining) ensures that send() is only called if wsRef.current is not null.
Summary
const wsRef = useRef<WebSocket | null>(null);
creates a persistent container for the WebSocket connection. It starts as null, later stores the active WebSocket object, survives component re-renders, and avoids unnecessary UI updates. This makes useRef the preferred place to keep objects like WebSocket connections, timers, or DOM element references.
--------------------------------------------------------------------------

Understanding ws.onmessage
ws.onmessage = (event) => {
  setMessages((prev) => [...prev, event.data]);
};
This code is responsible for receiving messages from the WebSocket server and updating the chat interface.
Step 1: ws.onmessage
onmessage is a WebSocket event handler that is automatically triggered whenever the server sends data to the client. You can think of it as a listener that says, “Whenever a new message arrives, run this function.”
Step 2: (event) => { ... }
The event object contains information about the received message. The most important property is:
event.data
which holds the actual data sent by the server.
For example, if the server sends:
Hello Everyone!
then:
event.data === "Hello Everyone!"
Step 3: setMessages(...)
setMessages is the state updater function created by useState. Calling it updates the messages array and tells React to re-render the component so the UI displays the latest data.
Step 4: Why use (prev) => ...?
Instead of writing:
setMessages([...messages, event.data]);
we use:
setMessages((prev) => [...prev, event.data]);
because React state updates can happen asynchronously. The prev parameter always contains the latest version of the messages array, making the update safe even if multiple messages arrive quickly.
Step 5: Understanding [...prev, event.data]
The spread operator (...) copies all existing elements from prev into a new array, and event.data is added to the end.
Example:
Before receiving a message:
messages = ["Hi", "How are you?"]

New message arrives:
event.data = "I'm fine!"

After update:
messages = ["Hi", "How are you?", "I'm fine!"]
Why not replace the array?
If we wrote:
setMessages([event.data]);
then every new message would overwrite the previous ones, and only the latest message would be visible.
Overall Flow
Server sends a message
          │
          ▼
   ws.onmessage is triggered
          │
          ▼
event.data contains the new message
          │
          ▼
setMessages((prev) => [...prev, event.data])
          │
          ▼
Previous messages are copied
          │
          ▼
New message is appended
          │
          ▼
React re-renders the component
          │
          ▼
Updated chat history appears on the screen
In short: ws.onmessage listens for incoming WebSocket messages, and setMessages((prev) => [...prev, event.data]) safely adds each new message to the existing chat history without losing the older messages.

----------------------------------------------------------------------------------------
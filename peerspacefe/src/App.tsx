import { BrowserRouter, Route,Routes } from "react-router-dom";
import { SignIn } from "./Pages/SignIn";
import MessagePage from "./Pages/MessagePage";
import { SignUp } from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
import Home from "./Pages/Home";
export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
     <Route path="/chat/:roomId" element={<MessagePage />} />
      <Route path="/homepage" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

// export default function App(){
//   return(
//     <div>
//       Hii
//     </div>
//   )
// }
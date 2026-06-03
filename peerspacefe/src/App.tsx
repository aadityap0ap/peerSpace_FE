import { BrowserRouter, Route,Routes } from "react-router-dom";
import { SignIn } from "./Pages/SignIn";
import MessagePage from "./Pages/MessagePage";
import { SignUp } from "./Pages/SignUp";
import HomePage from "./Pages/HomePage";
export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/messagepage" element={<MessagePage/>}/>
      <Route path="/homepage" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Home from "./components/Home";
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import MyProfile from "./components/MyProfile/MyProfile";
import UserProfile from "./components/User/UserProfile";
import Explore from "./components/Explore/Explore";
import Post from "./components/Post";
import { useEffect } from "react";
import New from "./components/NewPost/New";
import SearchResults from "./components/Search/SearchResults";
import { onAuthStateChanged } from "firebase/auth";
import Chats from "./components/Chats";

function App() {
  useEffect(() => {
    // console.log("helooooo");
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchtext" element={<SearchResults />} />
        <Route path="explore" element={<Explore />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/new" element={<New />} />
        <Route
          path="/post/:username/:postid"
          element={<Post fromHome={true} />}
        />
        <Route path="/chats" element={<Chats />} />
        <Route path="/c/:id" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

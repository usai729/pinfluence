import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import MyProfile from "./components/MyProfile/MyProfile";
import UserProfile from "./components/User/UserProfile";
import Explore from "./components/Explore/Explore";
import Post from "./components/Post";
import New from "./components/NewPost/New";
import SearchResults from "./components/Search/SearchResults";
import ProtectedRoute from "./Utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} 
        />
        <Route path="/search/:searchtext" element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        } />
        <Route path="explore" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        } />
        <Route path="/myprofile" element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        } />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/new" element={
          <ProtectedRoute>
            <New />
          </ProtectedRoute>
        } />
        <Route
          path="/post/:username/:postid"
          element={
            <ProtectedRoute>
              <Post fromHome={true} />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/chats" element={<Chats />} />
        <Route path="/c/:id" element={<Chats />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

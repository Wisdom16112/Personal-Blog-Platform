import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="p-5">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-blue-600 font-bold">Posts</Link>
        <Link to="/create" className="text-blue-600 font-bold">Create Post</Link>
        <Link to="/login" className="text-blue-600 font-bold">Login</Link>
        <Link to="/register" className="text-blue-600 font-bold">Register</Link>
        <Link to="/profile" className="text-blue-600 font-bold">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App

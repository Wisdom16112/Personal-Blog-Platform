import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  if (!user) {
    return <h2 className="text-red-600 text-xl">You must be logged in</h2>;
  }

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("posts/", postData)
      .then(() => {
        alert("Post created!");
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Write your content here..."
          rows={6}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>

        <button className="bg-green-600 text-white p-2 rounded">
          Publish Post
        </button>
      </form>
    </div>
  );
}

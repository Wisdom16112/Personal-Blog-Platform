import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("posts/")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="block p-4 bg-white shadow rounded border hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600 text-sm">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

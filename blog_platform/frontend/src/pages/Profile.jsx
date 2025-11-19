import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api
      .get("profile/", {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      })
      .then((res) => setProfile(res.data));

    api.get("posts/").then((res) => {
      const userPosts = res.data.filter((p) => p.author.id === user.id);
      setPosts(userPosts);
    });
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">My Profile</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Joined:</strong> {new Date(profile.date_joined).toDateString()}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">My Posts</h2>

      <div className="space-y-3">
        {posts.length === 0 && <p>No posts yet.</p>}

        {posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="block bg-white p-4 rounded shadow hover:bg-gray-50"
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {post.content.substring(0, 80)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

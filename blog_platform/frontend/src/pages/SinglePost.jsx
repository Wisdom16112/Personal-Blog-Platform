import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function SinglePost() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch post + comments
  useEffect(() => {
    api.get(`posts/${id}/`)
      .then(res => {
        setPost(res.data);
        setComments(res.data.comments);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  const handleDelete = () => {
    api.delete(`posts/${id}/`)
      .then(() => {
        alert("Post deleted!");
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    api.post("comments/", {
      post: id,
      content: newComment,
    })
    .then(res => {
      setComments([res.data, ...comments]);
      setNewComment("");
    })
    .catch(err => console.log(err));
  };

  const handleDeleteComment = (commentId) => {
    api.delete(`comments/${commentId}/`)
      .then(() => {
        setComments(comments.filter(c => c.id !== commentId));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">

      {/* Post Content */}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <p className="text-gray-600 mb-4">
        Posted on {new Date(post.created_at).toLocaleString()}
      </p>

      <p className="text-lg leading-relaxed mb-6">{post.content}</p>

      {user && (
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white p-2 rounded mb-8"
        >
          Delete Post
        </button>
      )}

      {/* Comments Section */}
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Add Comment */}
      {user ? (
        <div className="mb-6">
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white p-2 rounded mt-2"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-gray-500">You must be logged in to comment.</p>
      )}

      {/* Show Comments */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border p-3 rounded bg-gray-50 shadow-sm"
          >
            <p className="font-semibold">
              {comment.author_username}{" "}
              <span className="text-sm text-gray-500">
                ({new Date(comment.created_at).toLocaleString()})
              </span>
            </p>

            <p className="mt-1">{comment.content}</p>

            {user && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-600 text-sm mt-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

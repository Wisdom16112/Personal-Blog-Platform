import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login/", formData);
      login(res.data);    // store access + refresh tokens
      navigate("/");
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

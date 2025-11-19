import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("auth/register/", formData);
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
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
          Register
        </button>
      </form>
    </div>
  );
}

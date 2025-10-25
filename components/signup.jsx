import { useState } from "react";
import axios from "axios";
import "./login.css"
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://weighttrackerbackend-2.onrender.com/auth/register";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL, form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-lg shadow-md flex flex-col gap-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Register
      </button>

      <button
        type="button"
        onClick={handleLogin}
        className="bg-gray-500 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
}




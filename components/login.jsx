import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://weighttrackerbackend-2.onrender.com/auth/login";

export default function Login() {
//   const [form, setForm] = useState({ username: "http://localhost:3000/auth/login", password: "" });
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL, form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/weight");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handlesignup = () =>{
    navigate("/")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-20 p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
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
        Login
      </button>
      <button onClick={handlesignup}
        className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors">
          SignUp
        </button>
    </form>
  );
}

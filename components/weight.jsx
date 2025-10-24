import React, { useState, useEffect } from "react";
import "./weight.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/weights";

export default function Weight() {
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  // 🛡️ Get token from localStorage
  const token = localStorage.getItem("token");

  // 🔒 Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
    }
  }, [token, navigate]);

  // 📦 Fetch all weights (secured)
  const fetchWeights = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching weights:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // ➕ Submit new weight (secured)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !weight) {
      alert("Please fill in both date and weight");
      return;
    }

    try {
      await axios.post(
        API_URL,
        { date, weight: parseFloat(weight) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDate("");
      setWeight("");
      alert("Weight added successfully!");
      fetchWeights();
    } catch (err) {
      console.error("Error adding weight:", err);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "200px",
        marginLeft: "100px",
      }}
    >
      {/* Weight Form */}
      <div className="WeightTracker" style={{ marginTop: "150px" }}>
        <h2>Weight Tracker</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Graph Section */}
      <div
        className="WeightGraph"
        style={{ marginTop: "100px", width: "500px" }}
      >
        <h2>Weight Graph</h2>
        <Line
          data={{
            labels: formData.map((entry) =>
              new Date(entry.date).toLocaleDateString()
            ),
            datasets: [
              {
                label: "Weight (kg)",
                data: formData.map((entry) => entry.weight),
                borderColor: "#3b82f6",
                tension: 0.3,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

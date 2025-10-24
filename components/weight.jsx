import React, { useState, useEffect } from "react";
import "./weight.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

// ✅ Chart.js imports & registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:3000/weights";

export default function Weight() {
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch weights securely
  const fetchWeights = async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure it's an array
      setFormData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching weights:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // Submit new weight
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDate("");
      setWeight("");
      fetchWeights();
    } catch (err) {
      console.error("Error adding weight:", err);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, [token]);

  // Chart data
  const chartData = {
    labels: formData.map((entry) =>
      entry.date ? new Date(entry.date).toLocaleDateString() : "N/A"
    ),
    datasets: [
      {
        label: "Weight (kg)",
        data: formData.map((entry) => entry.weight || 0),
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

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
      <div className="WeightGraph" style={{ marginTop: "100px", width: "500px" }}>
        <h2>Weight Graph</h2>
        {/* Use key to force chart re-render and prevent canvas reuse error */}
        <Line key={formData.length} data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

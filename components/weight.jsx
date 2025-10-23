import React, { useState,useEffect } from "react";
import "./weight.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const weight = () => {
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");

  const API_URL = "http://localhost:3000/weights";

  const fetchWeights = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching weights:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !weight) {
      alert("Please fill in both date and weight");
      return;
    }
    try {
      await axios.post(API_URL, { date, weight: parseFloat(weight) });
      setDate("");
      setWeight("");
      alert("Weight added successfully!");
      fetchWeights();
    } catch (err) {
      console.error("Error adding weight:", err);
    }
  };

  // Removed handleChange since formData is an array, not an object

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
      <div className="WeightTracker" style={{ marginTop: "150px" }}>
        <h2>Weight Tracker</h2>
        <form
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <input
            type="date"
            placeholder="Enter the date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      <div
        className="WeightGraph"
        style={{ marginTop: "100px", width: "500px" }}
      >
        <h2>Weight Graph</h2>
        <Line
          data={{
            labels: formData.map((entry) => new Date(entry.date).toLocaleDateString()),
            datasets: [
              {
                label: "Weight",
                data: formData.map((entry) => entry.weight),
              },
            ],
          }}
        ></Line>
      </div>
    </div>
  );
};

export default weight;

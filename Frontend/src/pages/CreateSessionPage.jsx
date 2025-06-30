// src/pages/CreateSessionPage.jsx
import { useState } from "react";
import axios from "../api/axiosClient";

export default function CreateSessionPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    candidates: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const candidateArray = form.candidates.split(",").map((name) => name.trim());
      const res = await axios.post("/vote-session/create", {
        title: form.title,
        description: form.description,
        candidates: candidateArray,
      });
      alert("Session created successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Create Voting Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="candidates"
          placeholder="Candidates (comma-separated)"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}

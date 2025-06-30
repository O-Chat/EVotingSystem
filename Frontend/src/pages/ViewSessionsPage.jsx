// src/pages/ViewSessionsPage.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ViewSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/vote-session/all");
        setSessions(res.data.sessions);
      } catch (err) {
        alert("Failed to fetch sessions");
      }
    };
    fetchSessions();
  }, []);

  const handleClose = async (id) => {
    try {
      await axios.patch(`/vote-session/${id}/close`);
      alert("Session closed");
      const res = await axios.get("/vote-session/all");
      setSessions(res.data.sessions);
    } catch (err) {
      alert("Failed to close session");
    }
  };

  const handleViewBlockchain = async (id) => {
    const res = await axios.get(`/vote-session/${id}/blockchain`);
    console.log("Blockchain:", res.data.chain);
    alert("Blockchain in console");
  };

  const handleValidateBlockchain = async (id) => {
    const res = await axios.get(`/vote-session/${id}/blockchain/validate`);
    alert(res.data.valid ? "✅ Valid chain" : "❌ Tampered");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Sessions</h2>
      {sessions.map((session) => (
        <div key={session.id} className="border p-4 rounded shadow bg-white">
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <p>{session.description}</p>
          <p>Status: {session.isActive ? "Active" : "Closed"}</p>
          {session.isActive && (
            <button
              onClick={() => handleClose(session.id)}
              className="mt-2 px-4 py-1 bg-red-600 text-white rounded"
            >
              Close
            </button>
          )}
          <button
            onClick={() => navigate(`/results/${session.id}`)}
            className="ml-2 px-4 py-1 bg-green-600 text-white rounded"
          >
            View Results
          </button>
          <button
            onClick={() => handleViewBlockchain(session.id)}
            className="ml-2 px-4 py-1 bg-gray-700 text-white rounded"
          >
            Blockchain
          </button>
          <button
            onClick={() => handleValidateBlockchain(session.id)}
            className="ml-2 px-4 py-1 bg-yellow-600 text-white rounded"
          >
            Validate
          </button>
        </div>
      ))}
    </div>
  );
}

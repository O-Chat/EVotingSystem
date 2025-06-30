// src/pages/CompletedSessionsPage.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CompletedSessionsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/vote-session/all");
        const all = res.data.sessions;
        const completed = all.filter(s => !s.isActive && s.voters.includes(user.id));
        setSessions(completed);
      } catch (err) {
        console.error("Failed to fetch completed sessions", err);
      }
    };

    fetchSessions();
  }, [user.id]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Your Completed Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No completed sessions available.</p>
      ) : (
        sessions.map(session => (
          <div key={session.id} className="border p-4 mb-3 rounded shadow bg-white">
            <h4 className="text-lg font-semibold">{session.title}</h4>
            <button
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => navigate(`/results/${session.id}`)}
            >
              View Results
            </button>
          </div>
        ))
      )}
    </div>
  );
}

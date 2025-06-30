// src/pages/ActiveSessionsPage.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ActiveSessionsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/vote-session/all");
        const all = res.data.sessions;
        const active = all.filter(s => s.isActive);
        setSessions(active);
      } catch (err) {
        console.error("Failed to fetch active sessions", err);
      }
    };

    fetchSessions();
  }, [user.id]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Active Voting Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No active sessions available.</p>
      ) : (
        sessions.map((session) => {
          const hasVoted = session.voters.includes(user.id);
          return (
            <div
              key={session.id}
              className={`border p-4 mb-3 rounded shadow flex justify-between items-center ${
                hasVoted
                  ? "bg-gray-100 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
              }`}
              onClick={() => {
                if (!hasVoted) navigate(`/vote/${session.id}`);
              }}
            >
              <h4 className="text-lg font-semibold">{session.title}</h4>
              {hasVoted && <span className="text-sm text-green-700 font-medium">Voted ✓</span>}
            </div>
          );
        })
      )}
    </div>
  );
}

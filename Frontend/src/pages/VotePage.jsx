
// src/pages/VotePage.jsx
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function VotePage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/vote-session/all");
        setSessions(res.data.sessions);
      } catch (err) {
        console.error("Error fetching sessions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Active Voting Sessions</h2>

      {sessions.length === 0 && <p>No active sessions available.</p>}

      <ul className="space-y-3">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="p-4 border rounded-md shadow-sm flex justify-between items-center"
          >
            <span className="font-semibold">{session.title}</span>
            {session.hasVoted ? (
              <span className="text-gray-500 text-sm">Voted</span>
            ) : (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/vote/${session.id}`)}
              >
                Vote
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

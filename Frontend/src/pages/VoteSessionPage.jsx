// src/pages/VoteSessionPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosClient";

export default function VoteSessionPage() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/vote-session/all`);
        const current = res.data.sessions.find((s) => s.id === sessionId);
        setSession(current);
      } catch (err) {
        console.error("Error loading session", err);
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    try {
      await axios.post("/vote", {
        sessionId,
        candidateName: selectedCandidate,
      });
      alert(`Vote cast successfully for ${selectedCandidate}`);
      navigate("/voter");
    } catch (err) {
      console.error("Vote error", err);
      alert(err?.response?.data?.message || "Vote failed");
    }finally {
    // ✅ go back to the sessions list regardless of outcome
    navigate("/voter");      // or navigate(-1);
  }
  };

  if (!session) return <p className="text-center mt-10">Loading session...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
      <p className="mb-6 text-gray-600">{session.description}</p>

      <div className="space-y-2">
        {session.candidates.map((c) => (
          <div key={c.name} className="flex items-center space-x-2">
            <input
              type="radio"
              id={c.name}
              name="candidate"
              value={c.name}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            />
            <label htmlFor={c.name}>{c.name}</label>
          </div>
        ))}
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleVote}
      >
        Cast Vote
      </button>
    </div>
  );
}

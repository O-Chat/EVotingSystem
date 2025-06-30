import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function ResultsPage() {
  const { sessionId } = useParams();
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/results/${sessionId}`);
        setResults(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to fetch results";
        setError(msg);
      }
    };
    fetchResults();
  }, [sessionId]);

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!results) return <div className="text-center mt-10">Loading results...</div>;

  // Identify winners or ties
  const votes = results.results.map(c => c.votes);
  const maxVotes = Math.max(...votes);
  const winners = results.results.filter(c => c.votes === maxVotes);
  const isTie = winners.length > 1;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2">{results.title}</h2>
      <p className="text-gray-700 mb-4">{results.description}</p>
      <p>Total Votes: <strong>{results.totalVotes}</strong></p>
      <ul className="mt-4">
        {results.results.map((candidate, i) => {
          const isWinner = candidate.votes === maxVotes;
          return (
            <li
              key={i}
              className={`p-2 border rounded my-2 shadow ${
                isWinner ? "bg-green-100 border-green-500" : ""
              }`}
            >
              {candidate.name} — <strong>{candidate.votes}</strong> vote(s)
              {isWinner && (
                <span className="ml-2 text-green-700 font-semibold">
                  {isTie ? "🤝 Tie" : "🏆 Winner"}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

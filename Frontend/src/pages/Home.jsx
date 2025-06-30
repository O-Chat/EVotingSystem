// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to eVote</h1>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        A secure, decentralized blockchain-based voting platform ensuring transparency and trust in every election.
      </p>

      <div className="space-x-4">
        <Link
          to="/register"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register to Vote
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

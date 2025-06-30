// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">eVote</Link>

        <div className="space-x-4">
          {!user && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          )}
          {user?.role === "voter" && (
            <Link to="/voter" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          )}
          {user && (
            <button
              onClick={logout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

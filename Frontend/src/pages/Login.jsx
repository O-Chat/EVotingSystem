// src/pages/Login.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // page we tried to visit before redirecting to /login
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(form.email, form.password); // returns { ok, error }

    if (res.ok) {
      // go back to the page the user originally wanted
      navigate(from, { replace: true });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}

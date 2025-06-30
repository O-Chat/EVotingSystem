import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "voter",
    adminCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axiosClient.post("/auth/register", form);
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Register error:", err);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "admin" && (
          <input
            name="adminCode"
            placeholder="Admin Secret Code"
            value={form.adminCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

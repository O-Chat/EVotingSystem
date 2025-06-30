import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/admin/create")}
          className="p-8 bg-blue-100 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all text-center"
        >
          <h3 className="text-2xl font-semibold text-blue-800">🛠️ Create Session</h3>
          <p className="mt-2 text-gray-600">Start a new voting session</p>
        </div>

        <div
          onClick={() => navigate("/admin/sessions")}
          className="p-8 bg-green-100 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all text-center"
        >
          <h3 className="text-2xl font-semibold text-green-800">📋 View Sessions</h3>
          <p className="mt-2 text-gray-600">Manage and view existing sessions</p>
        </div>
      </div>
    </div>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from "./components/ProtectedRoute";
import VoteSessionPage from "./pages/VoteSessionPage";
import ResultsPage from "./pages/ResultsPage";
import VoterDashboard from "./pages/VoterDashboard";
import AdminDashboard from "./pages/AdminDashboard"; // Admin UI (Day 12)
import CreateSessionPage from "./pages/CreateSessionPage";
import ViewSessionsPage from "./pages/ViewSessionsPage";
import ActiveSessionsPage from "./pages/ActiveSessionsPage";
import CompletedSessionsPage from "./pages/CompletedSessionsPage";




import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/create" element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <CreateSessionPage />
  </ProtectedRoute>
} />
<Route path="/admin/sessions" element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <ViewSessionsPage />
  </ProtectedRoute>
} />
          <Route path="/voter" element={
            <ProtectedRoute allowedRoles={["voter"]}>
              <VoterDashboard />
            </ProtectedRoute>
          } />
          <Route path="/voter/active" element={
  <ProtectedRoute allowedRoles={["voter"]}>
    <ActiveSessionsPage />
  </ProtectedRoute>
} />
<Route path="/voter/completed" element={
  <ProtectedRoute allowedRoles={["voter"]}>
    <CompletedSessionsPage />
  </ProtectedRoute>
} />
          <Route path="/vote/:sessionId" element={
            <ProtectedRoute allowedRoles={["voter"]}>
              <VoteSessionPage />
            </ProtectedRoute>
          } />
          <Route path="/results/:sessionId" element={
            <ProtectedRoute allowedRoles={["admin", "voter"]}>
              <ResultsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

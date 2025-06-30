// import { useEffect, useState } from "react";
// import axios from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // assumes you're using context

// export default function VoterDashboard() {
//   const { user } = useAuth();
//   const [activeSessions, setActiveSessions] = useState([]);
//   const [completedSessions, setCompletedSessions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const res = await axios.get("/vote-session/all");
//         const allSessions = res.data.sessions;

//         // Voted sessions (by checking if user id is in session.voters)
//         const votedSessionIds = allSessions
//           .filter(s => s.voters.includes(user.id))
//           .map(s => s.id);

//         // Active sessions: voter has NOT yet voted
//         // const active = allSessions.filter(
//         //   s => s.isActive && !s.voters.includes(user.id)
//         // );
//         const active = allSessions.filter(s => s.isActive); 

//         // Completed sessions: session closed and voter had voted
//         const completed = allSessions.filter(
//           s => !s.isActive && s.voters.includes(user.id)
//         );

//         setActiveSessions(active);
//         setCompletedSessions(completed);
//       } catch (err) {
//         console.error("Failed to fetch sessions", err);
//       }
//     };

//     fetchSessions();
//   }, [user.id]);

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6">Voter Dashboard</h2>

//       {/* ── Active Voting Sessions ── */}
//       {/* <h3 className="text-xl font-semibold mb-2">Active Voting Sessions</h3>
//       {activeSessions.length === 0 ? (
//         <p className="text-gray-500">No active sessions available.</p>
//       ) : (
//         activeSessions.map(session => (
//           <div
//             key={session.id}
//             className="border p-4 mb-3 rounded shadow hover:bg-gray-50 cursor-pointer"
//             onClick={() => navigate(`/vote/${session.id}`)}
//           >
//             <h4 className="text-lg font-semibold">{session.title}</h4>
//           </div>
//         ))
//       )} */}
//       {/* ACTIVE VOTING SESSIONS */}
// <h3 className="text-xl font-semibold mb-2">Active Voting Sessions</h3>
// {activeSessions.length === 0 ? (
//   <p className="text-gray-500">No active sessions available.</p>
// ) : (
//   activeSessions.map((session) => {
//     const hasVoted = session.voters.includes(user.id);

//     return (
//       <div
//         key={session.id}
//         className={`border p-4 mb-3 rounded shadow flex justify-between items-center ${
//           hasVoted
//             ? "bg-gray-100 cursor-not-allowed"
//             : "hover:bg-gray-50 cursor-pointer"
//         }`}
//         onClick={() => {
//           if (!hasVoted) navigate(`/vote/${session.id}`);
//         }}
//       >
//         <h4 className="text-lg font-semibold">{session.title}</h4>
//         {hasVoted && (
//           <span className="text-sm text-green-700 font-medium">Voted ✓</span>
//         )}
//       </div>
//     );
//   })
// )}



//       {/* ── Completed Sessions ── */}
//       <h3 className="text-xl font-semibold mt-8 mb-2">Your Completed Sessions</h3>
//       {completedSessions.length === 0 ? (
//         <p className="text-gray-500">No completed sessions yet.</p>
//       ) : (
//         completedSessions.map(session => (
//           <div key={session.id} className="border p-4 mb-3 rounded shadow bg-white">
//             <h4 className="text-lg font-semibold">{session.title}</h4>
//             <button
//               className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//               onClick={() => navigate(`/results/${session.id}`)}
//             >
//               View Results
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function VoterDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Voter Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/voter/active")}
          className="bg-blue-100 border border-blue-300 p-8 rounded-lg shadow cursor-pointer hover:bg-blue-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2 text-blue-800">🟢 View Active Sessions</h3>
          <p className="text-gray-700">See ongoing elections and cast your vote.</p>
        </div>

        <div
          onClick={() => navigate("/voter/completed")}
          className="bg-green-100 border border-green-300 p-8 rounded-lg shadow cursor-pointer hover:bg-green-200 transition"
        >
          <h3 className="text-xl font-semibold mb-2 text-green-800">✅ View Completed Sessions</h3>
          <p className="text-gray-700">See results of elections you participated in.</p>
        </div>
      </div>
    </div>
  );
}

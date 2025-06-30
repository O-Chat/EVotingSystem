# 🗳️ BlockVote ##  Blockchain-Based E-Voting System
*Tamper-proof voting. Powered by Blockchain.*

 

A secure and decentralized web application that enables online voting using blockchain technology to ensure transparency, tamper-resistance, and trust. Built with a full-stack architecture using **React**, **Node.js**, **MongoDB**, and **JWT-based authentication**.

---

## 🔐 Key Features

- **Blockchain-Powered Voting:** Every vote is recorded in a tamper-proof blockchain ledger.
- **Secure Passwords:** User passwords are hashed using bcrypt before storing in the database.
- **Two Roles:** Admins can create/manage sessions, voters can vote and view results.
- **Session Management:** Admins can create and close voting sessions, view live vote counts, and validate the blockchain.
- **Real-time Results:** Results are available once sessions are closed.
- **Authentication & Authorization:** JWT-secured login and protected routes.
- **Responsive UI:** Built using TailwindCSS, optimized for both desktop and mobile views.
- **Session-based State:** Sessions are categorized into active and completed for voters.

---

---

## 🔐 Authentication & Security

- **Password Hashing:** All user passwords are hashed using `bcrypt` before being stored in MongoDB. Plain text passwords are never saved.
- **JWT Authentication:** On login, users receive a signed JWT token that is stored in localStorage and used to access protected routes.
- **Role-Based Access Control:** Admin and Voter roles are enforced both on frontend (UI) and backend (API) using middleware.
- **Blockchain Integrity:** Votes are written to a tamper-proof blockchain with SHA256 hashing, and admins can validate chains.


## 🚀 Tech Stack

| Frontend      | Backend  | Database | Security     |
|---------------|----------|----------|--------------|
| React         | Node.js  | MongoDB  | JWT Auth     |
| React Router  | Express  | Mongoose | Role-Based Middleware |
| Tailwind CSS  |          |          | Blockchain Validation |
|               |          |          | Password Hashing using bcrypt|

---

## 📦 Project Structure
EVotingSystem/
│
├── Backend/
│ ├──config/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.js
│
├── Frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── assets/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/
│ │ ├── utils/
│ │ ├── index.css/
│ │ └── App.jsx
│
├── .gitignore
├── README.md
└── package.json

---

## 🛠️ Setup Instructions

### 🔑 Prerequisites

- Node.js and npm installed
- MongoDB running locally or cloud-based (e.g. MongoDB Atlas)

### 🔧 Backend

1. Navigate to the backend folder:
   ```bash
   cd Backend
2. Create a .env file with:
   ```bash
   PORT=5050
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

3. Install dependencies:
   ```bash
   npm install

4. Start backend server:
   ```bash
   node server.js

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd Frontend
2. Install dependencies:
   ```bash
   npm install
3. Start React frontend:
   ```bash
   npm run dev

   ---

### Skills Demonstrated
- Full-stack development with React, Node, and MongoDB
- RESTful API design and secure authentication with JWT
- Blockchain data structure for verifiable transactions
- React Router DOM navigation and conditional rendering
- Role-based route protection
- UI/UX design using TailwindCSS
- Clean code architecture with modular separation

###  Why is it Secure?
- **Blockchain Integrity**: Every vote is added as a new block linked to the previous one using SHA256 hashing. Blocks are immutable once written.
- **JWT Authentication**: Prevents unauthorized access to admin or voter routes.
- **Role-based Authorization**: Admin-only and voter-only APIs protected by middleware.
- **Tamper Detection**: Admin can validate the blockchain integrity for each session.

### Contact
Built by Olivia Chattopadhyay


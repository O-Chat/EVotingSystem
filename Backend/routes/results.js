const express = require('express');
const router = express.Router();
const VotingSession = require('../models/votingSession');
const verifyJWT = require('../middleware/authMiddleware');

router.get('/:sessionId', verifyJWT, async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const session = await VotingSession.findById(sessionId);
    if (!session)
      return res.status(404).json({ message: "Session not found" });

    // Admin can view all sessions
    if (role === 'admin') {
      const results = session.candidates.map(candidate => ({
        name: candidate.name,
        votes: candidate.votes
      }));
      return res.status(200).json({
        title: session.title,
        description: session.description,
        isActive: session.isActive,
        totalVotes: session.voters.length,
        results
      });
    }

    // Voter can only view if they voted AND session is closed
    const hasVoted = session.voters.includes(userId);
    if (!hasVoted || session.isActive) {
      return res.status(403).json({ message: "You are not authorized to view this result." });
    }

    const results = session.candidates.map(candidate => ({
      name: candidate.name,
      votes: candidate.votes
    }));

    return res.status(200).json({
      title: session.title,
      description: session.description,
      isActive: session.isActive,
      totalVotes: session.voters.length,
      results
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

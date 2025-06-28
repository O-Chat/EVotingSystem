const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const VotingSession = require('../models/votingSession');

router.get('/', verifyToken, (req, res) => {
  res.json({
    message: 'You are authorized to vote 🗳️',
    user: req.User  // Shows id and role from token
  });
});

router.post('/', verifyToken, async (req, res) => {
  const { sessionId, candidateName } = req.body;
  const userId = req.user.id;
  try {
      const session = await VotingSession.findById(sessionId);
      if (!session)
          return res.status(404).json({ message: "Voting session not found" });
      //checking if the user already voted
      if (session.voters.includes(userId))
          return res.status(400).json({ message: "You have already voted in this session" });
      //finding the candidate
      const candidate = session.candidates.find(c => c.name === candidateName);
      if (!candidate)
          return res.status(404).json({ message: 'Candidate not found' });

      //vote
      candidate.votes += 1;
      session.voters.push(userId);
      await session.save();
      return res.status(200).json({ message: `Vote cast successfully for ${candidateName}` });

  } catch (err) {
      res.status(500).json({ message: "Server error" });
  }
})
module.exports = router;

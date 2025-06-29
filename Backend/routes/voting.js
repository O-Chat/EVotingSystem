const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/authMiddleware');
const allow = require('../middleware/roleMiddleware');
const VotingSession = require('../models/votingSession');
const voteChain = require('../utils/blockchain');   

router.post('/create', verifyJWT, allow('admin'), async (req, res) => {
    const { title, description, candidates } = req.body;
    try {
        const formattedCandidates = candidates.map(name => ({ name }));
        const session = await VotingSession.create({
            title,
            description,
            candidates: formattedCandidates,
            createdBy: req.user.id
        });
        res.status(201).json({ message: 'Voting session created!', sessionId: session._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:sessionId/close', verifyJWT, allow('admin'), async (req, res) => {
    const { sessionId } = req.params;
  
    try {
      const session = await VotingSession.findById(sessionId);
      //check if session present
      if (!session)
        return res.status(404).json({ message: 'Session not found' });
      //check if session already inactive
      if (!session.isActive)
        return res.status(400).json({ message: 'Session already closed' });
      //turning session inactive
      session.isActive = false;
      await session.save();
  
      res.json({ message: 'Voting session closed', sessionId });
    } catch (err) {
      //console.error('Close-session error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/all', verifyJWT, async (req, res) => {
    try {
      const user = req.user;
  
      let sessions;
  
      // Admin sees sessions they created
      if (user.role === 'admin') {
        sessions = await VotingSession.find({ createdBy: user.id });
      } else {
        // Voter sees only active sessions
        sessions = await VotingSession.find({ isActive: true });
      }
  
      // Format basic session info
      const formatted = sessions.map(session => ({
        id: session._id,
        title: session.title,
        description: session.description,
        isActive: session.isActive,
        totalVotes: session.voters.length,
        candidates: session.candidates.map(c => ({ name: c.name, votes: c.votes }))
      }));
  
      return res.status(200).json({ sessions: formatted });
  
    } catch (err) {
      console.error('View sessions error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/blockchain', verifyJWT, allow('admin'), (req, res) => {
  res.json(voteChain.chain);
});



module.exports = router;
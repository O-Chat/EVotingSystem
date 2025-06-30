const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/authMiddleware');
const allow = require('../middleware/roleMiddleware');
const VotingSession = require('../models/votingSession'); 
const sha256 = require('../utils/hash');

router.post('/create', verifyJWT, allow('admin'), async (req, res) => {
    const { title, description, candidates } = req.body;
    try {
        const formattedCandidates = candidates.map(name => ({ name }));
        // ✅ Create genesis block
        const genesisData = { isGenesis: true };
        const timestamp = Date.now();
        const genesisBlock = {
          index: 0,
          previousHash: '0',
          timestamp,
          data: genesisData,
          hash: sha256('0' + '0' + timestamp + JSON.stringify(genesisData))
        };
        const session = await VotingSession.create({
            title,
            description,
            candidates: formattedCandidates,
            createdBy: req.user.id,
            blockchain: [genesisBlock] 
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

  // GET /vote-session/all
router.get('/all', verifyJWT, async (req, res) => {
  try {
    const user = req.user;

    let sessions;

    // Admin sees sessions they created
    if (user.role === 'admin') {
      sessions = await VotingSession.find({ createdBy: user.id });
    } else {
      // Voter sees:
      //  • every active session
      //  • every closed session where they have voted
      sessions = await VotingSession.find({
        $or: [
          { isActive: true },      // still open
          { voters: user.id }      // closed but they participated
        ]
      });
    }

    // Format basic session info
    const formatted = sessions.map(session => ({
      id:          session._id,
      title:       session.title,
      description: session.description,
      isActive:    session.isActive,
      totalVotes:  session.voters.length,
      voters:      session.voters,                               // keep full list
      candidates:  session.candidates.map(c => ({
        name:  c.name,
        votes: c.votes
      }))
    }));

    return res.status(200).json({ sessions: formatted });

  } catch (err) {
    console.error('View sessions error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


  // Get blockchain for a session
router.get('/:sessionId/blockchain', verifyJWT, allow('admin'), async (req, res) => {
  const { sessionId } = req.params;
  const session = await VotingSession.findById(sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });
  res.json({ chain: session.blockchain });
});


// Validate blockchain
router.get('/:sessionId/blockchain/validate', verifyJWT, allow('admin'), async (req, res) => {
 
  const { sessionId } = req.params;
  const session = await VotingSession.findById(sessionId);
  if (!session) return res.status(404).json({ message: 'Session not found' });

  const chain = session.blockchain;
  let valid = true;

  for (let i = 1; i < chain.length; i++) {
    const curr = chain[i];
    const prev = chain[i - 1];
    const checkHash = sha256(
      curr.index + curr.previousHash + curr.timestamp + JSON.stringify(curr.data)
    );
    if (curr.hash !== checkHash || curr.previousHash !== prev.hash) {
      valid = false;
      break;
    }
  }
  res.json({ valid });
});




module.exports = router;
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const VotingSession = require('../models/votingSession');
//const voteChain=require('../utils/blockchain');
const sha256 = require('../utils/hash');

router.get('/', verifyToken, (req, res) => {
  res.json({
    message: 'You are authorized to vote ',
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
    // 1. Build new block data
    const prevBlock = session.blockchain[session.blockchain.length - 1];
    const newBlock = {
      index: session.blockchain.length,
      previousHash: prevBlock ? prevBlock.hash : "0",
      timestamp: new Date(),
      data: {
        voterId: userId,
        candidate: candidateName,
        sessionId
      },
      hash: ""   // placeholder
    };

    // 2. Calculate its hash
    newBlock.hash = sha256(
      newBlock.index +
      newBlock.previousHash +
      newBlock.timestamp +
      JSON.stringify(newBlock.data)
    );

    // 3. Push to blockchain array
    session.blockchain.push(newBlock);

    await session.save();

    return res.status(200).json({ message: `Vote cast successfully for ${candidateName}` });

  } catch (err) {
    console.error('Vote route error →', err);
    res.status(500).json({ message: "Server error" });
  }
})
module.exports = router;

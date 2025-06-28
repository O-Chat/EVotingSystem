const express=require('express');
const router=express.Router();
const VotingSession=require('../models/votingSession');

router.get('/:sessionId', async(req,res)=>{
    const {sessionId}=req.params;
    try{
        const session = await VotingSession.findById(sessionId);
        if (!session) 
            return res.status(404).json({ message: "Session not found" });
    
        const results = session.candidates.map(candidate => ({
          name: candidate.name,
          votes: candidate.votes
        }));
    
        res.status(200).json({
          title: session.title,
          description: session.description,
          isActive: session.isActive,
          totalVotes: session.voters.length,
          results
        });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
});
module.exports=router;
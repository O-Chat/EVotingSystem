const allow=(...allowedRoles)=>{
    return (req,res,next)=>{
        try{
            const userRole=req.user?.role;
            if(!allowedRoles.includes(userRole))
                return res.status(403).json({message:'Wrong role'});
            next();
        }catch(err){
            return res.status(500).json({ message: 'Server error' });
        }
    };
}
module.exports=allow;
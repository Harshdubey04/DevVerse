
const viewProfile=async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("User not found...");
        }
        res.send(user);
    }

    catch(err){
        res.status(400).send(err.message);
    }

}

module.exports={
    viewProfile
}
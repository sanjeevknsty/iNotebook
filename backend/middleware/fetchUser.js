const jwt = require('jsonwebtoken')
const SEC_PASS = "Sanjeev@10"


const fetchUser = (req,res,next)=>{
  
  const authToken = req.header("auth-header")
  if (!authToken) {
    return res.status(400).send({ error: "Enter Valid Details,Email" }) 
   }

  try {
    
    const data = jwt.verify(authToken,SEC_PASS)
    console.log(data)
    req.user = data.userId
    next()
    
  } catch (error) {
    res.status(500).send("Error Occured")
    console.error(error.message) 
  }
}

module.exports = fetchUser
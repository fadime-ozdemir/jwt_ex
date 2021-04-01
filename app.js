const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.get("/api", (req, res)=>{
    res.json({message: "Welcome to API"})
});

app.post("/api/posts", verifyToken, (req, res)=>{
    jwt.verify(req.token, "secretKey", (err, authData)=>{
       if(err){
           res.sendStatus(403)
       } else {
           res.json({
               message: "Post created...",
            authData, 
        })
       }
    })
})

app.post("/api/login", (req, res)=>{
    //mock user
    const user = {id: 1, username:" bard", email: "qa@dd.com"}
    jwt.sign({user: user}, "secretKey", {expiresIn:"30s"}, (err, token)=>{
        res.json({
            token: token
        })
    })
})

// Format of token in header
// authorization: Bearer <access _token>

// verify token - middleware
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined, you use undefined in string
    if(typeof bearerHeader !== "undefined"){
        // to take the token from auth header: split at the space
        const bearerToken = bearerHeader.split(" ")[1];
        // set the token
        req.token = bearerToken
        
        next()
    }else{
        // forbidden
        res.sendStatus(403);
    }
}
app.listen(5000, ()=>console.log("server started on port 5000"))
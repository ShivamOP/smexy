const express = require('express');

const server = express();

server.all('/', (req, res)=>{
    res.send('<h1> Your bot is alive! </h1>')
  
})

function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;
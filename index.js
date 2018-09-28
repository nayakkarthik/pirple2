const http = require('http');

var server = http.createServer((req,resp)=>
{
resp.end("hello world");
});

server.listen(3000,()=>{
console.log("Connected to server at 3000");
});
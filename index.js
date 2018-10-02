const http = require('http');
const querystring = require('querystring');
const url = require('url');
const stringDecoder = require('string_decoder');
const config = require('./lib/config');
const fileHelper = require('./lib/fileHelper');
const router = require('./lib/router');
 

var server = http.createServer((req,resp)=>{

    var decoder = new stringDecoder.StringDecoder('utf8');
    var payload = '';
    var parsedUrl = url.parse(req.url);
    var path = parsedUrl.pathname;
    path = path.replace(/^\/|\/$/g, '');

    var queryOption = querystring.parse(parsedUrl.query);
    var headers = req.headers;
    
    var requestData = {
        query: queryOption,
        method: req.method.toUpperCase(),
        path:path,
        headers:headers, 
    };

    req.on("data",(buffer)=>{
        payload +=  decoder.write(buffer);
    });

    req.on("end",()=>{
        payload += decoder.end();
        requestData.payload = payload;
        router[requestData.path](requestData);
        resp.end();
    });


    
});

server.listen(config.port,()=>{

    console.log("listening to port " + config.port);
});

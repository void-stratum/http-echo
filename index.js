const express = require("express");
const app = express();
const port = 1321;
const ctLengthHeader = "content-length";
const CRLF = "<br />"

function readBodyAsString(req, callback) {
    let body = "";
    let eof = +req.headers[ctLengthHeader];
    
    req.on("data", (chunk) => {        
        body += chunk.toString();        
        if(eof === body.length) {
            callback(body);
        }
    }); 
}

app.get("*", (req, res) => {
    res.send(`GET:${req.path}`);
});

app.post("*", (req, res) => {
    readBodyAsString(req, (body) => {
        res.send(`POST:${req.path}${CRLF}BODY:${body}`);      
    });    
});


app.listen(port, () => {
    console.log(`Server is  now listening on port ${port}`);
});


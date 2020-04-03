const express = require("express");
const app = express();
const port = 80;
const ctLengthHeader = "content-length";
const CRLF = "<br />"

function readBodyAsString(req, callback) {
    let body = "";
    
    let eof = +req.headers[ctLengthHeader];

    if (eof === 0) {
        callback("");
    }
    
    req.on("data", (chunk) => {        
        body += chunk.toString();        
        if(eof === body.length) {
            callback(body);
        }
    }); 
}

app.all("*", (req, res) => {
    readBodyAsString(req, (body) => {
        res.send(`${req.method}:${req.path}${CRLF}BODY:${body}`);      
    });    
});


app.listen(port, () => {
    console.log(`Server is  now listening on port ${port}`);
});


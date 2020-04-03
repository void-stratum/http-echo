const express = require("express");
const app = express();
const port = 80;
const ctLengthHeader = "content-length";

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

function formatHeaders(req) {
    let headers = [];
    
    for (let i = 0; i < req.rawHeaders.length; i=i+2) {
        const header = req.rawHeaders[i];
        const value = req.rawHeaders[i + 1];
        headers[headers.length] = `${header}: ${value}`;
    }

    return headers;
}

app.all("*", (req, res) => {    

    readBodyAsString(req, (body) => {
        res.json(
            {
                method: req.method,
                path: req.path,
                headers: formatHeaders(req),
                body: body,
                query: req.query
            }
        );
    });    
});


app.listen(port, () => {
    console.log(`Server is  now listening on port ${port}`);
});


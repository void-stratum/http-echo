const express = require("express");
const app = express();
const port = 80;
const ctLengthHeader = "content-length";

function readBodyAsString(req, callback) {
    let body = "";
    
    let eof = +req.headers[ctLengthHeader];

    if (eof === NaN || eof === 0) {
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
        res.json(
            {
                date: new Date().toJSON(),
                method: req.method,
                path: req.path,
                headers: req.headers,
                body: body,
                query: req.query
            }
        );
    });    
});


app.listen(port, () => {
    console.log(`Server is  now listening on port ${port}`);
});


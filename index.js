"use strict";

// Imports
const express = require("express");
const app = express();

// Constants
const PORT = 80;
const HOST = "0.0.0.0";
const CNTLEN_HEADER = "content-length";

/**
 * Parses body and calls callback handle with value
 * @param {*} req Express request
 * @param {*} callback Callback that takes body string argument
 */
function readBodyAsString(req, callback) {

    let eof = +req.headers[CNTLEN_HEADER];

    if (isNaN(eof)) {
        callback(null);
    }

    let body = "";

    if (eof === 0) {
        callback(body);
    }

    req.on("data", (chunk) => {
        body += chunk.toString();
        if(eof === body.length) {
            callback(body);
        }
    });
}

/** Defining requests handling */
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


// Starts Express http listener
app.listen(
    PORT,
    HOST,
    () =>
        {
            console.log(
                `Http-echo is now running on http://${HOST}:${PORT}`
            );
        }
);


const http = require("http");
const port = 8080;
const fs = require("fs");

const myserver = http.createServer((req, res) => {
    const log = `${Date.now()}: &  From ${req.url} New Request Received\n`

    fs.appendFile("./log.txt", log, (err) => {
        if(err) {
            console.log("error: ", err);
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
        }
            res.end("Server is created");
    })
})

myserver.listen(port, () => {
    console.log(`server is connected @ ${port}`);
})
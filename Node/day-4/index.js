const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //downloading file
  // const readableStream = fs.createReadStream("sample.txt");
  // readableStream.pipe(res);

  // copy file
  const readableStream = fs.createReadStream("sample.txt");
  const writeableStream = fs.createWriteStream("output.txt");

  readableStream.on("data", (chunk) => {
    writeableStream.write(chunk);
  });

  res.end();
});

server.listen(8080, () => {
  console.log("SERVER IS LISTENING AT PORT: ", 8080);
});

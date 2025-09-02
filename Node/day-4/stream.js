const http = require("http");
const fs = require("fs");
const { Transform, pipeline } = require("stream");

const server = http.createServer((req, res) => {
  // ?------1----------

  // !1. Downloading  file bad way
  // const file = fs.readFileSync('sample.txt')
  // return res.end(file);

  // *2. Downloading file good using good way (streams)
  // const reabableStream = fs.createReadStream("sample.txt")
  // (req)readbalestream --> (res)writablestream
  // reabableStream.pipe(res)

  // ?--------2---------
  // !1. Copy big file using bad way
  // const file = fs.readFileSync('sample.txt');
  // fs.writeFileSync('output.txt', file);
  // res.end()

  //*2. Copy big file good way
  // const readStream = fs.createReadStream('sample.txt');
  // const writeStream = fs.createWriteStream('output.txt');
  // readStream.on('data', (chunk) => {
  //     console.log('Chunk: ', chunk.toString());
  //     writeStream.write(chunk);
  // });

  // ?---------String processing----------
  // Uppercase()
  // ipsum word replace to another word
  const readStream = fs.createReadStream("sample.txt");
  const writeStream = fs.createWriteStream("output.txt");

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const modifiedWord = chunk
        .toString()
        .toUpperCase()
        .replaceAll(/ipsum/gi, "Hello");
      callback(null, modifiedWord);
    },
  });

  // !Bad way to transforming chunks
  // samplefilestream.on("data" , (chunk)=>{
  //     const modifiedWord = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "Hello")
  //     outputwritablestream.write(modifiedWord)
  // })
  // samplefilestream.pipe(transformStream).pipe(outputwritablestream);

  // *Good way
  pipeline(readStream, transformStream, writeStream, (err) => {
    if (err) {
      console.error("Pipeline failed:", err);
      res.statusCode = 500;
      res.end("Error while processing");
    } else {
      console.log("Pipeline succeeded");
      res.end("File processed successfully");
    }
  });
});

server.listen(8000, () => {
  console.log("Server is started at 8000");
});

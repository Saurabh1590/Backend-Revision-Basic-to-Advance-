const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);
// write

// fs.writeFileSync("./sync.txt", "This is sync File");
// fs.writeFile("./async.txt","This is async file", (err) => {
//     console.log(err);
// })

//read

// const res = fs.readFileSync("sync.txt", "utf-8");
// fs.readFile("async.txt", "utf-8", (err,res) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// });

//update

// fs.appendFileSync("./sync.txt",new Date().toDateString());
// fs.appendFile("./log.txt", `Hello world & logged in at ${new Date().toDateString()}\n`, (err, res) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(res);
//     }
// })

// const stats = fs.statSync('./async.txt');
// console.log(stats);

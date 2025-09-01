const eventEmitter = require("events");

const emitter = new eventEmitter();

const fs = require("fs");
const { json } = require("stream/consumers");

const LogFile = "eventlog.json";

const countTracker = {
    login:0,
    logout:0,
    purchase:0,
    profileUpdate:0
}

if(fs.existsSync(LogFile)) {
    const data = fs.readFileSync(LogFile, "utf-8");
    Object.assign(countTracker, JSON.parse(data));
}

function saveCount() {
    fs.writeFileSync(LogFile, JSON.stringify(countTracker, null, 2));
}

emitter.on("login", (username) => {
    countTracker.login++;
    console.log(username + " logged in");
    saveCount();
})
emitter.on("logout", (username) => {
    countTracker.logout++;
    console.log(username + " logged out");
    saveCount();
})
emitter.on("purchase", ({username,item}) => {
    countTracker.purchase++;
    console.log(`${username } purchased  ${item}`);
    saveCount();
})

emitter.on("profileUpdate", ({username, field}) => {
    countTracker.profileUpdate++;
    console.log(`${username} Updated his/her ${field}`);
    saveCount();
})

emitter.on("count", () => {
    console.log(`Login count ${countTracker.login}`);
    console.log(`Logout count ${countTracker.logout}`);
    console.log(`Purchase count ${countTracker.purchase}`);
    console.log(`Profile Update count ${countTracker.profileUpdate}`);
})

emitter.emit("login", "Saurabh");
emitter.emit("logout", "Saurabh");  
emitter.emit("purchase", {username:"Saurabh", field:"Mobile"})
emitter.emit("profileUpdate", {username:"Saurabh", field:"emailId"})

emitter.emit("count");
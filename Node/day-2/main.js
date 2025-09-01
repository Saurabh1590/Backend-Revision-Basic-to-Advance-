let count = 0;
const interval = setInterval(() => {
    console.log("Hello world" + ++count)

    if(count == 10) {
        clearInterval(interval);
    }
}, 1000)
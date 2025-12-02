const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("timer", (msg) => console.log(msg));

setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);

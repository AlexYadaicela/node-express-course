const os = require("os");
const user = os.userInfo();
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(user);
console.log(`The System Uptime is: ${os.uptime()} seconds`);
console.log(currentOS);

const http = require('http');
const port = process.env.PORT || 8080;
const startDelay = process.env.START_DELAY ? parseInt(process.env.START_DELAY, 10) : 0;
const crashDelay = process.env.CRASH_DELAY ? parseInt(process.env.CRASH_DELAY, 10) : 0;

const server = http.createServer((req, res) => {
  res.end('ok');
});
console.log(`starting server on port ${port}, starting in ${startDelay}s and crashing in ${crashDelay}s`);
setTimeout(() => {
  console.log('starting...');
  server.listen(port);
}, startDelay * 1000);

if (crashDelay) {
  setTimeout(() => {
    console.log('crashing...');
    process.exit(1);
  }, crashDelay * 1000);
}

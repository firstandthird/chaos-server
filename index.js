const http = require('http');
const URL = require('url');
const qs = require('querystring');
const port = process.env.PORT || 8080;
const startDelay = process.env.START_DELAY ? parseInt(process.env.START_DELAY, 10) : 0;
const crashDelay = process.env.CRASH_DELAY ? parseInt(process.env.CRASH_DELAY, 10) : 0;
const responseDelay = process.env.RESPONSE_DELAY ? parseInt(process.env.RESPONSE_DELAY, 10) : 0;
const requestLogging = (process.env.REQUEST_LOG === 'true')

const server = http.createServer((req, res) => {
  const url = URL.parse(req.url);
  const query = qs.parse(url.query);
  const wait = query.wait ? parseInt(query.wait, 10) : responseDelay;
  const code = query.status ? parseInt(query.status, 10) : 200;
  setTimeout(() => {
    if (requestLogging) {
      console.log(`incoming request: ${req.url}`);
    }
    res.writeHead(code, { 'Content-Type': 'text/plain' });
    res.end('ok');
  }, wait);
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

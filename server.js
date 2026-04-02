import http from 'node:http';

import { serveStatic } from './utils/serveStatic.js';

const hostname = '127.0.0.1';
const port = 3000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  await serveStatic(req, res, __dirname);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

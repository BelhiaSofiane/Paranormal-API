import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import getContentType from './utils/getContentType.js';

const hostname = '127.0.0.1';
const port = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const publicDir = path.join(__dirname, 'public');

  const pathToResource = path.join(
    publicDir,
    req.url === '/' ? 'index.html' : req.url
  );

  try {
    const content = await fs.readFile(pathToResource);
    const ext = path.extname(pathToResource);
    const contentType = getContentType(ext);

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(content);

  } catch (err) {
    if (err.code === 'ENOENT') {
      // File not found → send a 404
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>404 - Page Not Found</h1>');
    } else {
      // Something else went wrong → send a 500
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>500 - Internal Server Error</h1>');
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
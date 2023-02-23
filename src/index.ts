import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  if (!req.url) {
    server.emit('error', new Error('invalid URL'));
    return;
  }

  if (req.method === 'GET' && req.url === '/things') {
    const data = fs.readFileSync('things.json');
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }

  if (req.method === 'GET' && req.url.startsWith('/things/')) {
    const idThing = req.url.split('/')[2];
    const data = fs.readFileSync('things.json', 'utf8');
    const things = JSON.parse(data);
    const thing = things.find((t: any) => t.id === parseInt(idThing, 10));
    if (thing) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(thing));
      return;
    }

    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

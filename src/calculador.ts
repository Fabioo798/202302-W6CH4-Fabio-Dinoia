import http from 'http';
import url from 'url';
import { Command } from 'commander';

const commander = new Command();

commander
  .option('-p, --port <number>', 'Puerto de la aplicacion')
  .parse(process.argv);

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  if (!req.url) {
    server.emit('error', new Error('invalid URL'));
    return;
  }

  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname !== '/calculator') {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
    return;
  }

  const { a, b } = reqUrl.query;

  if (!a || !b || isNaN(Number(a)) || isNaN(Number(b))) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.write(
      '<h1>400 Bad Request</h1><p>The parameters "a" and "b" must be numbers.</b>'
    );
    res.end();
    return;
  }

  const numA = Number(a);
  const numB = Number(b);

  const results = [
    `${numA} + ${numB} = ${numA + numB}`,
    `${numA} - ${numB} = ${numA - numB}`,
    `${numA} * ${numB} = ${numA * numB}`,
    `${numA} / ${numB} = ${numA / numB}`,
  ];

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Resultados:</h1>');
  results.forEach((result) => {
    res.write(`<p>${result}</p>`);
  });
  res.end();
});

server.listen(PORT, () => {
  console.log(
    `The calculator is available at http://localhost:${PORT}/calculator`
  );
});

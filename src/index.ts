import http from 'http';
import fs from 'fs';
import inquirer from 'inquirer';

inquirer
  .prompt([
    {
      type: 'input',
      name: 'port',
      message: 'En qué puerto quieres que se inicie la API?',
      default: '4000',
    },
    {
      type: 'list',
      name: 'file',
      message: 'Qué fichero quieres usar?',
      choices: ['Pruebas', 'Producción'],
    },
    {
      type: 'confirm',
      name: 'allowCRUD',
      message:
        'Quieres permitir que los clientes puedan crear, borrar y modificar?',
    },
  ])
  .then((answers) => {
    const { port, file, allowCRUD } = answers;

    let selectedFile: any;
    if (file === 'Pruebas') {
      selectedFile = 'test.json';
    } else if (file === 'Producción') {
      selectedFile = 'prod.json';
    }

    const server = http.createServer((req, res) => {
      if (!req.url) {
        server.emit('error', new Error('invalid URL'));
        return;
      }

      if (req.method === 'GET' && req.url === '/things') {
        const data = fs.readFileSync(selectedFile);
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }

      if (req.method === 'GET' && req.url.startsWith('/things/')) {
        const idThing = req.url.split('/')[2];
        const data = fs.readFileSync(selectedFile, 'utf8');
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

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Using file: ${selectedFile}`);
      console.log(`Allowing CRUD: ${allowCRUD}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

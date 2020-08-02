const http = require('http');
const { readFile } = require('fs').promises;
const path = require('path');

const server = http.createServer(async function(req, res) {
  console.log('incoming Connection!');
  switch (req.url) {
  case '/favicon.ico': {
    res.statusCode = 202;

    const folderPath = path.dirname(process.argv[1]);
    const icon = await readFile(path.join(folderPath, 'favicon.ico'));
    res.write(icon);
    res.end();
    break;

  }
  default:
    console.log(req.headers);

    res.setHeader('Set-Cookie', 'sampleCookie=1000');
    res.write('I\'m very stupid server but I\'m alive!\n');
    res.end();
  }
  console.log(`Incoming request method ${req.method} to url ${req.url}`);

});


server.listen(4000);
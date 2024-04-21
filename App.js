const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } 
  else {
        try{
            fs.readFile(path.join(__dirname, req.url), (err, data) => {
                if (err) {
                  res.writeHead(404);
                  res.end('Not Found');
                } else {
                  res.writeHead(200);
                  res.end(data);
                }
              });
        }
        catch(err){
            res.writeHead(404);
            res.end('Not Found');
        }
   
  }
});

const port = 3000;
server.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});

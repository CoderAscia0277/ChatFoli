// const http = require('http');
// const fs = require('fs');
const express = require('express');
const { url } = require('inspector');
const app = express();
const path = require('path');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         res.end('Internal Server Error');
//       } else {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(data);
//       }
//     });
//   } 
//   else {
//         try{
//             if(req.url)
//             fs.readFile(path.join(__dirname, req.url), (err, data) => {
//                 if (err) {
//                   res.writeHead(404);
//                   res.end('Not Found');
//                 } else {
//                   res.writeHead(200);
//                   res.end(data);
//                 }
//               });
//         }
//         catch(err){
//             res.writeHead(404);
//             res.end('Not Found');
//         }
   
//   }
// });

// const port = 3000;
// server.listen(port,'0.0.0.0', () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
app.get('/:file',(req,res)=>{
    const fileName = req.params.file;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    try{
        res.set('Content-Type',`${req.url === '/' ? 'text/html' : fileExtension} `);
        res.sendFile(path.join(__dirname, req.url === '/' ? 'index.html' : req.url));
    }
    catch(err){
        res.status(404).send('Unknown Request');
    }
});

app.get('/images/:name',(req,res)=>{
    // Extract the file extension
    const fileName = req.params.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    res.set('Content-Type',`image/${fileExtension !== 'svg' ? fileExtension : 'svg+xml'}`);
    res.sendFile(path.join(__dirname, req.url));
    

});


app.get('/static/:type/:name', (req, res) => {
    const type = req.params.type;
    const file_name = req.params.name;
    const filePath = path.join(__dirname, req.url);

    if (type === 'css') {
        res.set('Content-Type', 'text/css');
        res.sendFile(path.join(filePath));
    } else if (type === 'js') {
        res.set('Content-Type', 'application/javascript');
        res.sendFile(path.join(filePath));
    } else {
        // Handle unknown types
        res.status(404).send('Unknown type');
        return;
    }
});



app.listen(3000,'0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
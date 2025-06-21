const http = require('http');
const path = require('path');
const fs = require('fs');

// Constants
const PORT = 3000;
const PUBLIC_FOLDER  = path.join(__dirname, 'public')
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.pdf': 'application/pdf'
  };

// Content-Type
function getContentType(filePath){
  let ext = path.extname(filePath);
  return MIME_TYPES[ext] || 'text/plain';
}

// Server
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let requestPath = req.url

  if (requestPath === '/') {
    requestPath = "index.html";
  }
  else if (requestPath === '/api/hello') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Called api/hello'}));
    return;
  }

  const filePath = path.join(PUBLIC_FOLDER, requestPath);

  // Show file content
  fs.readFile(filePath, (error, data) => {
    if (error)
    {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('File couldn\'t be found')
    }
    else
    {
      const contentType = getContentType(filePath);
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  })
});

server.listen(PORT, (error) => {
  if (error)
    console.log(`Server isn't running because of error: ${error}`);
  else
    console.log(`Server running on http://localhost:${PORT}`);
});
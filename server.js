import http from 'http';
import path from 'path';
import fs from 'fs';
import url from 'url';
import {github} from './api.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf'
};

const ERROR_MESSAGE = {
  400: 'Mauvaise requête - La demande est invalide',
  401: 'Non autorisé - Authentification requise',
  403: 'Interdit - Accès refusé',
  404: 'Page non trouvée - La ressource demandée n\'existe pas',
  405: 'Méthode non autorisée - Cette méthode HTTP n\'est pas supportée',
  408: 'Délai d\'attente dépassé - La requête a pris trop de temps',
  429: 'Trop de requêtes - Veuillez réessayer plus tard',
  500: 'Erreur interne du serveur - Un problème est survenu',
  502: 'Mauvaise passerelle - Erreur de serveur distant',
  503: 'Service indisponible - Le service est temporairement indisponible',
  504: 'Délai d\'attente de la passerelle - Le serveur distant ne répond pas'
};

function getContentType(filePath){
  let ext = path.extname(filePath);
  return MIME_TYPES[ext] || 'text/plain';
}

function getMessageFromStatus(statusCode){
  return ERROR_MESSAGE[statusCode] || 'Erreur non connue';
}

// Error handling
function errorPage(res, statusCode){
  const errorFilePath = path.join(__dirname, 'public', 'error.html');
  fs.readFile(errorFilePath, 'utf8', (error, data) => {
    if (error)
    {
      res.writeHead(statusCode, {'Content-Type': 'text/html'});
      res.end();
    }
    else
    {
      const newData = data.replace('${status-code}', statusCode)
                          .replace('${error-message}', getMessageFromStatus(statusCode));
      const contentType = getContentType(errorFilePath);
      res.writeHead(200, {'Content-Type': contentType});
      res.end(newData);
    }
  })
}

// Server
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let requestPath = req.url;

  if (req.method === 'GET') {
    if (req.url === '/') {
      requestPath = 'homepage.html';
    }
    else if (requestPath == '/api/github') {
      const githubRes = await github(process.env.USER, process.env.GITHUB_TOKEN);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({from: requestPath, value: githubRes}));
      return;
    }

    const filePath = path.join(__dirname, 'public', requestPath);
    fs.readFile(filePath, (error, data) => {
      if (error) {
        errorPage(res, 404);
      }
      else {
        const contentType = getContentType(filePath);
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
      }
    })
  }
  else {
    errorPage(res, 405);
  }
});

server.listen(PORT, (error) => {
  if (error)
    console.log(`Server isn't running because of error: ${error}`);
  else
    console.log(`Server running on http://localhost:${PORT}`);
});
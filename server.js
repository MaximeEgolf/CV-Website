import path from 'path';
import url from 'url';
import {github, cmdLine} from './api.js';

import express from 'express';
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/github", async (req, res) =>
{
  const githubRes = await github(process.env.USER, process.env.GITHUB_TOKEN);
  res.json({from: req.path, value: githubRes});
});

app.post("/api/commandLine", (req, res) =>
{
  const cmdLineRes = cmdLine(req);
  res.json({ result: cmdLineRes.result, success: cmdLineRes.success });
});

app.use((req, res) => {
  res.status(404).render('error', {
    title: '404',
    message: 'Cette page n\'a pas été trouvé'
  });
});

app.listen(PORT, (error) => {
  if (error)
    console.log(`Server isn't running because of error: ${error}`);
  else
    console.log(`Server running on http://localhost:${PORT}`);
});
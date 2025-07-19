// -----------------------------------------
// Github
// -----------------------------------------
async function userGithubRepos(user, token){
  try {
    const reposRes = await githubFetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`, token);
    const reposResJson = await reposRes.json();

    const repoData = [];
    for (const repo of reposResJson) {
      const languageRes = await githubFetch(`https://api.github.com/repos/${user}/${repo.name}/languages`, token);
      const languageResJson = await languageRes.json();

      const readMeRes = await githubFetch(`https://api.github.com/repos/${user}/${repo.name}/readme`, token, {'Accept': 'application/vnd.github.html'});
      const readMeResHtml = await readMeRes.text();

      repoData.push({
        name: repo.name,
        date: repo.pushed_at,
        description: repo.description,
        readMe: readMeResHtml,
        language: languageResJson
      });
    }

    return repoData;
  }

  catch(error) {
    throw new Error(error);
  }
}

async function githubFetch(request, token, otherheaders = {}){
  return await fetch(request, {
      headers: {
        'Authorization': `token ${token}`,
        ...otherheaders
      }
    }
  )
}

// -----------------------------------------
// Command Line
// -----------------------------------------
const PAGES = {
  '/': {
    name: 'Home',
    parent: null,
    child: ['/project.html', '/contact.html'],
    aliases: ['Home', '~']
  },
  '/project.html': {
    name: 'Projets',
    parent: '/',
    child: null,
    aliases: ['Projets', 'project.html']
  },
  '/contact.html': {
    name: 'Contacts',
    parent: '/',
    child: null,
    aliases: ['Contacts', 'contact.html']
  }
};

function commandLine(req){
  const command = req.body.command;
  const argument = req.body.argument;
  const currentDir = req.body.currentDir;

  let res = undefined;

  switch (command)
  {
    case "pwd":
      res = pwd(currentDir);
      break;
    case "cd":
      res = cd(argument, currentDir);
      break;
    case "ls":
      res = ls(currentDir);
      break;
  }
  return res;
}

function cd(argument, currentDir){
  const page = PAGES[currentDir];
  let path = null;

  if (argument === '~')
    path = '/';
  if (argument === '..')
    path = page.parent;

  if (path === null && page.child !== null)
  {
    for (const dest of page.child) {
      const aliases = PAGES[dest].aliases;
      if (aliases.includes(argument))
      {
        path = dest;
        break;
      }
    }
  }

  return {
    result : path,
    success : path === null ? false : true
  };
}

function ls(currentDir){
  const page = PAGES[currentDir];
  let childDir = [];

  if (page.parent !== null)
  {
    childDir.push('..');
  }

  if (page.child !== null)
  {
    for (const dest of page.child) {
      const name = PAGES[dest].name;
      childDir.push(name);
    }
  }

  return  {
    result: childDir,
    success: childDir.length === 0 ? false : true
  }
}

function pwd(currentDir){
  let page = PAGES[currentDir];
  let path = '';

  while (page.name !== 'Home')
  {
    path = page.name + '/' + path;
    page = PAGES[page.parent];
  }

  path = page.name + '/' + path;

  return {
    result: path,
    success: true
  }
}

export {
  userGithubRepos as github,
  commandLine as cmdLine
}
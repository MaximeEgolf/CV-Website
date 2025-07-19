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
const HTMLredirection =
{
  '/' : ['/project.html', '/contact.html'],
  '/project.html' : ['/'],
  '/contact.html' : ['/']
}

const HTMLname =
{
  '~' : '/',
  'Projets' : '/project.html',
  'Contacts' : '/contact.html'
}

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
  let result = true;

  const to = HTMLname[argument];
  if (typeof to === 'undefined')
    result = false;

  if (!result || !HTMLredirection[currentDir].includes(to))
    result = false;

  return {
    toHtml : to,
    result : result
  };
}

function ls(currentDir){

}

function pwd(currentDir){

}

export {
  userGithubRepos as github,
  commandLine as cmdLine
}
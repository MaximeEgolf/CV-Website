// -----------------------------------------
// Github
// -----------------------------------------
async function userGithubRepos(user, token){
  try {
    const reposRes = await githubFetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`,
                                      token);
    const reposResJson = await reposRes.json();

    const repoData = [];
    for (const repo of reposResJson) {
      // Languages
      const languageRes = await githubFetch(`https://api.github.com/repos/${user}/${repo.name}/languages`,
                                            token);
      const languageResJson = await languageRes.json();

      // ReadME
      const readMeRes = await githubFetch(`https://api.github.com/repos/${user}/${repo.name}/readme`,
                                          token,
                                          {'Accept': 'application/vnd.github.html'});
      const readMeResHtml = await readMeRes.text();
      // JSON
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
    const fromHtml = req.body.from;
    let result = true;

    const toHtml = HTMLname[req.body.to];
    if (typeof toHtml === 'undefined')
      result = false;

    if (!result || !HTMLredirection[fromHtml].includes(toHtml))
      result = false;

    return {
      toHtml : toHtml,
      result : result
    };
}

export {
  userGithubRepos as github,
  commandLine as cmdLine
}
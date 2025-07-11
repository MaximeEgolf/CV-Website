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

export {
  userGithubRepos as github
}
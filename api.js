async function userGithubRepos(user){
  try {
    const reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
    const reposResJson = await reposRes.json();

    const repoData = [];
    for (const repo of reposResJson) {
      // Languages
      const languageRes = await fetch(`https://api.github.com/repos/${user}/${repo.name}/languages`);
      const languageResJson = await languageRes.json();

      // ReadME
      const readMeRes = await fetch(`https://api.github.com/repos/${user}/${repo.name}/readme`, {
        headers: { 'Accept': 'application/vnd.github.html' }
      });
      const readMeResHtml = await readMeRes.text();
      // JSON
      repoData.push({
        name: repo.name,
        date: repo.updated_at,
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
export {
  userGithubRepos as github
}
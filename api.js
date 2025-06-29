async function userGithubRepos(user){
  try
  {
    const response = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&direction=desc`);
    const userRepos = await response.json();
    return userRepos;
  }

  catch(error)
  {
    throw new Error("User wasn't found");
  }
}

export {
  userGithubRepos as github
}